import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Dimensions,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

const { width } = Dimensions.get("window");

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, toggleTheme, colors } = useTheme();
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("Shqip");
  const [isLangModalVisible, setIsLangModalVisible] = useState(false);

  const languages = ["Shqip", "English", "Deutsch", "Italiano", "Français"];

  return (
    <LinearGradient colors={colors.gradient} locations={[0, 0.45, 1]} style={styles.container}>
      <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentWrapper}>
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Ionicons name="options" size={20} color={colors.textPrimary} style={{ marginRight: 8 }} />
              <Text style={[styles.brandTitle, { color: colors.textPrimary }]}>Cilësimet</Text>
            </View>
            <Pressable 
              style={[styles.profileButton, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
              onPress={() => router.push("/player" as any)}
            >
              <Ionicons name="person" size={18} color={colors.textPrimary} />
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            
            {/* 1. SEKSIONI I LLOGARISË */}
            <Text style={[styles.sectionCategory, { color: colors.textSecondary }]}>Llogaria</Text>
            <Pressable 
              style={[styles.cardItem, { backgroundColor: colors.cardBg, borderColor: colors.border }]} 
              onPress={() => Alert.alert("Llogaria", "Menaxho detajet e profilit dhe fjalëkalimin.")}
            >
              <View style={styles.cardLeft}>
                <View style={styles.iconBox}>
                  <Ionicons name="person-circle-outline" size={20} color="#F3DCE8" />
                </View>
                <View>
                  <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Arta (Përdorues)</Text>
                  <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>arta@artmusic.app • Falas</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
            </Pressable>

            {/* 2. SEKSIONI PREMIUM */}
            <Pressable 
              style={styles.premiumBanner}
              onPress={() => Alert.alert("ART Music Premium", "Karakteristikat Premium do të vijnë së shpejti!")}
            >
              <LinearGradient 
                colors={["#9E2A4B", "#61152B"]} 
                style={styles.premiumGradient}
              >
                <View style={{ flex: 1, marginRight: 10 }}>
                  <View style={styles.badgeRow}>
                    <Ionicons name="star" size={14} color="#F4A5BD" style={{ marginRight: 4 }} />
                    <Text style={styles.badgeText}>PRO VERSION</Text>
                  </View>
                  <Text style={styles.premiumTitle}>Kalo në Premium</Text>
                  <Text style={styles.premiumSub}>Shijo muzikë pa reklama, cilësi të lartë & shkarkime pa limit.</Text>
                </View>
                <Ionicons name="arrow-forward-circle" size={32} color="#FFFFFF" />
              </LinearGradient>
            </Pressable>

            {/* 3. SEKSIONI I PREFERENCAVE */}
            <Text style={[styles.sectionCategory, { color: colors.textSecondary }]}>Preferencat</Text>
            
            {/* Zgjedhja e Gjuhës */}
            <Pressable 
              style={[styles.cardItem, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
              onPress={() => setIsLangModalVisible(true)}
            >
              <View style={styles.cardLeft}>
                <View style={styles.iconBox}>
                  <Ionicons name="language-outline" size={20} color="#F3DCE8" />
                </View>
                <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Gjuha e aplikacionit</Text>
              </View>
              <View style={styles.cardRightValue}>
                <Text style={[styles.valueText, { color: colors.textSecondary }]}>{selectedLanguage}</Text>
                <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} style={{ marginLeft: 6 }} />
              </View>
            </Pressable>

            {/* Switch Dark Mode */}
            <View style={[styles.cardItem, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <View style={styles.cardLeft}>
                <View style={styles.iconBox}>
                  <Ionicons name="moon-outline" size={20} color="#F3DCE8" />
                </View>
                <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Mënyra e errët (Dark Mode)</Text>
              </View>
              <Switch
                value={theme === "dark"}
                onValueChange={toggleTheme}
                trackColor={{ false: "#555", true: "#7A1E37" }}
                thumbColor={theme === "dark" ? "#F4A5BD" : "#f4f3f4"}
              />
            </View>

            {/* 4. SEKSIONI I INFORMACIONIT DHE DALJES */}
            <Text style={[styles.sectionCategory, { color: colors.textSecondary }]}>Të tjera</Text>
            <Pressable 
              style={[styles.cardItem, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
              onPress={() => Alert.alert("Rreth aplikacionit", "ART Music v1.0.0 - Ndërtuar me dashuri për muzikën.")}
            >
              <View style={styles.cardLeft}>
                <View style={styles.iconBox}>
                  <Ionicons name="information-circle-outline" size={20} color="#F3DCE8" />
                </View>
                <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Rreth aplikacionit</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
            </Pressable>

            <Pressable 
              style={[styles.cardItem, { backgroundColor: colors.cardBg, borderColor: "rgba(244,165,189,0.2)" }]}
              onPress={() => Alert.alert("Dilni", "A jeni të sigurt që dëshironi të dilni?")}
            >
              <View style={styles.cardLeft}>
                <View style={[styles.iconBox, { backgroundColor: "rgba(244,67,54,0.15)" }]}>
                  <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
                </View>
                <Text style={[styles.cardTitle, { color: "#FF6B6B" }]}>Dil nga llogaria</Text>
              </View>
            </Pressable>

          </ScrollView>
        </View>

        {/* MODAL PËR ZGJEDHJEN E GJUHËS */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isLangModalVisible}
          onRequestClose={() => setIsLangModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme === "dark" ? "#26070E" : "#FFFFFF" }]}>
              <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Zgjidh gjuhën</Text>
              {languages.map((lang) => (
                <Pressable
                  key={lang}
                  style={[
                    styles.langOption, 
                    { backgroundColor: colors.cardBg },
                    selectedLanguage === lang && styles.selectedLangOption
                  ]}
                  onPress={() => {
                    setSelectedLanguage(lang);
                    setIsLangModalVisible(false);
                  }}
                >
                  <Text style={[styles.langText, { color: colors.textSecondary }, selectedLanguage === lang && styles.selectedLangText]}>
                    {lang}
                  </Text>
                  {selectedLanguage === lang && (
                    <Ionicons name="checkmark" size={18} color="#F4A5BD" />
                  )}
                </Pressable>
              ))}
              <Pressable 
                style={styles.closeModalButton}
                onPress={() => setIsLangModalVisible(false)}
              >
                <Text style={[styles.closeModalText, { color: colors.textSecondary }]}>Anulo</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* MINI PLAYER STATIK NË FUND */}
        <Pressable 
          style={[styles.miniPlayer, { backgroundColor: theme === "dark" ? "#3b0a12" : "#e0c5cd", borderColor: colors.border }]} 
          onPress={() => router.push("/player" as any)}
        >
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

        {/* BOTTOM TAB BAR STATIK */}
        <View style={[styles.bottomNav, { backgroundColor: colors.navBg, borderTopColor: colors.border }]}>
          <Pressable style={styles.navItem} onPress={() => router.push("/home" as any)}>
            <Ionicons name="home-outline" size={22} color={colors.textSecondary} />
            <Text style={[styles.navText, { color: colors.textSecondary }]}>Kreu</Text>
          </Pressable>
          <Pressable style={styles.navItem} onPress={() => router.push("/search" as any)}>
            <Ionicons name="search-outline" size={22} color={colors.textSecondary} />
            <Text style={[styles.navText, { color: colors.textSecondary }]}>Kërko</Text>
          </Pressable>
          <Pressable style={styles.navItem} onPress={() => router.push("/library" as any)}>
            <Ionicons name="heart-outline" size={22} color={colors.textSecondary} />
            <Text style={[styles.navText, { color: colors.textSecondary }]}>Preferuarat</Text>
          </Pressable>
          <Pressable style={styles.navItem} onPress={() => {}}>
            <Ionicons name="options" size={22} color="#F4A5BD" />
            <Text style={[styles.navText, { color: "#F4A5BD" }]}>Cilësimet</Text>
          </Pressable>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 130,
  },
  header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 15 
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  brandTitle: { fontSize: 18, fontWeight: "700" },
  profileButton: { width: 36, height: 36, borderRadius: 18, justifyContent: "center", alignItems: "center", borderWidth: 1 },
  scrollContent: { paddingBottom: 20 },
  sectionCategory: { fontSize: 13, fontWeight: "700", textTransform: "uppercase", letterSpacing: 1, marginTop: 15, marginBottom: 10 },
  cardItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1 },
  cardLeft: { flexDirection: "row", alignItems: "center", flex: 1, marginRight: 10 },
  iconBox: { width: 38, height: 38, borderRadius: 12, backgroundColor: "#7A1E37", justifyContent: "center", alignItems: "center", marginRight: 12 },
  cardTitle: { fontSize: 15, fontWeight: "700", marginBottom: 2 },
  cardSubtitle: { fontSize: 12 },
  cardRightValue: { flexDirection: "row", alignItems: "center" },
  valueText: { fontSize: 14, fontWeight: "600" },
  premiumBanner: { borderRadius: 18, overflow: "hidden", marginVertical: 10, borderWidth: 1, borderColor: "rgba(244,165,189,0.3)" },
  premiumGradient: { flexDirection: "row", alignItems: "center", padding: 18 },
  badgeRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  badgeText: { color: "#F4A5BD", fontSize: 11, fontWeight: "800", letterSpacing: 1 },
  premiumTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", marginBottom: 2 },
  premiumSub: { color: "#F3DCE8", fontSize: 12, opacity: 0.85 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", alignItems: "center" },
  modalContent: { width: width * 0.82, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: "rgba(244,165,189,0.25)" },
  modalTitle: { fontSize: 18, fontWeight: "800", marginBottom: 15, textAlign: "center" },
  langOption: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12, paddingHorizontal: 15, borderRadius: 12, marginBottom: 8 },
  selectedLangOption: { backgroundColor: "#7A1E37" },
  langText: { fontSize: 15, fontWeight: "600" },
  selectedLangText: { color: "#FFFFFF", fontWeight: "700" },
  closeModalButton: { marginTop: 10, paddingVertical: 12, alignItems: "center" },
  closeModalText: { fontSize: 14, fontWeight: "700" },
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