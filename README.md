# 🎮 GameHub

GameHub adalah website katalog game bertema gelap (dark gaming) untuk menemukan game, melihat detailnya, dan menyimpannya ke koleksi pribadi. Website ini dibuat dari desain Figma menjadi halaman yang bisa dipakai, hanya dengan HTML, CSS, dan JavaScript murni (tanpa framework, tanpa backend, tanpa instalasi).

> Proyek ini dibuat untuk belajar dan portofolio: menerjemahkan desain UI (Figma) ke website yang responsif dan interaktif.

---

 Fitur

| Halaman | Yang bisa dilakukan |
|---|---|
| Home | Hero, game *Featured*, dan daftar *Trending Games* |
| Explore | Cari game langsung saat mengetik, filter genre, dan urutkan (Top Rated / Nama A–Z / Terbaru) |
| Detail Game | Foto besar dengan galeri, rating, genre, deskripsi, informasi (developer, rilis, platform), dan rekomendasi "You may also like" |
| My Library | Koleksi pribadi dengan tab **Playing / Completed / Wishlist**. Klik badge di kartu untuk mengganti status |

Fitur lainnya:
- Responsif: tampilan desktop dengan navbar atas, dan tampilan mobile dengan tab bar di bawah.
- Library tersimpan: di browser (`localStorage`), jadi tidak hilang saat halaman dimuat ulang.
- Satu halaman (SPA): pindah halaman tanpa memuat ulang, memakai hash (`#/home`, `#/explore`, `#/game/valorant`, `#/library`).
- Galeri per game: tiap game bisa punya foto utama dan hingga 3 foto galeri.
- Aksesibel: label untuk input dan tombol, fokus keyboard terlihat, dan mendukung `prefers-reduced-motion`.

## 🛠️ Teknologi

- HTML: struktur halaman
- CSS: tata letak (Grid & Flexbox), variabel warna, desain responsif
- JavaScript: data game, routing, render halaman, pencarian, filter, dan penyimpanan library
  

 Struktur Folder

```
gamehub/
├── index.html      # kerangka halaman (navbar, area konten, footer, tab bar mobile)
├── style.css       # seluruh gaya & responsif
├── script.js       # data game + logika website
├── images/         # foto/gambar game (cover & galeri)
└── README.md
```

Cara Menjalankan

Cara cepat: klik dua kali `index.html` untuk membukanya di browser.

Cara yang disarankan (Live Server):
1. Buka folder proyek di VS Code.
2. Pasang ekstensi Live Server.
3. Klik kanan `index.html` → Open with Live Server.

Tidak perlu `npm install` atau build apa pun.

Menambah / Mengganti Gambar Game

Semua data game ada di bagian atas `script.js`, pada daftar `GAMES`. Satu baris mewakili satu game:

```js
{id:'ark', n:'ARK: Survival', r:8.3, t:'Survival,Open World,Co-op',
 img:'Ark.jpg',                                   // gambar kartu & foto besar
 shots:['Ark1.jpg','ark2.jpg','ark3.jpg'],        // 3 foto galeri (opsional)
 y:2017, dev:'Studio Wildcard', pf:'PC • Console',
 d:'Deskripsi game...'},
```

| Field | Fungsi |
|---|---|
| `id` | ID unik tanpa spasi (dipakai di alamat halaman) |
| `n` | Nama game |
| `r` | Rating |
| `t` | Genre & tag dipisah koma (kata pertama = genre di kartu) |
| `img` | Gambar utama untuk kartu dan foto besar |
| `shots` | Hingga 3 foto galeri di halaman detail (opsional) |
| `y` / `dev` / `pf` | Tahun rilis / developer / platform |
| `d` | Deskripsi |





