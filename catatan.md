Software Requirements Specification (SRS)
Website Manajemen dan Jual-Beli Akun Mobile Legends dengan Modul OCR untuk Penelitian TA
Versi 1.0 | Dokumen rancangan awal | 28 Oktober 2026
1. Informasi Dokumen
Tujuan: Dokumen ini menjadi acuan awal untuk merancang, mengembangkan, menguji, dan memelihara website bisnis jual-beli akun Mobile Legends. Dokumen juga menjelaskan batas integrasi OCR yang akan dikembangkan dan dievaluasi untuk kebutuhan Tugas Akhir (TA).
Status dokumen: Rancangan kebutuhan awal berdasarkan diskusi. Detail seperti alur pembelian final, pengelolaan kredensial akun game, dan aturan operasional bisnis perlu dikonfirmasi sebelum implementasi produksi.
Pembaca: Pemilik produk, pengembang frontend/backend, penguji, dan penulis penelitian TA.
2. Ringkasan Produk
Deskripsi: Website untuk mengelola inventaris akun Mobile Legends, menampilkan katalog akun tersedia maupun terjual, mencatat pembelian dan penjualan, serta memantau arus kas. Website juga direncanakan memiliki fitur OCR untuk membantu memasukkan koleksi skin dari screenshot.
Tujuan bisnis: Mengelola data akun secara terpusat, mengurangi kesalahan pencatatan, menyediakan katalog publik, mencatat status penjualan dan pembayaran manual, serta menelusuri arus kas dan kerugian.
Tujuan penelitian: Menguji metode deteksi dan identifikasi item pada screenshot koleksi digital berdasarkan akurasi dan waktu pemrosesan. Hasil OCR harus diperiksa dan dikonfirmasi pengguna sebelum digunakan sebagai data bisnis.
Prinsip desain: Mulai dengan arsitektur sederhana dan biaya terkendali; lindungi data bisnis; pisahkan eksperimen penelitian dari transaksi produksi; dan hindari membangun layanan tambahan sebelum benar-benar diperlukan.
3. Ruang Lingkup
Termasuk versi awal: Katalog publik akun tersedia/terjual; autentikasi dan peran pengguna; input akun dengan status draft; data harga dan biaya perolehan; pengelolaan gambar; pencatatan pesanan/penjualan; pembayaran transfer manual yang dikonfirmasi admin; arus kas; histori perubahan; serta prototipe OCR dan evaluasinya.
Belum termasuk secara default: Payment gateway otomatis, escrow/penampungan dana, aplikasi mobile native, microservices, layanan OCR cloud yang selalu aktif, dan otomatisasi penuh penentuan skin tanpa pemeriksaan manusia.
Catatan kepatuhan: Sebelum transaksi komersial diluncurkan, pemilik bisnis perlu meninjau ketentuan layanan penerbit game dan aturan hukum yang berlaku terkait jual-beli/pengalihan akun, privasi, transaksi, dan penanganan sengketa.
4. Pengguna dan Hak Akses
Pengunjung: Dapat melihat informasi katalog yang secara eksplisit ditandai publik. Tidak dapat melihat data privat, catatan biaya internal, bukti transfer, atau kredensial akun.
Pemilik: Dapat mengelola data akun miliknya sesuai kebijakan bisnis, menginput biaya perolehan dan harga jual, serta melihat informasi yang terkait dengan akun miliknya.
Petugas input: Dapat memasukkan atau memperbarui data sesuai tugas dan kewenangan yang diberikan. Tidak otomatis memiliki hak mengonfirmasi pembayaran atau mengubah data keuangan.
Admin: Mengelola pengguna dan data operasional sesuai kewenangan, memverifikasi pembayaran manual, menangani status akun dan transaksi, serta melihat laporan keuangan dan audit log.
Kontrol peran: Peran tidak boleh dapat diubah sendiri oleh pengguna. Akses perlu ditegakkan di backend/database, bukan hanya dengan menyembunyikan menu di frontend.
5. Rekomendasi Tech Stack
Frontend: React + Vite + TypeScript untuk UI katalog, dashboard, formulir, dan modul OCR.
UI dan validasi: Tailwind CSS untuk styling; React Hook Form dan Zod untuk pengelolaan serta validasi formulir.
Backend bisnis: Supabase Auth, PostgreSQL, Row Level Security (RLS), Storage, dan Edge Functions untuk operasi sensitif yang membutuhkan validasi server.
Hosting frontend: Cloudflare Pages untuk frontend statis, dengan domain bisnis sendiri.
OCR pada website: Tesseract.js di browser sebagai opsi awal agar screenshot dapat diproses lokal tanpa mengirimnya ke server OCR. Akurasi dan kinerja wajib diuji pada screenshot nyata.
Lingkungan eksperimen TA: Python sebagai lingkungan penelitian terpisah; uji Tesseract dan PaddleOCR, anotasi ground truth, pengukuran metrik, serta penyimpanan hasil eksperimen.
Testing: Vitest dan React Testing Library untuk pengujian unit/UI; Playwright untuk pengujian alur browser.
Version control dan deployment: GitHub untuk source code, review perubahan, migration SQL, dan integrasi deployment.
Keputusan arsitektur: Supabase tetap menjadi backend utama bisnis. Python tidak perlu menjadi backend produksi pada tahap pertama; layanan OCR berbasis Python/FastAPI baru dipertimbangkan jika kebutuhan integrasi online membenarkannya.
6. Arsitektur Sistem
Alur bisnis: Browser pengguna → React/Vite → Supabase Auth dan operasi data yang dibatasi RLS. Operasi penting seperti konfirmasi pembayaran, perubahan status akun, dan pencatatan arus kas harus melewati fungsi server yang tervalidasi → PostgreSQL.
Alur OCR produksi: Pengguna memilih screenshot → OCR berjalan di browser → hasil ekstraksi dan pencocokan ditampilkan → pengguna memeriksa/mengoreksi → pengguna mengonfirmasi → hanya data terkonfirmasi yang disimpan ke database bisnis.
Alur penelitian: Dataset screenshot terpisah → anotasi ground truth → eksperimen Python dengan metode OCR/deteksi/pencocokan → hitung metrik → analisis hasil → laporan/jurnal. Dataset penelitian tidak otomatis diambil dari data pengguna bisnis.
Pemisahan lingkungan: Gunakan project/konfigurasi development dan production terpisah. Dataset penelitian, data uji, dan data bisnis produksi harus dibedakan.
7. Kebutuhan Fungsional
FR-01 — Katalog publik: Sistem menampilkan akun yang status publiknya mengizinkan tampil, termasuk akun tersedia dan terjual. Data sensitif/internal tidak ditampilkan.
FR-02 — Autentikasi: Pengguna yang berwenang dapat login dan logout. Sistem mendukung alur pemulihan akses sesuai kemampuan penyedia autentikasi.
FR-03 — Manajemen peran: Admin dapat menetapkan peran. Pengguna tidak dapat meningkatkan hak aksesnya sendiri.
FR-04 — Input akun: Pengguna berwenang dapat membuat data akun sebagai draft sebelum dipublikasikan. Data minimal mencakup identitas internal akun, harga, deskripsi, pemilik/penanggung jawab, dan status.
FR-05 — Media akun: Sistem mengelola gambar akun dengan kebijakan akses yang jelas. File harus divalidasi tipe dan ukurannya.
FR-06 — Koleksi skin: Sistem dapat menyimpan daftar skin yang teridentifikasi dan relasi skin terhadap akun. Nama skin harus dapat ditautkan ke katalog referensi bila tersedia.
FR-07 — OCR berbantuan: Pengguna dapat memilih beberapa screenshot, menjalankan OCR, melihat hasil, mengoreksi hasil yang salah, dan mengonfirmasi sebelum penyimpanan.
FR-08 — Pesanan/penjualan: Sistem mencatat pesanan, item akun, harga snapshot, status, waktu, dan pihak terkait. Perubahan status harus divalidasi di server.
FR-09 — Pembayaran manual: Admin berwenang dapat mencatat dan mengonfirmasi transfer setelah memeriksa penerimaan dana. Sistem menyimpan nominal, waktu, referensi, dan petugas yang memverifikasi.
FR-10 — Arus kas: Sistem mencatat pemasukan dan pengeluaran dengan kategori, nominal, tanggal, referensi transaksi, pembuat, serta alasan/keterangan.
FR-11 — Biaya dan kerugian: Sistem mendukung pencatatan biaya perolehan dan kerugian akun, termasuk akun rusak/tidak dapat dijual atau nilai pemulihan jika relevan dengan kebijakan bisnis.
FR-12 — Audit log: Sistem mencatat perubahan penting seperti status akun, harga, transaksi, pembayaran, dan data keuangan, termasuk pengguna dan waktu.
FR-13 — Laporan: Admin dapat melihat ringkasan penjualan, pembayaran, arus kas, biaya, serta keuntungan berdasarkan aturan perhitungan yang ditetapkan.
FR-14 — Penghapusan dan arsip: Data keuangan yang sudah menjadi bagian dari transaksi tidak dihapus bebas. Gunakan pembatalan, arsip, atau entri koreksi sesuai aturan audit.
8. Status dan Aturan Bisnis
Status akun: Status awal yang diusulkan: draft, available, reserved, sold, lost, archived. Transisi yang diizinkan harus didefinisikan dan divalidasi di server.
Status penjualan: Status awal yang diusulkan: pending_payment, paid, cancelled, refunded. Status dan transisi final perlu disesuaikan dengan alur bisnis yang dipilih.
Status pembayaran: Status awal yang diusulkan: pending, confirmed, rejected. Status paid tidak boleh ditetapkan hanya karena pengguna mengunggah bukti transfer.
Pencegahan penjualan ganda: Perubahan status/reservasi akun dan pembuatan penjualan harus menggunakan transaksi database dan mekanisme penguncian/constraint yang sesuai agar satu akun tidak terjual ke dua pesanan aktif.
Snapshot transaksi: Harga jual dan biaya relevan saat transaksi harus disimpan sebagai snapshot agar perubahan harga katalog tidak mengubah histori.
Konsistensi keuangan: Pencatatan pembayaran dan arus kas harus terhubung melalui referensi yang dapat ditelusuri. Koreksi menggunakan pembalikan atau entri koreksi, bukan menghapus histori.
OCR bukan sumber kebenaran: Hasil OCR tidak boleh langsung dianggap benar. Pengguna wajib memeriksa dan mengonfirmasi hasil sebelum disimpan sebagai koleksi skin.
9. Kebutuhan Penelitian OCR untuk TA
Judul kerja: Evaluasi Metode Deteksi dan Identifikasi Item pada Gambar Koleksi Digital Berdasarkan Akurasi dan Waktu Pemrosesan.
Objek: Screenshot koleksi skin Mobile Legends yang diperoleh dan digunakan sesuai izin serta kebijakan privasi yang berlaku.
Pertanyaan penelitian awal: Seberapa besar perbedaan akurasi dan waktu pemrosesan antar-metode untuk mendeteksi kartu, membaca nama skin, dan mengidentifikasi item? Kondisi screenshot apa yang paling memengaruhi hasil?
Metode pembanding awal: A: OCR pada gambar penuh; B: pemotongan/deteksi area kartu lalu OCR; C: OCR ditambah normalisasi dan pencocokan katalog. Perbandingan mesin OCR, misalnya Tesseract dan PaddleOCR, dapat ditambahkan bila waktu dan ruang lingkup mencukupi.
Dataset pilot: Mulai dari 30–50 screenshot untuk menguji prosedur anotasi. Target dataset final, misalnya 200–500 screenshot, hanya ditetapkan setelah menilai ketersediaan, variasi, biaya anotasi, dan kebutuhan statistik.
Ground truth: Untuk setiap screenshot, anotasi jumlah kartu yang terlihat, koordinat kartu bila relevan, nama skin yang benar, ID katalog bila tersedia, dan kondisi keterbacaan teks.
Metrik deteksi: Precision, recall, dan F1-score untuk deteksi kartu bila deteksi area menjadi bagian metode.
Metrik OCR: Character Error Rate (CER), Word Error Rate (WER), dan exact-match accuracy dengan aturan normalisasi yang ditetapkan sebelumnya.
Metrik identifikasi: Akurasi identifikasi skin dan precision/recall bila sesuai dengan desain eksperimen.
Metrik efisiensi: Waktu pemrosesan per screenshot atau per item, rata-rata dan variasinya, menggunakan perangkat dan prosedur pengukuran yang konsisten.
Reproduksibilitas: Catat versi library/model, konfigurasi, perangkat keras, ID dataset, versi kode, waktu proses, hasil mentah, dan hasil akhir setiap eksperimen.
Privasi dataset: Pisahkan dataset penelitian dari data produksi. Hindari mengumpulkan informasi akun atau kredensial yang tidak diperlukan; pastikan izin penggunaan data dan penghapusan file sementara.
10. Kebutuhan Nonfungsional
NFR-01 — Keamanan: Gunakan RLS dan grants database yang ketat, validasi server untuk operasi sensitif, rahasia di environment server, dan pembatasan akses Storage.
NFR-02 — Privasi: Kumpulkan data seminimal mungkin. Screenshot OCR sementara tidak disimpan permanen secara default; jelaskan jika suatu file akan disimpan.
NFR-03 — Konsistensi: Transaksi, perubahan status akun, pembayaran, dan pencatatan keuangan harus menjaga integritas data saat terjadi permintaan bersamaan.
NFR-04 — Kinerja: Katalog harus tetap responsif pada target trafik awal di bawah 100 pengguna aktif per hari. Uji beban tetap diperlukan sebelum peluncuran.
NFR-05 — Ketersediaan: Gunakan hosting yang sesuai kebutuhan bisnis, monitoring dasar, dan prosedur pemulihan. Ketersediaan tidak dijamin hanya karena memakai paket berbayar.
NFR-06 — Pemeliharaan: Gunakan migration SQL berversi, struktur kode modular, dokumentasi konfigurasi, dan lingkungan development/production terpisah.
NFR-07 — Aksesibilitas dan responsivitas: Antarmuka dapat digunakan di desktop dan perangkat mobile, dengan validasi form dan pesan kesalahan yang jelas.
NFR-08 — Observabilitas: Catat error aplikasi dan operasi penting tanpa menuliskan kata sandi, token, atau kredensial sensitif ke log.
11. Estimasi Biaya Awal
Frontend: Cloudflare Pages dapat dimulai pada paket gratis untuk website statis; domain khusus dikenakan biaya terpisah.
Database/backend: Supabase Pro pernah ditetapkan mulai US$25/bulan pada harga yang dibahas; harga, kuota, pajak, dan ketentuan perlu diperiksa kembali saat pembelian.
OCR: Tesseract.js dan eksperimen Python dapat dijalankan tanpa biaya layanan OCR jika berjalan di perangkat/laptop sendiri. Hosting layanan OCR online akan menambah biaya.
Domain dan email: Anggarkan biaya domain tahunan dan email transaksi sesuai provider. Harga aktual perlu diverifikasi saat implementasi.
Anggaran indikatif: Perkiraan awal diskusi: sekitar Rp450.000–600.000/bulan untuk infrastruktur dasar dengan Supabase Pro, belum termasuk domain tahunan, biaya tambahan penggunaan, payment provider (jika kelak digunakan), dan tenaga kerja. Ini estimasi perencanaan, bukan penawaran harga tetap.
Kontrol biaya: Pantau penggunaan database, storage, bandwidth, dan fungsi. Gunakan alert/limit yang tersedia serta hindari menyimpan screenshot penelitian yang tidak diperlukan.
12. Tahapan Implementasi
Tahap 1 — Fondasi: Buat repository, React/Vite/TypeScript, project Supabase, ERD, migration SQL, RLS, grants, dan pemisahan environment.
Tahap 2 — Autentikasi dan inventaris: Implementasikan login, peran, input akun draft, media, data biaya, harga, dan katalog skin.
Tahap 3 — Katalog dan penjualan: Implementasikan katalog publik, pesanan, status akun, pembayaran transfer manual, pencegahan penjualan ganda, dan audit log.
Tahap 4 — Keuangan: Implementasikan arus kas, biaya, kerugian, koreksi transaksi, dan laporan yang dapat ditelusuri.
Tahap 5 — Prototipe OCR: Bangun pipeline Python lokal, format dataset, anotasi ground truth, dan baseline OCR.
Tahap 6 — Eksperimen: Bandingkan metode, hitung metrik, dokumentasikan hasil, analisis kegagalan, dan susun draf jurnal.
Tahap 7 — Integrasi OCR: Implementasikan metode terpilih pada browser atau layanan terpisah sesuai hasil uji. Pengguna tetap mengonfirmasi hasil.
Tahap 8 — Uji produksi: Uji akses peran, transaksi bersamaan, pembayaran, backup/restore, validasi file, keamanan, kinerja, dan prosedur insiden.
Catatan waktu: Estimasi awal 4–6 minggu untuk versi bisnis pertama oleh satu pengembang dengan ruang lingkup terkendali. OCR, eksperimen, revisi, dan hardening produksi dapat menambah waktu; durasi bukan jaminan.
13. Kriteria Penerimaan
AC-01: Pengunjung hanya dapat melihat data katalog yang memang publik.
AC-02: Pemilik tidak dapat mengakses atau mengubah data privat milik pemilik lain.
AC-03: Pengguna tidak dapat menetapkan atau meningkatkan perannya sendiri.
AC-04: Pembayaran tidak menjadi confirmed/paid tanpa verifikasi admin berwenang.
AC-05: Permintaan bersamaan tidak dapat menjual akun yang sama dua kali.
AC-06: Setiap perubahan keuangan dapat ditelusuri ke transaksi dan aktor yang relevan.
AC-07: Hasil OCR dapat dikoreksi dan harus dikonfirmasi sebelum disimpan.
AC-08: Eksperimen OCR dapat diulang menggunakan versi kode, konfigurasi, dan dataset yang tercatat.
AC-09: Backup dapat dipulihkan melalui prosedur yang telah diuji.
AC-10: Tidak ada secret key backend di bundle frontend atau repository publik.
14. Risiko dan Keputusan yang Masih Perlu Dikonfirmasi
Kebijakan jual-beli akun: Tinjau aturan penerbit game dan risiko sengketa/kehilangan akses sebelum transaksi komersial.
Pengelolaan kredensial: Putuskan apakah website benar-benar perlu menyimpan kredensial akun game. Rekomendasi awal: hindari penyimpanan jika tidak diperlukan.
Alur pembelian: Tentukan apakah pembeli membuat pesanan sendiri, menghubungi admin, atau transaksi dicatat oleh admin.
Makna katalog terjual: Tentukan informasi apa yang boleh ditampilkan untuk akun terjual dan berapa lama data tetap tampil.
Kebijakan pengembalian: Tentukan kebijakan pembatalan, refund, akun bermasalah, kerugian, dan nilai pemulihan.
Ruang lingkup OCR: Konfirmasi apakah penelitian mencakup deteksi kartu, OCR nama skin, dan pencocokan katalog sekaligus atau fokus utama pada subset yang paling terukur.
Ukuran dataset: Tetapkan setelah pilot, bukan sebelum menilai keragaman screenshot dan beban anotasi.
15. Ringkasan Keputusan Final
Arsitektur bisnis: React + Vite + TypeScript, Supabase Auth/PostgreSQL/RLS/Storage/Edge Functions, dan Cloudflare Pages.
Arsitektur penelitian: Python lokal untuk eksperimen OCR dan evaluasi; Tesseract serta PaddleOCR sebagai kandidat metode.
Integrasi OCR: Tesseract.js di browser dapat menjadi implementasi awal, tetapi keputusan final mengikuti hasil uji akurasi dan waktu.
Pembayaran: Transfer manual dan konfirmasi oleh admin; belum menggunakan payment gateway.
Skala awal: Di bawah 100 pengguna aktif per hari.
Urutan prioritas: Fondasi database dan keamanan → inventaris → penjualan dan pembayaran → arus kas → dataset dan baseline OCR → eksperimen → integrasi OCR → uji produksi.