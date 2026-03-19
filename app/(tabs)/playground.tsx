import { StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FeedPost from "@/components/FeedPost";

export default function PlaygroundScreen() {
    const inset = useSafeAreaInsets();

  return (
    <View style={[styles.contentContainer, {paddingTop: inset.top + 20}]}>
        <View style={styles.contentPadding}>
            <Text style={[styles.title, {
                borderColor: Colors.light.text
            }]}>Playground 1</Text>
        </View>
        <View style={styles.playgroundGap}>
            <FeedPost />
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
    playgroundGap: {
        marginTop: Spacing.xxl,
        gap: Spacing.xxl
    },
    title: {
        fontSize: 24,
        paddingBottom: 20,
        fontWeight: 'bold',
        borderBottomWidth: 1,
    },
});