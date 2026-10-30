import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Dimensions,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

const { width } = Dimensions.get("window");

export default function LibraryScreen() {
  const router = useRouter();
  const { theme, colors } = useTheme();
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<"recents" | "liked" | "downloads" | "playlists">("recents");

  const libraryData = {
    recents: [
      { id: "1", title: "Netë e Kuqe", artist: "Violet Hour", duration: "3:42" },
      { id: "2", title: "Zëri i Lumit", artist: "Lumi Ensemble", duration: "4:05" },
    ],
    liked: [
      { id: "1", title: "Netë e Kuqe", artist: "Violet Hour", duration: "3:42" },
      { id: "3", title: "Pas Mesnatës", artist: "Drita Sound", duration: "2:58" },
      { id: "4", title: "Rruga e Shkrepëtirës", artist: "Kuq Atelier", duration: "3:15" },
    ],
    downloads: [
      { id: "1", title: "Netë e Kuqe", artist: "Violet Hour", duration: "3:42" },
      { id: "5", title: "Vera në Bremen", artist: "Mesnata", duration: "4:20" },
    ],
    playlists: [
      { id: "p1", title: "Për Relaks", artist: "4 këngë • Krijim i yti", duration: "" },
      { id: "p2", title: "Ballada Verore", artist: "7 këngë • Krijim i yti", duration: "" },
    ]
  };

  const currentList = libraryData[activeTab];

  return (
    <LinearGradient colors={colors.gradient} locations={[0, 0.45, 1]} style={styles.container}>
      <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentWrapper}>
          
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Ionicons name="library" size={20} color={colors.textPrimary} style={{ marginRight: 8 }} />
              <Text style={[styles.brandTitle, { color: colors.textPrimary }]}>Libraria Imë</Text>
            </View>
            <Pressable style={[styles.profileButton, { backgroundColor: colors.cardBg, borderColor: colors.border }]} onPress={() => router.push("/player" as any)}>
              <Ionicons name="person" size={18} color={colors.textPrimary} />
            </Pressable>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
            {[
              { key: "recents", label: "Të fundit", icon: "time-outline" },
              { key: "liked", label: "Të preferuara", icon: "heart-outline" },
              { key: "downloads", label: "Offline", icon: "cloud-done-outline" },
              { key: "playlists", label: "Playlist-at", icon: "musical-notes-outline" },
            ].map((tab) => (
              <Pressable
                key={tab.key}
                style={[styles.tabChip, { backgroundColor: colors.cardBg, borderColor: colors.border }, activeTab === tab.key && styles.activeTabChip]}
                onPress={() => setActiveTab(tab.key as any)}
              >
                <Ionicons name={tab.icon as any} size={16} color={activeTab === tab.key ? "#FFFFFF" : colors.textSecondary} style={{ marginRight: 6 }} />
                <Text style={[styles.tabText, { color: colors.textSecondary }, activeTab === tab.key && styles.activeTabText]}>
                  {tab.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <ScrollView contentContainerStyle={styles.listScroll} showsVerticalScrollIndicator={false}>
            <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>
              {activeTab === "recents" && "Këngët e dëgjuara së fundmi"}
              {activeTab === "liked" && "Këngët e tua të preferuara"}
              {activeTab === "downloads" && "Këngët e shkarkuara offline"}
              {activeTab === "playlists" && "Playlist-at e tua"}
            </Text>

            {currentList.map((item) => (
              <Pressable key={item.id} style={[styles.songRow, { backgroundColor: colors.cardBg, borderColor: colors.border }]} onPress={() => router.push("/player" as any)}>
                <View style={styles.songRowIcon}>
                  <Ionicons name={activeTab === "playlists" ? "folder" : "musical-note"} size={18} color="#F3DCE8" />
                </View>
                <View style={styles.songRowInfo}>
                  <Text style={[styles.songRowTitle, { color: colors.textPrimary }]}>{item.title}</Text>
                  <Text style={[styles.songRowArtist, { color: colors.textSecondary }]}>{item.artist}</Text>
                </View>
                {item.duration !== "" && <Text style={[styles.songDuration, { color: colors.textSecondary }]}>{item.duration}</Text>}
                <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} style={{ marginLeft: 10 }} />
              </Pressable>
            ))}
          </ScrollView>

        </View>

        <Pressable style={[styles.miniPlayer, { backgroundColor: theme === "dark" ? "#3b0a12" : "#e0c5cd", borderColor: colors.border }]} onPress={() => router.push("/player" as any)}>
          <View style={styles.miniPlayerLeft}>
            <View style={styles.miniThumb} />
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={[styles.miniTitle, { color: colors.textPrimary }]} numberOfLines={1}>Netë e Kuqe</Text>
              <Text style={[styles.miniArtist, { color: colors.textSecondary }]} numberOfLines={1}>Violet Hour</Text>
            </View>
          </View>
          <View style={styles.miniControls}>
            <Pressable onPress={() => setIsPlaying(!isPlaying)} style={{ marginRight: 15 }}>
              <Ionicons name={isPlaying ? "pause" : "play"} size={22} color={colors.textPrimary} />
            </Pressable>
            <Pressable onPress={() => Alert.alert("Kënga e radhës")}>
              <Ionicons name="play-skip-forward" size={22} color={colors.textPrimary} />
            </Pressable>
          </View>
        </Pressable>

        <View style={[styles.bottomNav, { backgroundColor: colors.navBg, borderTopColor: colors.border }]}>
          <Pressable style={styles.navItem} onPress={() => router.push("/home" as any)}>
            <Ionicons name="home-outline" size={22} color={colors.textSecondary} />
            <Text style={[styles.navText, { color: colors.textSecondary }]}>Kreu</Text>
          </Pressable>
          <Pressable style={styles.navItem} onPress={() => router.push("/search" as any)}>
            <Ionicons name="search-outline" size={22} color={colors.textSecondary} />
            <Text style={[styles.navText, { color: colors.textSecondary }]}>Kërko</Text>
          </Pressable>
          <Pressable style={styles.navItem} onPress={() => {}}>
            <Ionicons name="heart" size={22} color="#F4A5BD" />
            <Text style={[styles.navText, { color: "#F4A5BD" }]}>Preferuarat</Text>
          </Pressable>
          <Pressable style={styles.navItem} onPress={() => router.push("/settings" as any)}>
            <Ionicons name="options-outline" size={22} color={colors.textSecondary} />
            <Text style={[styles.navText, { color: colors.textSecondary }]}>Cilësimet</Text>
          </Pressable>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  contentWrapper: { flex: 1, paddingHorizontal: 20, paddingTop: 10, paddingBottom: 130 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  brandTitle: { fontSize: 18, fontWeight: "700" },
  profileButton: { width: 36, height: 36, borderRadius: 18, justifyContent: "center", alignItems: "center", borderWidth: 1 },
  tabsScroll: { marginBottom: 20, maxHeight: 45 },
  tabChip: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1 },
  activeTabChip: { backgroundColor: "#7A1E37", borderColor: "#F4A5BD" },
  tabText: { fontSize: 13, fontWeight: "600" },
  activeTabText: { color: "#FFFFFF" },
  sectionHeading: { fontSize: 16, fontWeight: "700", marginBottom: 15 },
  listScroll: { paddingBottom: 10 },
  songRow: { flexDirection: "row", alignItems: "center", borderRadius: 16, padding: 12, marginBottom: 12, borderWidth: 1 },
  songRowIcon: { width: 42, height: 42, borderRadius: 12, backgroundColor: "#7A1E37", justifyContent: "center", alignItems: "center", marginRight: 12 },
  songRowInfo: { flex: 1 },
  songRowTitle: { fontSize: 15, fontWeight: "700", marginBottom: 2 },
  songRowArtist: { fontSize: 12 },
  songDuration: { fontSize: 13 },
  miniPlayer: { position: "absolute", bottom: 60, left: 16, right: 16, height: 60, borderRadius: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, borderWidth: 1, zIndex: 10 },
  miniPlayerLeft: { flexDirection: "row", alignItems: "center", flex: 1, marginRight: 10 },
  miniThumb: { width: 38, height: 38, borderRadius: 10, backgroundColor: "#7A1E37", marginRight: 12 },
  miniTitle: { fontSize: 13, fontWeight: "700" },
  miniArtist: { fontSize: 11 },
  miniControls: { flexDirection: "row", alignItems: "center" },
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, height: 60, flexDirection: "row", justifyContent: "space-around", alignItems: "center", borderTopWidth: 1, zIndex: 10 },
  navItem: { alignItems: "center", justifyContent: "center", flex: 1 },
  navText: { fontSize: 11, marginTop: 3 }
});