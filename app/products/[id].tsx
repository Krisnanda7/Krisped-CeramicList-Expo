import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Animated,
  Easing,
} from "react-native";
import { useProductStore } from "../../store/useProductStore";
import { useCartStore } from "../../store/useStore";
import { useState, useRef } from "react";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { products, deleteProduct } = useProductStore();
  const { addToCart } = useCartStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showPopup = (message: string) => {
    setModalMessage(message);
    setModalVisible(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => setModalVisible(false));
      }, 1500);
    });
  };

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
    showPopup("✅ Produk berhasil ditambahkan ke keranjang!");
  };

  const handleEdit = () => {
    showPopup("✏️ Membuka halaman edit...");
    setTimeout(() => router.push(`/products/edit?id=${product.id}`), 800);
  };

  const handleDelete = () => {
    deleteProduct(product.id);
    showPopup("🗑️ Produk berhasil dihapus!");
    setTimeout(() => router.back(), 800);
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

      <TouchableOpacity style={styles.buttonSecondary} onPress={handleEdit}>
        <Text style={styles.buttonText}>✏️ Edit Produk</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
        <Text style={styles.buttonText}>🗑️ Hapus Produk</Text>
      </TouchableOpacity>

      {/* Pop-up animasi */}
      <Modal transparent visible={modalVisible} animationType="none">
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
            <Text style={styles.modalText}>{modalMessage}</Text>
          </Animated.View>
        </View>
      </Modal>
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

  // Popup styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: "#fff",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },
  modalText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
});
