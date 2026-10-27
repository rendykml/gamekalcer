# Penjelasan Sistem untuk Klien

**Nama sistem:** ML Account Manager  

## 1. Gambaran singkat

ML Account Manager dirancang untuk membantu pengelolaan jual-beli akun Mobile Legends dalam satu aplikasi. Sistem ini direncanakan untuk menyimpan data akun, membantu proses pemeriksaan dan penawaran, mencatat pembelian dan penjualan, serta menyajikan ringkasan uang dan inventaris.

Dengan pencatatan terpusat, pemilik dapat mengetahui akun apa saja yang dimiliki, akun mana yang sedang ditawarkan atau sudah terjual, pembayaran yang sudah diterima atau dibayarkan, serta biaya dan kerugian yang perlu diperhitungkan.


## 3. Alur penggunaan yang direncanakan

1. **Akun dimasukkan.** Pengguna yang ditugaskan mengisi informasi akun dan data pembelian yang diperlukan.
2. **Akun diperiksa.** Data baru berstatus sebagai draf sehingga belum ditampilkan kepada publik.
3. **Pemilik menyetujui penawaran.** Pemilik memeriksa informasi, menentukan harga jual, dan memilih apakah akun siap ditawarkan.
4. **Akun ditampilkan.** Akun yang disetujui dapat muncul di katalog publik dengan informasi yang memang boleh dilihat calon pembeli.
5. **Penjualan dicatat.** Pemilik mencatat transaksi, pembayaran yang benar-benar diterima, biaya terkait, dan refund bila ada.
6. **Ringkasan diperbarui.** Sistem menggunakan catatan yang tersimpan untuk menampilkan status inventaris dan ringkasan keuangan.

Pembayaran dapat dicatat bertahap sesuai rancangan. Pencatatan uang masuk atau keluar dilakukan ketika uang benar-benar diterima atau dibayarkan, bukan hanya karena transaksi dibuat.

## 4. Informasi dan pekerjaan yang dicakup

Rancangan versi pertama mencakup:

- **Inventaris akun:** informasi penawaran, harga beli, harga jual, dan status akun.
- **Katalog publik:** informasi akun yang disetujui untuk ditawarkan, termasuk status tersedia atau terjual.
- **Pembelian dan penjualan:** catatan transaksi, pembayaran sebagian, pembatalan, dan refund sesuai aturan yang disepakati.
- **Arus kas:** pemasukan dan pengeluaran berdasarkan kejadian uang yang benar-benar terjadi.
- **Biaya dan kerugian:** pencatatan biaya transaksi, pengeluaran lain, atau penurunan nilai akun yang tidak dapat dijual.
- **Ringkasan dan riwayat:** ringkasan inventaris dan keuangan serta catatan perubahan yang penting.
- **Pengelolaan akses:** pembatasan pekerjaan berdasarkan peran pengguna.

Rancangan versi pertama **tidak mencakup** pembayaran otomatis melalui payment gateway, sinkronisasi langsung dengan akun game, otomasi transaksi dengan pihak ketiga, maupun pengelolaan banyak cabang.

## 5. Peran pengguna

| Peran | Yang dapat dilakukan |
| --- | --- |
| Pengunjung | Melihat katalog dan informasi penawaran yang memang ditujukan untuk publik. |
| Pengguna input | Membuat draf akun untuk diperiksa. Tidak dapat menerbitkan akun atau mengelola transaksi keuangan. |
| Pemilik | Memeriksa dan menerbitkan akun, mengelola transaksi dan laporan, serta mengatur pengguna. Akses ke data rahasia dibatasi kepada pemilik. |

Pembagian ini dimaksudkan agar informasi internal dan tindakan penting tidak terbuka untuk semua pengguna. Rincian izin akhir perlu disetujui oleh klien.

## 6. Arti status akun

| Status | Penjelasan sederhana |
| --- | --- |
| Draf | Data sedang disiapkan atau menunggu pemeriksaan; belum tampil di katalog. |
| Tersedia | Sudah disetujui dan dapat ditawarkan. |
| Dipesan | Sedang dalam proses pemesanan atau menunggu konfirmasi. |
| Terjual | Penjualan sudah dikonfirmasi berdasarkan aturan bisnis yang disepakati. |
| Tidak dapat dijual | Akun tidak dapat ditawarkan; pemilik dapat menilai apakah masih ada nilai yang dapat dipulihkan. |
| Diarsipkan | Tidak lagi ditampilkan sebagai penawaran aktif, tetapi riwayatnya tetap disimpan. |

Status akun berbeda dari status pembayaran. Sebuah akun dapat sedang dipesan sementara pembayarannya belum lunas. Karena itu, kriteria kapan akun berubah menjadi “terjual” perlu disepakati sebelum sistem digunakan.

## 7. Memahami ringkasan keuangan

Istilah dalam laporan memiliki arti yang berbeda:

- **Saldo kas** adalah saldo awal ditambah uang masuk dan dikurangi uang keluar.
- **Uang masuk** adalah pembayaran yang benar-benar diterima.
- **Uang keluar** adalah pembayaran dan pengeluaran yang benar-benar dilakukan.
- **Modal inventaris** adalah nilai tercatat dari akun yang masih dimiliki.
- **Omzet** berkaitan dengan nilai penjualan; nilainya tidak selalu sama dengan uang yang sudah diterima, terutama bila pembayaran bertahap.
- **Laba** memperhitungkan nilai penjualan dan modal akun yang terjual. Biaya, refund, dan kerugian inventaris dapat memengaruhi hasil akhirnya.

Transfer uang antar-kas, misalnya dari uang tunai ke rekening, bukan pendapatan atau biaya. Pencatatan harus menghindari penghitungan ganda.

Angka laporan merupakan ringkasan dari data yang dicatat. Keakuratan laporan bergantung pada kelengkapan dan ketepatan catatan transaksi serta definisi keuangan yang disepakati.

## 8. Perlindungan informasi

Rancangan mencakup langkah-langkah berikut:

- Informasi publik dipisahkan dari data internal seperti harga beli, catatan internal, dan kredensial akun.
- Kredensial akun direncanakan untuk disimpan dalam bentuk terlindungi, bukan ditampilkan kepada pengunjung katalog.
- Akses ke tindakan sensitif dibatasi berdasarkan peran dan dicatat dalam riwayat aktivitas.
- Catatan pembayaran dirancang agar tidak mudah tercatat dua kali akibat pengulangan proses.
- Data keuangan tidak dihapus permanen melalui penggunaan normal aplikasi; riwayat perlu tetap dapat ditelusuri.

Perlindungan data juga memerlukan pengaturan operasional, seperti pengelolaan akses, penyimpanan kunci pelindung secara aman, serta prosedur pencadangan dan pemulihan. Langkah tersebut perlu disiapkan dan diuji sebelum aplikasi digunakan untuk data nyata.

## 9. Hal yang perlu disepakati sebelum penggunaan

Beberapa keputusan bisnis dan operasional masih perlu dikonfirmasi bersama:

1. Pada kondisi apa akun dianggap dipesan dan kapan dianggap terjual, khususnya jika pembayaran belum lunas?
2. Apakah pembayaran bertahap diperbolehkan, dan bagaimana menangani pembatalan atau refund?
3. Informasi apa saja yang boleh ditampilkan di katalog publik?
4. Siapa yang boleh melihat atau mengubah masing-masing jenis data?
5. Bagaimana pemilik menentukan nilai akun yang tidak dapat dijual dan mencatat kerugiannya?
6. Saluran kas apa yang digunakan, misalnya tunai, rekening, atau dompet digital?
7. Seberapa sering pencadangan dilakukan, siapa yang bertanggung jawab, dan bagaimana pemulihan diuji?
8. Di mana aplikasi akan dijalankan dan siapa yang bertanggung jawab atas pengelolaan operasionalnya?

Keputusan-keputusan tersebut memengaruhi cara transaksi dicatat dan arti laporan, sehingga sebaiknya disetujui sebelum implementasi final.

## 10. Ringkasan

Sistem ini dirancang sebagai alat bantu pencatatan dan pemantauan, bukan pengganti keputusan pemilik. Database menyimpan catatan yang saling terhubung agar inventaris, transaksi, kas, dan riwayat dapat ditinjau dengan lebih teratur. Hasil yang dapat diandalkan memerlukan aturan bisnis yang jelas, pencatatan yang disiplin, pembatasan akses, dan prosedur operasional yang disiapkan sebelum penggunaan.

Dokumen teknis dan rancangan lengkap tersedia di [srs.md](./srs.md).
