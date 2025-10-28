🏺 Krisped – Ceramic Product Management App
Krisped adalah aplikasi mobile sederhana berbasis React Native (Expo) yang digunakan untuk mengelola produk kerajinan keramik.
Aplikasi ini mendukung CRUD produk, keranjang belanja, serta dark/light mode menggunakan Zustand sebagai state management.

🌟 Fitur Utama 

✅ Manajemen Produk (CRUD)
Tambah produk baru lengkap dengan nama, harga, dan gambar.
Edit produk yang sudah ada.
Hapus produk dari daftar.

✅ Keranjang Belanja
Tambahkan produk ke keranjang.
Hapus satu atau semua produk dari keranjang.
Total harga otomatis.

✅ Mode Gelap & Terang (Dark/Light Mode)
Toggle mode tampilan kapan saja tanpa kehilangan data.
Menggunakan Zustand untuk menyimpan preferensi tema.

✅ Navigasi Modern
Menggunakan Expo Router Tabs Navigation (Home, Cart, About).
Navigasi cepat antar halaman.

✅ UI Responsif & Modern
Desain bersih dan estetis dengan palet warna coklat dan krem.
Gambar produk proporsional dan otomatis menyesuaikan tampilan.

📱 Tampilan (Preview) :
- <img width="444" height="838" alt="Screenshot 2025-10-28 223949" src="https://github.com/user-attachments/assets/4541ca3d-d95f-4aef-960f-5e07e50e0177" />
- <img width="444" height="833" alt="image" src="https://github.com/user-attachments/assets/ccde0e91-2b51-469a-934a-86e87b93d8a4" />
- <img width="423" height="840" alt="image" src="https://github.com/user-attachments/assets/7f49c9d7-b4a2-469d-9e0d-e06dfc88632c" />
- <img width="454" height="838" alt="image" src="https://github.com/user-attachments/assets/94634b68-d093-48af-8e48-02388be5562a" />
- <img width="448" height="843" alt="image" src="https://github.com/user-attachments/assets/69131272-8e06-42a9-a0d0-8628a17ba706" />
- <img width="426" height="838" alt="image" src="https://github.com/user-attachments/assets/367a8c2b-21bc-420b-a56d-09ca41160f48" />
- <img width="433" height="837" alt="image" src="https://github.com/user-attachments/assets/d4e71c87-0026-444a-816d-4bbbef95e953" />
- <img width="443" height="847" alt="image" src="https://github.com/user-attachments/assets/a6784890-f6f1-4108-9b54-49156a2fd527" />
- <img width="415" height="827" alt="image" src="https://github.com/user-attachments/assets/fe9122a0-9180-42a5-8ebd-beb2fba16e6b" />
- <img width="442" height="834" alt="image" src="https://github.com/user-attachments/assets/73790ee2-d3a1-4257-91dc-98a4be0ec901" />
- <img width="434" height="835" alt="image" src="https://github.com/user-attachments/assets/7aae3087-4347-4b01-98b7-873cf2bb61a8" />
- <img width="450" height="838" alt="image" src="https://github.com/user-attachments/assets/e3d2dff4-6463-48fe-940f-7841599c79ad" />
- <img width="452" height="851" alt="image" src="https://github.com/user-attachments/assets/021ef13c-546f-43d0-bcb4-5ec0caf164b5" />






🧩 Teknologi yang Digunakan
⚛️ React Native (Expo)
🧭 Expo Router (navigasi multi-tab)
🗂 Zustand (state management)
💡 TypeScript
🎨 React Native StyleSheet
📸 Expo Image Picker


# 1️⃣ Clone repository
git clone https://github.com/username/krisped-app.git
# 2️⃣ Masuk ke folder proyek
cd krisped-app
# 3️⃣ Install dependencies
npm install
# atau
yarn install
# 4️⃣ Jalankan aplikasi
npx expo start


krisped-app/
│
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx         # Halaman Home
│   │   ├── cart.tsx          # Halaman Cart
│   │   ├── about.tsx         # Halaman About
│   │   └── _layout.tsx       # Layout navigasi tab
│   ├── products/
│   │   ├── [id].tsx          # Detail produk
│   │   ├── edit.tsx          # Edit produk
│   │   └── add.tsx           # Tambah produk
│
├── store/
│   ├── useProductStore.ts    # State produk (CRUD)
│   ├── useCartStore.ts       # State keranjang
│   └── useThemeStore.ts      # State tema dark/light
│
├── assets/
│   ├── images/
│   │   └── product/          # Gambar produk & logo
│
├── docs/
│   └── screenshot-home.png   # Screenshot untuk README
│
└── README.md








