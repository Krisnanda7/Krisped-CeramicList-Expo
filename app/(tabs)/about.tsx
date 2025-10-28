import { useThemeStore } from "@/store/useThemeStore";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AboutScreen() {
  const { isDarkMode, toggleTheme } = useThemeStore();

  // Theme colors
  const backgroundColor = isDarkMode ? "#121212" : "#F5F3F1";
  const textColor = isDarkMode ? "#FFFFFF" : "#3E2723";
  const subTextColor = isDarkMode ? "#BDBDBD" : "#4E342E";
  const footerColor = isDarkMode ? "#A1887F" : "#6D4C41";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* 🔹 Tombol toggle theme di kanan atas */}
      <View style={styles.themeToggle}>
        <TouchableOpacity onPress={toggleTheme}>
          <Text style={[styles.themeText, { color: textColor }]}>
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 Logo */}
      <Image
        source={require("../../assets/images/product/Logo.png")}
        style={styles.logo}
      />

      {/* 🔹 Deskripsi */}
      <Text style={[styles.text, { color: subTextColor }]}>
        Aplikasi ini dibuat untuk membantu pengelolaan produk kerajinan keramik
        secara sederhana dan efisien. Dengan fitur-fitur seperti penambahan,
        pengeditan, dan penghapusan produk, serta keranjang belanja, pengguna
        dapat dengan mudah mengatur inventaris mereka dan meningkatkan
        pengalaman berbelanja pelanggan.
      </Text>

      {/* 🔹 Footer */}
      <Text style={[styles.footer, { color: footerColor }]}>
        © 2025 Krisped Studio
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  themeToggle: {
    alignSelf: "flex-end",
    position: "absolute",
    top: 50,
    right: 20,
  },
  themeText: {
    fontWeight: "600",
    fontSize: 14,
  },
  logo: {
    resizeMode: "contain",
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 18,
  },
  text: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  footer: {
    fontSize: 12,
  },
});
