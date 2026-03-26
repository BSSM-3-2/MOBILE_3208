import { StyleSheet, FlatList } from 'react-native';
import { Post } from '@type/Post';
import { FeedPost } from './post/FeedPost';
import { ThemedView } from '@components/themed-view';

function FeedList({ posts }: { posts: Post[] }) {
    return (
        <ThemedView style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <FeedPost post={item} />}
                showsVerticalScrollIndicator={false}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export { FeedList };
