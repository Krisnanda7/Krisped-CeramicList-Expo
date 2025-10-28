import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { nanoid } from "nanoid/non-secure";
import { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useProductStore } from "../store/useProductStore";

export default function AddProductScreen() {
  const addProduct = useProductStore((s) => s.addProduct);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleAdd = () => {
    if (!name || !price || !image) {
      Alert.alert("Harap isi semua data");
      return;
    }

    addProduct({ id: nanoid(), name, price: parseInt(price), image });
    Alert.alert("Sukses", "Produk berhasil ditambahkan!");
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Produk Baru</Text>

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
        placeholder="Nama Produk"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#9E9E9E"
      />

      <TextInput
        placeholder="Harga Produk"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#9E9E9E"
      />

      <TouchableOpacity onPress={handleAdd} style={styles.button}>
        <Text style={styles.buttonText}>SIMPAN PRODUK</Text>
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
});
