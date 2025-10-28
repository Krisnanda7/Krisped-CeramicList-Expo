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

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../../assets/images/product/Logo.png")}
          style={styles.logo}
        />
      </View>
      {products.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Belum ada produk. Tambahkan produk baru.
        </Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Link
                href={{
                  pathname: "/products/[id]",
                  params: { id: item.id },
                }}
                asChild
              >
                <View>
                  <Image source={item.image} style={styles.image} />
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>
                    Rp {item.price.toLocaleString("id-ID")}
                  </Text>
                </View>
              </Link>
            </TouchableOpacity>
          )}
        />
      )}

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
    backgroundColor: "#F5F3F1",
  },
  logo: {
    // width: 120,
    // height: 120,
    alignSelf: "center",
    resizeMode: "contain",
    marginTop: 10,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#8B4513",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#D2691E",
    textAlign: "center",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    marginHorizontal: 10,
    color: "#3E2723",
  },
  price: {
    color: "#8B4513",
    marginTop: 4,
    marginBottom: 10,
    marginHorizontal: 10,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#8B4513",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 25,
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
