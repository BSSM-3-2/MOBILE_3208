import { useLocalSearchParams, Stack } from 'expo-router';
import { Text, StyleSheet } from 'react-native';

import { ThemedView } from '@components/themed-view';
import ProfileFeedList from '@components/profile/feed/ProfileFeedList';
import { MOCK_USERS_MAP } from '@/mock/users';
import MOCK_POSTS from '@/mock/posts';

export default function UserProfileScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const user = id ? MOCK_USERS_MAP[id] : undefined;
    const posts = MOCK_POSTS.filter(post => post.userId === id);

    if (!user) {
        return (
            <ThemedView style={styles.notFound}>
                <Text style={styles.notFoundText}>유저를 찾을 수 없어요.</Text>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <ProfileFeedList
                user={user}
                userAnalytics={{
                    post: posts.length,
                }}
                posts={posts}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    notFound: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notFoundText: {
        fontSize: 16,
        opacity: 0.5,
    },
});
