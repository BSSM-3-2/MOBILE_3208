import { useMemo, useCallback } from 'react';
import { useFeedStore } from '@/store/feed-store';

// TODO: 아래 Hook을 완성하세요
//
// 목표: HomeScreen에서 useFeedStore()를 직접 쓰던 로직을 이 Hook으로 분리합니다
//       화면 컴포넌트는 배치만 담당하고, 데이터 처리는 Hook이 담당합니다
//
// 반환해야 하는 값: posts, loading, error, fetchFeed, loadMore
// 각 값을 selector로 구독하세요 (예: useFeedStore(s => s.posts))

export function useFeedPosts(keyword: string = '') {
    const posts = useFeedStore(s => s.posts);
    const loading = useFeedStore(s => s.loading);
    const error = useFeedStore(s => s.error);
    const fetchFeed = useFeedStore(s => s.fetchFeed);
    const loadMore = useFeedStore(s => s.loadMore);
    const toggleLike = useFeedStore(s => s.toggleLike);

    const filteredPosts = useMemo(() => {
        if (!keyword.trim()) return posts;
        const lowerKeyword = keyword.toLowerCase();
        return posts.filter(
            p =>
                p.caption.toLowerCase().includes(lowerKeyword) ||
                (p.author?.username &&
                    p.author.username.toLowerCase().includes(lowerKeyword)),
        );
    }, [posts, keyword]);

    const handleLike = useCallback(
        (id: string) => {
            toggleLike(id);
        },
        [toggleLike],
    );

    return {
        filteredPosts,
        handleLike,
        posts,
        loading,
        error,
        fetchFeed,
        loadMore,
    };
}
