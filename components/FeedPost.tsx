import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from "@expo/vector-icons";
import { AvatarSizes, FeedColors, FontSizes, Spacing } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function FeedPostHeader() {
    return (
        <View style={[styles.contentPadding, styles.headerRow]}>
            <Image source={"https://cdn.imweb.me/upload/S20220518fbea59f8e9828/77d99edcb5dbf.jpg"} contentFit="contain" style={styles.avatar}/>
            <Text style={styles.username}>장인정신</Text>
        </View>
    );
}

export function FeedPostActions() {
    return (
        <View style={styles.actionBar}>
            <View style={styles.actionGroupLeft}>
                <TouchableOpacity style={[styles.actionButton, styles.row]}>
                    <Ionicons name={"heart-outline"} size={26} color={FeedColors.primaryText} />
                    <Text style={styles.countText}>999</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.row]}>
                    <Ionicons name={"chatbubble-outline"} size={26} color={FeedColors.primaryText} />
                    <Text style={styles.countText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name={"paper-plane-outline"} size={26} color={FeedColors.primaryText} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.actionButton}>
                <Ionicons name={"bookmark-outline"} size={26} color={FeedColors.primaryText} />
            </TouchableOpacity>
        </View>
    );
}

export function FeedPostCaption() {
    return (
        <>
            <View style={styles.captionContainer}>
                <Text style={styles.caption} numberOfLines={2}>
                    <Text style={styles.bold}>장인정신</Text>
                    {' '}취업 화이팅
                </Text>
            </View>
            <Text style={styles.timestamp}>3시간 전</Text>
        </>
    );
}

export default function FeedPost() {
    return (
        <View>
            <FeedPostHeader />
            <Image
                source={{ uri: "https://file.notion.so/f/f/f74ce79a-507a-45d0-8a14-248ea481b327/91d56947-62d5-40fb-8a88-b149b0b70953/image.png?table=block&id=3182845a-0c9f-81b9-88b4-c73fc406a85c&spaceId=f74ce79a-507a-45d0-8a14-248ea481b327&expirationTimestamp=1773914400000&signature=D6HWL1r-2mU0cV-DOpWYiLRB9vuzo95w2hIxmCKkRNw&downloadName=image.png" }}
                style={styles.postImage}
            />
            <View style={styles.contentPadding}>
                <FeedPostActions />
                <FeedPostCaption />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contentPadding: {
        paddingHorizontal: 16
    },
    avatar: {
        width: AvatarSizes.md,
        height: AvatarSizes.md,
        borderRadius: AvatarSizes.md / 2,
    },
    username: {
        fontWeight: '600',
        fontSize: FontSizes.md,
    },
    postImage: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH * 0.7,
    },
    actionButton: {
        padding: 2,
    },
    row: {
        flexDirection: 'row',
        gap: Spacing.xs,
        alignItems: 'center',
    },
    countText: {
        fontWeight: '600',
    },
    bold: {
        fontWeight: '600',
    },
    caption: {
        fontSize: FontSizes.sm,
        color: FeedColors.primaryText,
        lineHeight: 19,
        marginBottom: Spacing.xs,
    },
    timestamp: {
        fontSize: FontSizes.xs,
        color: '#8E8E8E',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        paddingVertical: Spacing.sm,
    },
    actionBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: Spacing.sm,
    },
    actionGroupLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    captionContainer: {
        marginBottom: Spacing.xs,
    },
});
