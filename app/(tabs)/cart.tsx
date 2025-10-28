import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { useCartStore } from "../../store/useStore";

export default function Cart() {
  const router = useRouter();
  const { cart, removeFromCart, clearCart } = useCartStore();

  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.icon}>🛒</Text>
        <Text style={styles.title}>Keranjang Kosong</Text>
        <Text style={styles.subtitle}>
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
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.image} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>
                Rp {(item.price * item.quantity).toLocaleString("id-ID")}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Text style={styles.remove}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
        <Text style={styles.clearText}>Hapus Semua</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3F1",
    padding: 20,
  },
  icon: {
    fontSize: 48,
    textAlign: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#3E2723",
    textAlign: "center",
  },
  subtitle: {
    color: "#8B6B61",
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
    backgroundColor: "#fff",
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
    color: "#3E2723",
  },
  price: {
    color: "#8B4513",
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
