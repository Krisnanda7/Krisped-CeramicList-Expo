import { useThemeStore } from "@/store/useThemeStore";
import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCartStore } from "../../store/useStore";

export default function Cart() {
  const router = useRouter();
  const { cart, removeFromCart, clearCart } = useCartStore();
  const { isDarkMode, toggleTheme } = useThemeStore();

  // Theme colors
  const backgroundColor = isDarkMode ? "#121212" : "#F5F3F1";
  const textColor = isDarkMode ? "#FFFFFF" : "#3E2723";
  const cardColor = isDarkMode ? "#1E1E1E" : "#FFFFFF";
  const secondaryText = isDarkMode ? "#BDBDBD" : "#8B6B61";

  if (cart.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        {/* Tombol toggle theme */}
        <View style={{ alignItems: "flex-end", marginBottom: 10 }}>
          <TouchableOpacity onPress={toggleTheme}>
            <Text style={[styles.themeText, { color: textColor }]}>
              {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.icon, { color: textColor }]}>🛒</Text>
        <Text style={[styles.title, { color: textColor }]}>
          Keranjang Kosong
        </Text>
        <Text style={[styles.subtitle, { color: secondaryText }]}>
          Tambahkan produk untuk mulai berbelanja!
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/")}
        >
          <Text style={styles.buttonText}>Kembali ke Beranda</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Tombol toggle theme */}
      <View style={{ alignItems: "flex-end", marginBottom: 10 }}>
        <TouchableOpacity onPress={toggleTheme}>
          <Text style={[styles.themeText, { color: textColor }]}>
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Daftar produk */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.cartItem, { backgroundColor: cardColor }]}>
            <Image source={item.image} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.name, { color: textColor }]}>
                {item.name}
              </Text>
              <Text style={[styles.price, { color: secondaryText }]}>
                Rp {(item.price * item.quantity).toLocaleString("id-ID")}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Text style={[styles.remove, { color: textColor }]}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Tombol hapus semua */}
      <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
        <Text style={styles.clearText}>Hapus Semua</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  themeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
  themeText: {
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    fontSize: 48,
    textAlign: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#8B4513",
    padding: 14,
    borderRadius: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
  },
  price: {
    marginTop: 4,
  },
  remove: {
    fontSize: 18,
  },
  clearButton: {
    backgroundColor: "#C62828",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  clearText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});
