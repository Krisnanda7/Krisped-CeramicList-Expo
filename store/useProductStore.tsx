import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

type Product = {
  id: string;
  name: string;
  price: number;
  image: any; // bisa require(...) dari assets
};

type ProductStore = {
  products: Product[];
  addProduct: (product: Product) => void;
  editProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  // 🔹 Tambahkan 3 produk permanen di sini
  products: [
    {
      id: uuidv4(),
      name: "Vase Elegant",
      price: 250000,
      image: require("../assets/images/product/vase.jpeg"),
    },
    {
      id: uuidv4(),
      name: "Piring ceramic",
      price: 300000,
      image: require("../assets/images/product/piring.jpeg"),
    },
    {
      id: uuidv4(),
      name: "Mug Ceramic",
      price: 150000,
      image: require("../assets/images/product/mug.jpeg"),
    },
  ],

  // fungsi CRUD
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),

  editProduct: (id, updated) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updated } : p
      ),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
}));
