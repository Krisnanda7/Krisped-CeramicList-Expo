import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useProductStore } from "../../store/useProductStore";
import { useCartStore } from "../../store/useStore";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { products, deleteProduct } = useProductStore();
  const { addToCart } = useCartStore(); // ⬅️ pakai store keranjang

  const productId = Array.isArray(id) ? id[0] : id;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Produk tidak ditemukan</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    Alert.alert("Berhasil", "Produk ditambahkan ke keranjang");
  };

  return (
    <View style={styles.container}>
      {product.image && <Image source={product.image} style={styles.image} />}

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>
        Rp {product.price.toLocaleString("id-ID")}
      </Text>

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>+ Tambah ke Keranjang</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => router.push(`/products/edit?id=${product.id}`)}
      >
        <Text style={styles.buttonText}>✏️ Edit Produk</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonDelete}
        onPress={() => {
          deleteProduct(product.id);
          Alert.alert("Dihapus", "Produk berhasil dihapus");
          router.back();
        }}
      >
        <Text style={styles.buttonText}>🗑️ Hapus Produk</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F5F3F1", flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  notFound: { color: "#8B4513", fontSize: 16 },
  image: { width: "100%", height: 240, borderRadius: 12, marginBottom: 16 },
  name: { fontSize: 22, fontWeight: "700", color: "#3E2723", marginBottom: 6 },
  price: { fontSize: 18, color: "#8B4513", marginBottom: 20 },
  buttonPrimary: {
    backgroundColor: "#8B4513",
    padding: 14,
    borderRadius: 10,
    marginVertical: 6,
  },
  buttonSecondary: {
    backgroundColor: "#D2691E",
    padding: 14,
    borderRadius: 10,
    marginVertical: 6,
  },
  buttonDelete: {
    backgroundColor: "#C62828",
    padding: 14,
    borderRadius: 10,
    marginVertical: 6,
  },
  buttonText: { color: "#fff", fontWeight: "600", textAlign: "center" },
});
