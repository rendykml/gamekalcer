# Analisis tipografi

## Apa yang bisa dan tidak bisa saya baca dari referensi

- **Hallmark (repo)**: terbaca. Isinya aturan tiga tingkat (Floor, Reflex, Finish) dan daftar "tells" yang membuat halaman terlihat buatan AI. Repo ini tidak menyebut nama font atau ukuran, hanya larangan pola.
- **Vantage (usehallmark.com/themes/vantage)**: struktur dan teks terbaca, CSS tidak. Halaman contohnya adalah produk fiktif "Swath", jadi nama font, ukuran, dan warna aslinya **tidak saya ketahui**. Pilihan font di bawah adalah keputusan saya sendiri, bukan salinan Vantage.
- **Dua shot Dribbble**: tidak terbaca (halaman kosong). Kartu dibuat dari tipe kartunya (kartu tujuan berbasis gambar, kartu "shop the look" dengan titik panas), bukan dari tampilan aslinya.

## Delapan bagian Vantage dan padanannya di Vigil

Halaman contoh punya header, 8 bagian isi, dan footer. Header dan footer saya anggap kerangka halaman.

| # | Bagian Vantage | Komponen Vigil | Catatan |
|---|---|---|---|
| 1 | Hero + 4 angka | `StatTiles` | Hero Vigil sudah ada, angka ditambahkan di bawahnya |
| 2 | Layers (daftar yang bisa disembunyikan) | `SourceLayers` | Centang sumber sinyal, total dan bar ikut berubah |
| 3 | Accuracy (angka besar + perbandingan) | `Precision` | |
| 4 | Section cuts (garis yang digeser) | `TraceCut` | Slider memotong lini masa insiden |
| 5 | Change summary | `ChangeSummary` | |
| 6 | Scan log (tabel) | `IncidentLog` | |
| 7 | Pricing (3 paket) | `Pricing` | Harga berupa placeholder |
| 8 | Demo request (form) | `DemoForm` | Tidak pura-pura terkirim |

Tambahan kartu: `SourceCard` (kartu tujuan) dan `HotspotCard` (kartu shop-the-look).

## Pilihan huruf

| Peran | Font | Dipakai untuk |
|---|---|---|
| Display | Inter Tight 300/400/500 | Judul 22 px ke atas. Tracking rapat memang dirancang untuk ukuran besar |
| Teks | Inter 400/500 | Paragraf dan UI 13 sampai 17 px. Jarak huruf normal, lebih terbaca di ukuran kecil |
| Data | JetBrains Mono 400/500 | Hanya ID kasus, waktu, dan durasi di tabel dan lini masa |

Alasannya: hero dari screenshot memakai grotesk rapat, jadi Inter Tight menjaga kesinambungan. Inter Tight dan Inter satu keluarga, jadi ritmenya cocok. Mono hanya muncul di tempat angka perlu sejajar, bukan sebagai hiasan label.

## Skala

| Token | Nilai | Pemakaian |
|---|---|---|
| `--fs-display` | 40 sampai 56 px, bobot 300, tracking -0.045em | Judul hero |
| `--fs-h2` | 30 sampai 40 px, bobot 400, tracking -0.035em | Judul bagian |
| `--fs-h3` | 22 px, bobot 500, tracking -0.02em | Judul kartu dan paket |
| `--fs-lead` | 17 px / 1.55 | Kalimat pembuka bagian |
| `--fs-body` | 15 px / 1.6 | Isi |
| `--fs-small` | 13 px | Label formulir, keterangan |
| `--fs-min` | 12 px | Batas bawah untuk komponen baru |

Angka yang berjajar memakai `font-variant-numeric: tabular-nums`. Panjang baris paragraf dibatasi sekitar 65 karakter.

## Aturan Hallmark yang diterapkan di komponen baru

- Tidak ada label kecil (eyebrow) di atas judul.
- Tidak ada label huruf kapital berjarak lebar.
- Tidak ada satu kata berwarna di dalam judul.
- Tidak ada angka palsu tanpa tanda: semua angka contoh diberi catatan "Sample workspace", harga berupa placeholder `[Price]`.
- Form tidak menampilkan ucapan terima kasih kalau tidak ada server yang menerimanya.
- Tidak ada form berlangganan email di akhir halaman.
- Fokus keyboard terlihat, `prefers-reduced-motion` dihormati, kontras teks minimal 4.5:1.
- Border, bayangan, dan radius dipakai menurut peran: hanya kartu, tabel, dan satu paket unggulan yang berbingkai. Sisanya dipisah garis tipis.

## Bagian lama yang melanggar daftar "tells"

Hero dan fitur adalah replika screenshot Anda, jadi saya biarkan, tapi menurut Hallmark ini patut dipertimbangkan:

- Lencana "SOC 2 TYPE II CERTIFIED" dan label "LOG 01" sampai "LOG 04" memakai huruf kapital berjarak lebar dan ukuran 9 sampai 10 px.
- Baris kedua judul fitur ("that actually matter") berwarna gradien sendiri.
- Kartu fitur sudah berupa kolom tanpa bingkai, itu sudah sesuai.
