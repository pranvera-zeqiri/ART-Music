import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const router = useRouter();

  // Ekrani Splash shfaqet për 2 sekonda kur hapet aplikacioni
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
    if (!isLogin && !username.trim()) {
      Alert.alert("Kujdes", "Ju lutem shkruani emrin e përdoruesit.");
      return;
    }

    if (!email.trim() || !password) {
      Alert.alert("Kujdes", "Ju lutem plotësoni të gjitha fushat.");
      return;
    }

    // Navigimi direkt tek faqja e këngëve home.tsx
    // @ts-ignore
    router.push("/home");
  };

  // 1. SPLASH SCREEN (Ekrani i parë për 2 sekonda)
  if (showSplash) {
    return (
      <LinearGradient
        colors={["#3b0a12", "#21060b", "#120305"]}
        style={styles.splashContainer}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.splashContent}>
          <Text style={styles.appName}>
            ART <Text style={styles.appNameAccent}>Music</Text>
          </Text>
          
          <Text style={styles.splashTagline}>Music heals your soul.</Text>
          
          <View style={styles.waveContainer}>
            <Ionicons name="musical-notes-outline" size={32} color="#f3dce8" />
          </View>
        </View>

        <View style={styles.splashFooter}>
          <Text style={styles.footerCreator}>Created by Elmedin & Pranvera</Text>
        </View>
      </LinearGradient>
    );
  }

  // 2. FORMULARI I HYRJES / REGJISTRIMIT
  return (
    <LinearGradient
      colors={["#3b0a12", "#21060b", "#120305"]}
      locations={[0, 0.48, 1]}
      style={styles.background}
    >
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              {/* Ikona e ndriçimit */}
              <Pressable
                style={styles.themeButton}
                onPress={() =>
                  Alert.alert("Tema", "Opsionet e temës do të aktivizohen së shpejti.")
                }
              >
                <Ionicons name="sunny-outline" size={27} color="#FFFFFF" />
              </Pressable>

              {/* Logo */}
              <View style={styles.header}>
                <LinearGradient
                  colors={["#FFF5F5", "#F3DCE8"]}
                  style={styles.logo}
                >
                  <Ionicons name="musical-notes" size={49} color="#8F183E" />
                </LinearGradient>

                <Text style={styles.appName}>
                  ART <Text style={styles.appNameAccent}>Music</Text>
                </Text>

                <Text style={styles.tagline}>
                  Muzikë pa limit. Pa reklama. Falas.
                </Text>
              </View>

              {/* Skedat Hyr / Regjistrohu */}
              <View style={styles.tabs}>
                <Pressable onPress={() => setIsLogin(true)} style={styles.tab}>
                  {isLogin ? (
                    <LinearGradient
                      colors={["#7A1E37", "#9E2A4B"]}
                      style={styles.activeTab}
                    >
                      <Text style={styles.activeTabText}>Hyr</Text>
                    </LinearGradient>
                  ) : (
                    <Text style={styles.tabText}>Hyr</Text>
                  )}
                </Pressable>

                <Pressable onPress={() => setIsLogin(false)} style={styles.tab}>
                  {!isLogin ? (
                    <LinearGradient
                      colors={["#7A1E37", "#9E2A4B"]}
                      style={styles.activeTab}
                    >
                      <Text style={styles.activeTabText}>Regjistrohu</Text>
                    </LinearGradient>
                  ) : (
                    <Text style={styles.tabText}>Regjistrohu</Text>
                  )}
                </Pressable>
              </View>

              {/* Formulari */}
              <View style={styles.form}>
                {!isLogin && (
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Emri i përdoruesit"
                      placeholderTextColor="#E1DDE7"
                      value={username}
                      onChangeText={setUsername}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                )}

                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#E1DDE7"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Fjalëkalimi"
                    placeholderTextColor="#E1DDE7"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />

                  <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    hitSlop={12}
                    style={styles.eyeButton}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={23}
                      color="#E9E4F0"
                    />
                  </Pressable>
                </View>

                <Pressable
                  onPress={handleSubmit}
                  style={({ pressed }) => [
                    styles.submitButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <LinearGradient
                    colors={["#7A1E37", "#9E2A4B", "#61152B"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.submitGradient}
                  >
                    <Text style={styles.submitText}>
                      {isLogin ? "Hyr në llogari" : "Krijo llogarinë"}
                    </Text>
                  </LinearGradient>
                </Pressable>

                <Text style={styles.description}>
                  Llogaria është falas. Dëgjo sa të duash, pa reklama.
                </Text>

                <Pressable
                  onPress={() => setIsLogin(!isLogin)}
                  style={styles.switchAccount}
                >
                  <Text style={styles.switchText}>
                    {isLogin ? "Nuk ke llogari? " : "Ke llogari? "}
                    <Text style={styles.switchAccent}>
                      {isLogin ? "Regjistrohu" : "Hyr"}
                    </Text>
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  splashContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  splashTagline: {
    fontSize: 16,
    color: "#F7F1F8",
    fontStyle: "italic",
    marginTop: 12,
    marginBottom: 20,
    textAlign: "center",
  },
  waveContainer: {
    marginVertical: 10,
  },
  splashFooter: {
    position: "absolute",
    bottom: 40,
    alignItems: "center",
  },
  footerCreator: {
    fontSize: 13,
    color: "#d4b2b5",
    marginBottom: 4,
  },
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 25,
  },
  container: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    paddingHorizontal: 28,
  },
  themeButton: {
    position: "absolute",
    right: 28,
    top: -5,
    zIndex: 2,
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginTop: 28,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  appName: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "800",
    letterSpacing: -1.3,
    textAlign: "center",
  },
  appNameAccent: {
    color: "#F4A5BD",
  },
  tagline: {
    color: "#F7F1F8",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 10,
    textAlign: "center",
  },
  tabs: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderRadius: 18,
    marginTop: 35,
    marginBottom: 24,
    padding: 4,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    overflow: "hidden",
  },
  activeTab: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  tabText: {
    color: "#F1EAF5",
    fontSize: 16,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  form: {
    width: "100%",
  },
  inputWrapper: {
    height: 62,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.09)",
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.025)",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 18,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#FFFFFF",
    fontSize: 16,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    color: "#FFFFFF",
    fontSize: 16,
  },
  eyeButton: {
    padding: 4,
    marginLeft: 8,
  },
  submitButton: {
    height: 62,
    borderRadius: 17,
    overflow: "hidden",
    marginTop: 8,
  },
  submitGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.8,
  },
  description: {
    color: "#E5DDEB",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 21,
    marginTop: 18,
  },
  switchAccount: {
    alignItems: "center",
    paddingVertical: 18,
  },
  switchText: {
    color: "#E9DFED",
    fontSize: 15,
  },
  switchAccent: {
    color: "#F2A4BE",
    fontWeight: "700",
  },
});