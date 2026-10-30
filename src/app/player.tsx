import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import {
    Alert,
    Dimensions,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function PlayerScreen() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleShare = async () => {
    try {
      await Sharing.shareAsync("https://artmusic.app/song/nete-e-kuqe", {
        dialogTitle: "Shpërndaj këtë këngë me miqtë",
      });
    } catch (error) {
      Alert.alert("Gabim", "Nuk u mundësua shpërndarja e linkut.");
    }
  };

  const handleDownload = () => {
    setIsDownloaded(!isDownloaded);
    Alert.alert(
      isDownloaded ? "U hoq nga shkarkimet" : "U shkarkua",
      isDownloaded ? "Kënga u fshi nga memorja offline." : "Kënga u ruajt për dëgjim offline!"
    );
  };

  return (
    <LinearGradient
      colors={["#3b0a12", "#21060b", "#120305"]}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Korniza kryesore që mban distancë të barabartë në të katër anët */}
        <View style={styles.contentWrapper}>
          
          {/* 1. Header (Mbyllja, Titulli, Share) */}
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} hitSlop={15} style={styles.iconButton}>
              <Ionicons name="chevron-down" size={26} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.headerTitle}>DUKE LUAJTUR</Text>
            <Pressable onPress={handleShare} hitSlop={15} style={styles.iconButton}>
              <Ionicons name="share-social-outline" size={22} color="#FFFFFF" />
            </Pressable>
          </View>

          {/* 2. Artwork (Kopertina në proporcion të rregulluar) */}
          <View style={styles.artworkContainer}>
            <LinearGradient colors={["#7A1E37", "#4A0E1F", "#1A0307"]} style={styles.artworkGradient}>
              <View style={styles.circleDecoration1} />
              <View style={styles.circleDecoration2} />
              <Ionicons name="musical-notes" size={70} color="#F3DCE8" style={{ opacity: 0.85 }} />
            </LinearGradient>
          </View>

          {/* 3. Informacioni i Këngës & Butoni Like */}
          <View style={styles.songInfoContainer}>
            <View style={styles.textWrapper}>
              <Text style={styles.songTitle} numberOfLines={1}>Netë e Kuqe</Text>
              <Text style={styles.artistName}>Violet Hour</Text>
            </View>
            <Pressable onPress={() => setIsLiked(!isLiked)} hitSlop={12} style={styles.likeButton}>
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={26}
                color={isLiked ? "#F4A5BD" : "#FFFFFF"}
              />
            </Pressable>
          </View>

          {/* 4. Shiriti i Progresit (I shkurtër dhe brenda kornizës) */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View style={styles.progressBarFill} />
              <View style={styles.progressThumb} />
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>1:24</Text>
              <Text style={styles.timeText}>3:42</Text>
            </View>
          </View>

          {/* 5. Kontrollet e Muzikës (Të mbledhura bukur në qendër) */}
          <View style={styles.controlsContainer}>
            <Pressable onPress={() => Alert.alert("Shuffle", "U aktivizua përzierja.")} hitSlop={10}>
              <Ionicons name="shuffle-outline" size={20} color="#D4B2B5" />
            </Pressable>

            <Pressable onPress={() => Alert.alert("Kënga e mëparshme")} hitSlop={10}>
              <Ionicons name="play-skip-back" size={24} color="#FFFFFF" />
            </Pressable>

            <Pressable onPress={() => setIsPlaying(!isPlaying)} style={styles.playButton}>
              <LinearGradient colors={["#9E2A4B", "#61152B"]} style={styles.playGradient}>
                <Ionicons name={isPlaying ? "pause" : "play"} size={26} color="#FFFFFF" />
              </LinearGradient>
            </Pressable>

            <Pressable onPress={() => Alert.alert("Kënga e radhës")} hitSlop={10}>
              <Ionicons name="play-skip-forward" size={24} color="#FFFFFF" />
            </Pressable>

            <Pressable onPress={handleDownload} hitSlop={10}>
              <Ionicons
                name={isDownloaded ? "cloud-done" : "cloud-download-outline"}
                size={20}
                color={isDownloaded ? "#F4A5BD" : "#D4B2B5"}
              />
            </Pressable>
          </View>

        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  // Margini i përbashkët (padding) që krijon kornizën e dëshiruar me distancë të barabartë në 4 anët
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 26, // Distancë e njejtë majtas dhe djathtas
    paddingVertical: 15,   // Distancë e njejtë lart dhe poshtë
    justifyContent: "space-between", // Shpërndan elementet në mënyrë proporcionale
  },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
  },
  iconButton: { padding: 2 },
  headerTitle: { 
    color: "#F7F1F8", 
    fontSize: 12, 
    fontWeight: "700", 
    letterSpacing: 2 
  },
  artworkContainer: { 
    width: "100%", 
    aspectRatio: 1, // Përmasa fiks katrore në proporcion me ekranin
    maxHeight: width * 0.72,
    borderRadius: 22, 
    overflow: "hidden", 
    alignSelf: "center",
    elevation: 8, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.35, 
    shadowRadius: 10, 
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)"
  },
  artworkGradient: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    position: "relative" 
  },
  circleDecoration1: { 
    position: "absolute", 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: "rgba(255,255,255,0.12)", 
    top: 20, 
    left: 20 
  },
  circleDecoration2: { 
    position: "absolute", 
    width: 90, 
    height: 90, 
    borderRadius: 45, 
    backgroundColor: "rgba(255,100,120,0.18)", 
    bottom: 15, 
    right: 15 
  },
  songInfoContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
  },
  textWrapper: { flex: 1, marginRight: 15 },
  songTitle: { 
    color: "#FFFFFF", 
    fontSize: 20, 
    fontWeight: "800", 
    marginBottom: 4 
  },
  artistName: { 
    color: "#D4B2B5", 
    fontSize: 14, 
    fontWeight: "500" 
  },
  likeButton: { padding: 4 },
  progressContainer: { 
    width: "100%", 
  },
  progressBarBackground: { 
    width: "100%", 
    height: 4, 
    backgroundColor: "rgba(255,255,255,0.15)", 
    borderRadius: 2, 
    position: "relative" 
  },
  progressBarFill: { 
    width: "35%", 
    height: "100%", 
    backgroundColor: "#F4A5BD", 
    borderRadius: 2 
  },
  progressThumb: { 
    position: "absolute", 
    top: -4, 
    left: "35%", 
    width: 12, 
    height: 12, 
    borderRadius: 6, 
    backgroundColor: "#FFFFFF" 
  },
  timeRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginTop: 6 
  },
  timeText: { 
    color: "#D4B2B5", 
    fontSize: 11 
  },
  controlsContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-around", // I mbledh ikonat ngushtë dhe bukur në qendër
    paddingHorizontal: 10,
  },
  playButton: { 
    width: 58, 
    height: 58, 
    borderRadius: 29, 
    overflow: "hidden", 
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6
  },
  playGradient: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center" 
  },
});