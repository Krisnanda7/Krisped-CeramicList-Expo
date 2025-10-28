import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useProductStore } from "../../store/useProductStore";

export default function EditProductScreen() {
  const { id } = useLocalSearchParams();
  const { products, editProduct } = useProductStore();
  const router = useRouter();

  const productId = Array.isArray(id) ? id[0] : id;
  const existing = products.find((p) => p.id === productId);

  const [name, setName] = useState(existing?.name || "");
  const [price, setPrice] = useState(existing?.price?.toString() || "");
  const [image, setImage] = useState(existing?.image || null);
  const [showPopup, setShowPopup] = useState(false);

  const popupOpacity = useRef(new Animated.Value(0)).current;
  const popupScale = useRef(new Animated.Value(0.8)).current;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleUpdate = () => {
    if (!name || !price || !image) {
      showTemporaryPopup("Harap isi semua data", false);
      return;
    }

    editProduct(productId, {
      name,
      price: parseInt(price),
      image,
    });

    showTemporaryPopup("Produk berhasil diperbarui!", true);
  };

  const showTemporaryPopup = (message: string, success: boolean) => {
    setPopupMessage(message);
    setPopupSuccess(success);
    setShowPopup(true);

    // animasi muncul
    Animated.parallel([
      Animated.timing(popupOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(popupScale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    // hilang  setelah 1.8 detik
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(popupOpacity, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(popupScale, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowPopup(false);
        if (success) router.back(); // kembali ke halaman sebelumnya jika sukses
      });
    }, 1800);
  };

  const [popupMessage, setPopupMessage] = useState("");
  const [popupSuccess, setPopupSuccess] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Produk</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>Pilih Gambar</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nama Produk"
        style={styles.input}
        placeholderTextColor="#9E9E9E"
      />
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="Harga Produk"
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#9E9E9E"
      />

      <TouchableOpacity onPress={handleUpdate} style={styles.button}>
        <Text style={styles.buttonText}>SIMPAN PERUBAHAN</Text>
      </TouchableOpacity>

      {/* 🔹 Popup animasi */}
      {showPopup && (
        <Animated.View
          style={[
            styles.popupContainer,
            {
              opacity: popupOpacity,
              transform: [{ scale: popupScale }],
            },
          ]}
        >
          <View
            style={[
              styles.popup,
              { backgroundColor: popupSuccess ? "#4CAF50" : "#C62828" },
            ]}
          >
            <Text style={styles.popupText}>{popupMessage}</Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3F1",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#8B4513",
    textAlign: "center",
    marginBottom: 20,
  },
  imagePicker: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#D7CCC8",
  },
  imagePlaceholder: {
    width: 220,
    height: 220,
    backgroundColor: "#EDEAE0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#BCAAA4",
  },
  imagePlaceholderText: {
    color: "#8B6B61",
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D7CCC8",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginTop: 12,
    color: "#3E2723",
  },
  button: {
    backgroundColor: "#8B4513",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 25,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  popupContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  popup: {
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  popupText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
