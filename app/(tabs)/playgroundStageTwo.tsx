import { Image } from 'expo-image';
import {StyleSheet, Text, View} from 'react-native';
import {AvatarSizes, Colors, FeedColors, FontSizes, Spacing} from '@/constants/theme';
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function PlaygroundStageTwoScreen() {
    const inset = useSafeAreaInsets();

    return (
        <View style={[styles.contentContainer, {paddingTop: inset.top + 20}]}>
            <View style={styles.contentPadding}>
                <Text style={[styles.title, {
                    borderColor: Colors.light.text
                }]}>Playground 2</Text>
            </View>
            <View style={styles.profileHeader}>
                <Image
                    source={{ uri: "https://cdn.imweb.me/upload/S20220518fbea59f8e9828/77d99edcb5dbf.jpg" }}
                    style={styles.avatar}
                />
                <View style={styles.profileInfoContainer}>
                    <Text style={styles.displayName}>
                        장인정신
                    </Text>
                    <View style={styles.infoParent}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoValue}>215</Text>
                            <Text style={styles.infoKey}>posts</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoValue}>331</Text>
                            <Text style={styles.infoKey}>followers</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoValue}>420</Text>
                            <Text style={styles.infoKey}>following</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contentPadding: {
        paddingHorizontal: 16
    },
    contentContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        paddingBottom: 20,
        fontWeight: 'bold',
        borderBottomWidth: 1,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: Spacing.xxl,
        gap: Spacing.lg,
    },
    profileInfoContainer: {
        flex: 1,
        gap: Spacing.sm,
    },
    infoParent: {
        flexDirection: 'row',
        gap: Spacing.xxl,
        width: 'auto',
    },
    infoContainer: {
        alignItems: 'flex-start',
    },
    infoKey: {
        fontSize: FontSizes.sm,
        lineHeight: FontSizes.sm + 2,
        fontWeight: '400',
    },
    infoValue: {
        fontSize: FontSizes.md,
        lineHeight: FontSizes.lg + 2,
        fontWeight: '700',
    },
    avatar: {
        width: AvatarSizes.xl,
        height: AvatarSizes.xl,
        borderRadius: AvatarSizes.xl / 2,
    },
    displayName: {
        fontSize: FontSizes.md,
        fontWeight: '700',
        color: FeedColors.primaryText,
    },
    username: {
        fontSize: FontSizes.sm,
        color: '#8E8E8E',
    },
    bio: {
        fontSize: FontSizes.sm,
        color: FeedColors.primaryText,
        textAlign: 'center',
        paddingHorizontal: Spacing.xl,
    },
});