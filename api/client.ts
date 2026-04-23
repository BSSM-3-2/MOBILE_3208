import axios from 'axios';
import Constants from 'expo-constants';

const BASE_URL: string =
    (Constants.expoConfig?.extra?.apiUrl as string | undefined) ??
    'https://bssm-api.zer0base.me';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false;
let pendingQueue: {
    resolve: (token: string) => void;
    reject: (err: unknown) => void;
}[] = [];

// Request Interceptor
// 모든 요청 전에 실행 — 토큰 주입
apiClient.interceptors.request.use(
    config => {
        // auth-store를 직접 import하면 순환 참조가 생기므로 동적으로 참조
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useAuthStore } = require('@/store/auth-store');
        const token: string | null = useAuthStore.getState().accessToken;
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => Promise.reject(error),
);

// Response Interceptor
// 모든 응답 후에 실행 — 에러 코드를 한 곳에서 처리
apiClient.interceptors.response.use(
    response => response,
    async error => {
        const status = error.response?.status;

        if (status === 404) {
            console.warn('[API] 리소스를 찾을 수 없습니다:', error.config?.url);
            return Promise.reject(error);
        }

        if (status === 401) {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const { useAuthStore } = require('@/store/auth-store');
            const store = useAuthStore.getState();

            // 이미 토큰 갱신 중이라면, 이번 요청은 큐에 저장했다가 나중에 재시도
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    pendingQueue.push({
                        resolve: (token: string) => {
                            if (error.config) {
                                error.config.headers.Authorization = `Bearer ${token}`;
                                resolve(apiClient(error.config));
                            }
                        },
                        reject: (err: unknown) => reject(err),
                    });
                });
            }

            // 첫 401 발생 시 토큰 갱신 시작
            isRefreshing = true;

            try {
                const newAccessToken = await store.refreshAccessToken();

                // 대기 중인 요청들 일괄 재시도
                pendingQueue.forEach(p => p.resolve(newAccessToken));
                pendingQueue = [];

                // 현재 요청 재시도
                if (error.config) {
                    error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                    return apiClient(error.config);
                }
            } catch (refreshError) {
                // 갱신 실패 시 로그아웃 처리
                pendingQueue.forEach(p => p.reject(refreshError));
                pendingQueue = [];
                store.logOut();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        console.error('[API] 서버 에러:', status, error.message);
        return Promise.reject(error);
    },
);

export default apiClient;
