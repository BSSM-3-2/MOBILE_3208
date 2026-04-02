import { create } from 'zustand';
import { Post } from '@type/Post';
import { getFeed } from '@/api/content';
// (5차) toggleLike 구현 시 필요한 함수를 import에 추가한다
import { likePost, unlikePost } from '@/api/content';

interface FeedState {
    posts: Post[];
    page: number;
    hasNext: boolean;
    loading: boolean;
    error: string | null;

    fetchFeed: () => Promise<void>;
    loadMore: () => Promise<void>;
    toggleLike: (postId: string) => Promise<void>;
}

export const useFeedStore = create<FeedState>((set, get) => ({
    posts: [],
    page: 1,
    hasNext: false,
    loading: false,
    error: null,

    fetchFeed: async () => {
        set({ loading: true, error: null });
        try {
            const { data, pagination } = await getFeed(1);
            set({
                posts: data,
                page: 1,
                hasNext: pagination.hasNext,
                loading: false,
            });
        } catch (error) {
            set({
                error: '피드를 불러오는 중 서버 에러가 발생했습니다.',
                loading: false,
            });
        }
    },

    loadMore: async () => {
        const { loading, hasNext, page, posts } = get();
        if (loading || !hasNext) return;

        set({ loading: true });
        try {
            const nextPage = page + 1;
            const { data, pagination } = await getFeed(nextPage);
            set({
                posts: [...posts, ...data],
                page: nextPage,
                hasNext: pagination.hasNext,
                loading: false,
            });
        } catch {
            set({ loading: false });
        }
    },

    // 낙관적 업데이트: UI를 먼저 바꾸고 API 호출 → 실패 시 원상복구
    toggleLike: async (postId: string) => {
        const { posts } = get();
        const target = posts.find(p => p.id === postId);
        if (!target) return;

        const wasLiked = target.liked;

        // ① UI 즉시 반영 (Optimistic UI Update)
        set({
            posts: posts.map(p =>
                p.id === postId
                    ? { ...p, liked: !wasLiked, likes: wasLiked ? p.likes - 1 : p.likes + 1 }
                    : p,
            ),
        });

        try {
            // ② API 호출
            const { likes, liked } = wasLiked
                ? await unlikePost(postId)
                : await likePost(postId);

            // ③ 서버 응답으로 동기화
            set({
                posts: get().posts.map(p =>
                    p.id === postId ? { ...p, likes, liked } : p,
                ),
            });
        } catch (error) {
            // ④ 실패 시 롤백
            // 힌트: 이미 다른 작업에 의해 posts가 변했을 수 있으므로 get().posts를 기준으로 롤백
            set({
                posts: get().posts.map(p =>
                    p.id === postId
                        ? {
                              ...p,
                              liked: wasLiked,
                              likes: wasLiked ? p.likes + 1 : p.likes - 1,
                          }
                        : p,
                ),
            });
            console.error('좋아요 업데이트 실패:', error);
        }
    },
}));
