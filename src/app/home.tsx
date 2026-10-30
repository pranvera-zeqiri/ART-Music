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

export default function HomeScreen() {
  const router = useRouter();
  const { theme, colors } = useTheme();
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeGenre, setActiveGenre] = useState("Të gjitha");

  const [likedSongs, setLikedSongs] = useState<{ [key: string]: boolean }>({});
  const [downloadedSongs, setDownloadedSongs] = useState<{ [key: string]: boolean }>({});

  const toggleLike = (songKey: string) => {
    setLikedSongs((prev) => ({ ...prev, [songKey]: !prev[songKey] }));
  };

  const toggleDownload = (songKey: string) => {
    setDownloadedSongs((prev) => ({ ...prev, [songKey]: !prev[songKey] }));
  };

  return (
    <LinearGradient colors={colors.gradient} locations={[0, 0.45, 1]} style={styles.container}>
      <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Ionicons name="musical-notes" size={20} color={colors.textPrimary} style={{ marginRight: 6 }} />
              <Text style={[styles.brandTitle, { color: colors.textPrimary }]}>ART Music</Text>
            </View>
            <Pressable 
              style={styles.settingsButton}
              onPress={() => router.push("/settings" as any)}
            >
              <Ionicons name="settings-outline" size={22} color="#FFFFFF" />
            </Pressable>
          </View>

          <Text style={[styles.greetingTitle, { color: colors.textPrimary }]}>Mirë se vjen, Arta</Text>

          {/* Search Box */}
          <Pressable 
            style={[styles.searchContainer, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
            onPress={() => router.push("/search" as any)}
          >
            <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
            <Text style={[styles.searchPlaceholder, { color: colors.textSecondary }]}>Kërko këngë ose artistë...</Text>
          </Pressable>

          {/* Trending */}
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Në trend këtë javë</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {[
              { title: "Netë e Kuqe", artist: "Violet Hour" },
              { title: "Rruga e Shkrepët...", artist: "Kuq Atelier" },
              { title: "Vera në Breme...", artist: "Mesnata" }
            ].map((item, index) => (
              <Pressable key={index} style={styles.trendingCard} onPress={() => router.push("/player" as any)}>
                <View style={[styles.trendingImagePlaceholder, { borderColor: colors.border }]}>
                  <View style={styles.pinkDot} />
                </View>
                <Text style={[styles.trendingSongTitle, { color: colors.textPrimary }]} numberOfLines={1}>{item.title}</Text>
                <Text style={[styles.trendingArtist, { color: colors.textSecondary }]} numberOfLines={1}>{item.artist}</Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Genres */}
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Eksploro sipas zhanrit</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreScroll}>
            {["Të gjitha", "Pop", "Rock", "Elektronike"].map((genre) => (
              <Pressable 
                key={genre} 
                style={[styles.genreChip, { backgroundColor: colors.cardBg, borderColor: colors.border }, activeGenre === genre && styles.activeGenreChip]}
                onPress={() => setActiveGenre(genre)}
              >
                <Text style={[styles.genreText, { color: colors.textSecondary }, activeGenre === genre && styles.activeGenreText]}>
                  {genre}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Songs List */}
          {[
            { id: "1", title: "Netë e Kuqe", artist: "Violet Hour", duration: "3:42" },
            { id: "2", title: "Zëri i Lumit", artist: "Lumi Ensemble", duration: "4:05" },
            { id: "3", title: "Pas Mesnatës", artist: "Drita Sound", duration: "2:58" },
          ].map((song) => (
            <Pressable key={song.id} style={[styles.songRow, { backgroundColor: colors.cardBg, borderColor: colors.border }]} onPress={() => router.push("/player" as any)}>
              <View style={styles.songRowIcon}>
                <Ionicons name="musical-note" size={18} color="#F3DCE8" />
              </View>
              <View style={styles.songRowInfo}>
                <Text style={[styles.songRowTitle, { color: colors.textPrimary }]}>{song.title}</Text>
                <Text style={[styles.songRowArtist, { color: colors.textSecondary }]}>{song.artist}</Text>
              </View>
              <Text style={[styles.songDuration, { color: colors.textSecondary }]}>{song.duration}</Text>
              
              <Pressable onPress={() => toggleLike(song.id)} hitSlop={10} style={{ marginLeft: 15 }}>
                <Ionicons name={likedSongs[song.id] ? "heart" : "heart-outline"} size={20} color={likedSongs[song.id] ? "#F4A5BD" : colors.textSecondary} />
              </Pressable>

              <Pressable onPress={() => toggleDownload(song.id)} hitSlop={10} style={{ marginLeft: 15 }}>
                <Ionicons name={downloadedSongs[song.id] ? "cloud-done" : "cloud-download-outline"} size={20} color={downloadedSongs[song.id] ? "#F4A5BD" : colors.textSecondary} />
              </Pressable>
            </Pressable>
          ))}

        </ScrollView>

        {/* MINI PLAYER */}
        <Pressable style={[styles.miniPlayer, { backgroundColor: theme === "dark" ? "#3b0a12" : "#e0c5cd", borderColor: colors.border }]} onPress={() => router.push("/player" as any)}>
          <View style={styles.miniPlayerLeft}>
            <View style={styles.miniThumb} />
            <View>
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

        {/* BOTTOM NAV */}
        <View style={[styles.bottomNav, { backgroundColor: colors.navBg, borderTopColor: colors.border }]}>
          <Pressable style={styles.navItem} onPress={() => {}}>
            <Ionicons name="home" size={22} color="#F4A5BD" />
            <Text style={[styles.navText, { color: "#F4A5BD" }]}>Kreu</Text>
          </Pressable>
          <Pressable style={styles.navItem} onPress={() => router.push("/search" as any)}>
            <Ionicons name="search-outline" size={22} color={colors.textSecondary} />
            <Text style={[styles.navText, { color: colors.textSecondary }]}>Kërko</Text>
          </Pressable>
          <Pressable style={styles.navItem} onPress={() => router.push("/library" as any)}>
            <Ionicons name="heart-outline" size={22} color={colors.textSecondary} />
            <Text style={[styles.navText, { color: colors.textSecondary }]}>Preferuarat</Text>
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
  scrollContent: { paddingHorizontal: 20, paddingBottom: 150 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10, marginBottom: 15 },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  brandTitle: { fontSize: 16, fontWeight: "700" },
  settingsButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#7A1E37", justifyContent: "center", alignItems: "center" },
  greetingTitle: { fontSize: 26, fontWeight: "800", marginBottom: 20 },
  searchContainer: { flexDirection: "row", alignItems: "center", borderRadius: 16, height: 50, paddingHorizontal: 15, marginBottom: 25, borderWidth: 1 },
  searchIcon: { marginRight: 10 },
  searchPlaceholder: { fontSize: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 15 },
  horizontalScroll: { marginBottom: 25 },
  trendingCard: { width: 140, marginRight: 15 },
  trendingImagePlaceholder: { width: 140, height: 140, backgroundColor: "#4A0E1F", borderRadius: 16, justifyContent: "center", alignItems: "center", marginBottom: 8, borderWidth: 1 },
  pinkDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#F4A5BD" },
  trendingSongTitle: { fontSize: 14, fontWeight: "700" },
  trendingArtist: { fontSize: 12 },
  genreScroll: { marginBottom: 25 },
  genreChip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1 },
  activeGenreChip: { backgroundColor: "#7A1E37", borderColor: "#F4A5BD" },
  genreText: { fontSize: 14, fontWeight: "600" },
  activeGenreText: { color: "#FFFFFF" },
  songRow: { flexDirection: "row", alignItems: "center", borderRadius: 16, padding: 12, marginBottom: 12, borderWidth: 1 },
  songRowIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: "#7A1E37", justifyContent: "center", alignItems: "center", marginRight: 12 },
  songRowInfo: { flex: 1 },
  songRowTitle: { fontSize: 15, fontWeight: "700", marginBottom: 2 },
  songRowArtist: { fontSize: 12 },
  songDuration: { fontSize: 13, marginRight: 5 },
  miniPlayer: { position: "absolute", bottom: 60, left: 16, right: 16, height: 60, borderRadius: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, borderWidth: 1, elevation: 10, zIndex: 10 },
  miniPlayerLeft: { flexDirection: "row", alignItems: "center", flex: 1, marginRight: 10 },
  miniThumb: { width: 38, height: 38, borderRadius: 10, backgroundColor: "#7A1E37", marginRight: 12 },
  miniTitle: { fontSize: 13, fontWeight: "700" },
  miniArtist: { fontSize: 11 },
  miniControls: { flexDirection: "row", alignItems: "center" },
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, height: 60, flexDirection: "row", justifyContent: "space-around", alignItems: "center", borderTopWidth: 1, zIndex: 10 },
  navItem: { alignItems: "center", justifyContent: "center", flex: 1 },
  navText: { fontSize: 11, marginTop: 3 }
});