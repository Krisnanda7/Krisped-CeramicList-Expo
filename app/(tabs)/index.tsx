import { useThemeStore } from "@/store/useThemeStore";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AboutHome() {
  const { isDarkMode, toggleTheme } = useThemeStore();

  const backgroundColor = isDarkMode ? "#121212" : "#F5F3F1";
  const textColor = isDarkMode ? "#FFFFFF" : "#3E2723";
  const subTextColor = isDarkMode ? "#BDBDBD" : "#4E342E";
  const footerColor = isDarkMode ? "#A1887F" : "#6D4C41";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.themeToggle}>
        <TouchableOpacity onPress={toggleTheme}>
          <Text style={[styles.themeText, { color: textColor }]}>
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require("../../assets/images/product/Logo.png")}
        style={styles.logo}
      />

      <Text style={[styles.text, { color: subTextColor }]}>
        Selamat datang di Krisped! Kami berkomitmen untuk menyediakan produk
        ceramic berkualitas tinggi yang menggabungkan keindahan dan
        fungsionalitas. Jelajahi koleksi kami dan temukan karya seni yang
        sempurna untuk rumah Anda.
      </Text>

      {/* 🔹 Tombol menuju halaman produk */}
      <Link href="/listProduct" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Lihat Produk Kami</Text>
        </TouchableOpacity>
      </Link>

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
  themeText: { fontWeight: "600", fontSize: 14 },
  logo: { resizeMode: "contain", marginBottom: 12 },
  text: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#8B4513",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  footer: { fontSize: 12, marginTop: 20 },
});
