import MOCK_USER from '@/mock/user';
import { ThemedView } from '@components/themed-view';

import ProfileFeedList from '@components/profile/feed/ProfileFeedList';
import MOCK_POSTS from '@/mock/posts';

export default function ProfileScreen() {
    return (
        <ThemedView style={{ flex: 1 }}>
            <ProfileFeedList user={MOCK_USER} posts={MOCK_POSTS} />
        </ThemedView>
    );
}
