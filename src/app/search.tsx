import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Dimensions,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

const { width } = Dimensions.get("window");

export default function SearchScreen() {
  const router = useRouter();
  const { theme, colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSong, setActiveSong] = useState<{ title: string; artist: string } | null>({
    title: "Netë e Kuqe",
    artist: "Violet Hour",
  });

  const allSongs = [
    { id: "1", title: "Netë e Kuqe", artist: "Violet Hour", duration: "3:42" },
    { id: "2", title: "Zëri i Lumit", artist: "Lumi Ensemble", duration: "4:05" },
    { id: "3", title: "Pas Mesnatës", artist: "Drita Sound", duration: "2:58" },
    { id: "4", title: "Rruga e Shkrepëtirës", artist: "Kuq Atelier", duration: "3:15" },
    { id: "5", title: "Vera në Bremen", artist: "Mesnata", duration: "4:20" },
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setHasSearched(true);
    const filtered = allSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  };

  return (
    <LinearGradient colors={colors.gradient} locations={[0, 0.45, 1]} style={styles.container}>
      <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentWrapper}>
          
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} hitSlop={15}>
              <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
            </Pressable>
            <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Kërko Këngë</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={[styles.searchContainer, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: colors.textPrimary }]}
              placeholder="Shkruaj emrin e këngës ose artistit..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              autoFocus={true}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => { setSearchQuery(""); setHasSearched(false); }}>
                <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
              </Pressable>
            )}
          </View>

          <ScrollView contentContainerStyle={styles.resultsScroll} showsVerticalScrollIndicator={false}>
            {hasSearched ? (
              searchResults.length > 0 ? (
                <>
                  <Text style={[styles.resultHeading, { color: colors.textSecondary }]}>Rezultatet e gjetura ({searchResults.length})</Text>
                  {searchResults.map((song) => (
                    <Pressable key={song.id} style={[styles.songRow, { backgroundColor: colors.cardBg, borderColor: colors.border }]} onPress={() => router.push("/player" as any)}>
                      <View style={styles.songRowIcon}>
                        <Ionicons name="musical-note" size={18} color="#F3DCE8" />
                      </View>
                      <View style={styles.songRowInfo}>
                        <Text style={[styles.songRowTitle, { color: colors.textPrimary }]}>{song.title}</Text>
                        <Text style={[styles.songRowArtist, { color: colors.textSecondary }]}>{song.artist}</Text>
                      </View>
                      <Text style={[styles.songDuration, { color: colors.textSecondary }]}>{song.duration}</Text>
                      <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} style={{ marginLeft: 10 }} />
                    </Pressable>
                  ))}
                </>
              ) : (
                <View style={styles.noResultContainer}>
                  <Ionicons name="musical-notes-outline" size={50} color={colors.textSecondary} />
                  <Text style={[styles.noResultText, { color: colors.textPrimary }]}>Nuk u gjet asnjë këngë për "{searchQuery}"</Text>
                </View>
              )
            ) : (
              <View style={styles.noResultContainer}>
                <Ionicons name="search-outline" size={50} color={colors.textSecondary} />
                <Text style={[styles.noResultText, { color: colors.textPrimary }]}>Çfarë dëshiron të dëgjosh sot?</Text>
              </View>
            )}
          </ScrollView>

        </View>

        {activeSong && (
          <Pressable style={[styles.miniPlayer, { backgroundColor: theme === "dark" ? "#3b0a12" : "#e0c5cd", borderColor: colors.border }]} onPress={() => router.push("/player" as any)}>
            <View style={styles.miniPlayerLeft}>
              <View style={styles.miniThumb} />
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={[styles.miniTitle, { color: colors.textPrimary }]} numberOfLines={1}>{activeSong.title}</Text>
                <Text style={[styles.miniArtist, { color: colors.textSecondary }]} numberOfLines={1}>{activeSong.artist}</Text>
              </View>
            </View>
            <View style={styles.miniControls}>
              <Pressable onPress={() => setIsPlaying(!isPlaying)} style={{ marginRight: 15 }}>
                <Ionicons name={isPlaying ? "pause" : "play"} size={22} color={colors.textPrimary} />
              </Pressable>
              <Pressable onPress={() => router.push("/player" as any)}>
                <Ionicons name="play-skip-forward" size={22} color={colors.textPrimary} />
              </Pressable>
            </View>
          </Pressable>
        )}

        <View style={[styles.bottomNav, { backgroundColor: colors.navBg, borderTopColor: colors.border }]}>
          <Pressable style={styles.navItem} onPress={() => router.push("/home" as any)}>
            <Ionicons name="home-outline" size={22} color={colors.textSecondary} />
            <Text style={[styles.navText, { color: colors.textSecondary }]}>Kreu</Text>
          </Pressable>
          <Pressable style={styles.navItem} onPress={() => {}}>
            <Ionicons name="search" size={22} color="#F4A5BD" />
            <Text style={[styles.navText, { color: "#F4A5BD" }]}>Kërko</Text>
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
  contentWrapper: { flex: 1, paddingHorizontal: 20, paddingTop: 10, paddingBottom: 130 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  headerTitle: { fontSize: 16, fontWeight: "700" },
  searchContainer: { flexDirection: "row", alignItems: "center", borderRadius: 16, height: 50, paddingHorizontal: 15, marginBottom: 20, borderWidth: 1 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15 },
  resultsScroll: { paddingBottom: 20 },
  resultHeading: { fontSize: 14, fontWeight: "600", marginBottom: 15 },
  songRow: { flexDirection: "row", alignItems: "center", borderRadius: 16, padding: 12, marginBottom: 12, borderWidth: 1 },
  songRowIcon: { width: 42, height: 42, borderRadius: 12, backgroundColor: "#7A1E37", justifyContent: "center", alignItems: "center", marginRight: 12 },
  songRowInfo: { flex: 1 },
  songRowTitle: { fontSize: 15, fontWeight: "700", marginBottom: 2 },
  songRowArtist: { fontSize: 12 },
  songDuration: { fontSize: 13 },
  noResultContainer: { alignItems: "center", justifyContent: "center", marginTop: 80 },
  noResultText: { fontSize: 16, fontWeight: "700", marginTop: 15, textAlign: "center" },
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