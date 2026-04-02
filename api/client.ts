import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';

// 실기기: 개발 장비의 실제 IP 사용
const BASE_URL = Platform.select({
    android: 'http://10.0.2.2:3000',
    default: 'https://bssm-api.zer0base.me',
});

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);

        return config;
    },
    (error: AxiosError) => Promise.reject(error),
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        const status = error.response?.status;

        if (status === 404) {
            console.warn(`[Error] 404: 페이지를 찾을 수 없습니다. (URL: ${error.config?.url})`);
        } else if (status === 401) {
            console.warn('[Error] 401: 인증이 필요합니다.');
        } else if (status) {
            console.error(`[Error] ${status}: 알 수 없는 에러가 발생했습니다.`);
        } else {
            console.error('[Network Error] 서버에 연결할 수 없습니다. 네트워크 상태나 서버 주소를 확인하세요.');
        }

        return Promise.reject(error);
    },
);

export default apiClient;
