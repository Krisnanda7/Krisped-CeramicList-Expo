import { useThemeStore } from "@/store/useThemeStore";
import { Link } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useProductStore } from "../../store/useProductStore";

export default function HomeScreen() {
  const { products } = useProductStore();
  const { isDarkMode, toggleTheme } = useThemeStore();

  const backgroundColor = isDarkMode ? "#121212" : "#F5F3F1";
  const textColor = isDarkMode ? "#FFFFFF" : "#3E2723";
  const cardColor = isDarkMode ? "#1E1E1E" : "#FFFFFF";
  const priceColor = isDarkMode ? "#FFD700" : "#8B4513";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* toggle theme  */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleTheme}>
          <Text style={{ color: textColor, fontWeight: "600" }}>
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Logo */}
      <Image
        source={require("../../assets/images/product/Logo.png")}
        style={styles.logo}
      />

      {/* Daftar produk */}
      {products.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, color: textColor }}>
          Belum ada produk. Tambahkan produk baru.
        </Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, { backgroundColor: cardColor }]}
            >
              <Link
                href={{
                  pathname: "/products/[id]",
                  params: { id: item.id },
                }}
                asChild
              >
                <View>
                  <View style={styles.imageWrapper}>
                    <Image source={item.image} style={styles.image} />
                  </View>
                  <View style={styles.info}>
                    <Text style={[styles.name, { color: textColor }]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.price, { color: priceColor }]}>
                      Rp {item.price.toLocaleString("id-ID")}
                    </Text>
                  </View>
                </View>
              </Link>
            </TouchableOpacity>
          )}
        />
      )}

      {/*  tambah produk */}
      <Link href="/add" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ADD NEW PRODUCT</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: "flex-end",
    marginBottom: 8,
  },
  logo: {
    alignSelf: "center",
    resizeMode: "contain",
    width: 250,
  },
  card: {
    marginVertical: 8,
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  imageWrapper: {
    width: "100%",
    height: 140,
    overflow: "hidden",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  info: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
  },
  price: {
    marginTop: 4,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#8B4513",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    letterSpacing: 0.5,
    fontSize: 16,
  },
});
