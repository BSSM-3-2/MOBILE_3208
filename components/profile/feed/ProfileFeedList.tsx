import { Dimensions, StyleSheet, FlatList } from 'react-native';
import { Post } from '@type/Post';
import { Image } from 'expo-image';
import { resolveImageSource } from '@/utils/image';
import { Grid } from '@/constants/theme';
import { ThemedView } from '@components/themed-view';

import NavigationTop from '@components/navigation/NavigationTop';
import { ProfileHeader } from '@components/profile/ProfileHeader';
import User, { UserAnalytics } from '@type/User';
import ContentContainer from '@components/container';

const { width } = Dimensions.get('window');
const ITEM_SIZE = width / Grid.profileColumnCount;

export default function ProfileFeedList({
    user,
    userAnalytics,
    posts,
}: {
    user: User;
    userAnalytics?: UserAnalytics;
    posts: Post[];
}) {
    return (
        <ThemedView style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                numColumns={3}
                renderItem={({ item }) => (
                    <Image
                        style={styles.image}
                        contentFit={'cover'}
                        source={resolveImageSource(item.images[0])}
                    />
                )}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{ gap: 2 }}
                contentContainerStyle={{ gap: 2 }}
                ListHeaderComponent={
                    <>
                        <ContentContainer isTopElement={true}>
                            <NavigationTop title={user.username} />
                        </ContentContainer>
                        <ProfileHeader
                            user={user}
                            userAnalytics={userAnalytics}
                        />
                    </>
                }
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    image: {
        height: ITEM_SIZE * Grid.profileImageRatio,
        width: ITEM_SIZE - 2, // Accounting for gap between columns
    },
    container: {
        flex: 1,
    },
});
