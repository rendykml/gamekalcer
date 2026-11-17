import { HeroArtwork, type ArtworkVariant } from "../Platform";

export type ShopItem = {
  id: string;
  title: string;
  category: string;
  rank: string;
  skinCount: string;
  description: string;
  art: ArtworkVariant;
};

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "kolektor",
    title: "Koleksi Para Kolektor",
    category: "Koleksi skin",
    rank: "Mythic",
    skinCount: "126 skin · contoh",
    description: "Preview akun dengan koleksi skin beragam untuk pemain yang suka mengoleksi.",
    art: "mage",
  },
  {
    id: "push-rank",
    title: "Siap Push Rank",
    category: "Rank tinggi",
    rank: "Mythical Honor",
    skinCount: "84 skin · contoh",
    description: "Preview akun untuk pemain yang ingin fokus bermain ranked bersama teman.",
    art: "knight",
  },
  {
    id: "starter",
    title: "Mulai Petualangan",
    category: "Akun pemula",
    rank: "Epic",
    skinCount: "38 skin · contoh",
    description: "Preview akun sederhana untuk melihat contoh detail yang akan tersedia.",
    art: "assassin",
  },
];

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Artwork({ item, id }: { item: ShopItem; id: string }) {
  return <HeroArtwork variant={item.art} id={id} />;
}

export default function MarketplaceSections({ onSelect }: { onSelect: (item: ShopItem) => void }) {
  const featured = SHOP_ITEMS[0];

  return (
    <>
      <section className="sec market-shop" id="katalog">
        <div className="sec__inner">
          <div className="sec__head market-shop__head">
            <h2>GameKalcer Shop</h2>
            <p>Pilih akun atau skin yang sesuai dengan gaya bermainmu.</p>
          </div>

          <div className="shop-banner">
            <div className="shop-banner__art">
              <Artwork item={featured} id="shop-featured-art" />
              <span className="shop-banner__art-label">PILIHAN UNGGULAN</span>
            </div>
            <div className="shop-banner__info">
              <span className="shop-banner__eyebrow">PREVIEW SHOP · ITEM CONTOH</span>
              <h3>{featured.title}</h3>
              <p>{featured.description}</p>
              <dl className="shop-banner__stats">
                <div><dt>Kategori</dt><dd>{featured.category}</dd></div>
                <div><dt>Rank</dt><dd>{featured.rank}</dd></div>
                <div><dt>Koleksi</dt><dd>{featured.skinCount}</dd></div>
              </dl>
              <button className="shop-button" type="button" onClick={() => onSelect(featured)}>
                Lihat detail item <Arrow />
              </button>
              <p className="shop-banner__note">Contoh tampilan. Belum ada stok atau transaksi aktif.</p>
            </div>
          </div>

          <div className="shop-picks-head">
            <h3>Jelajahi pilihan</h3>
            <span>{SHOP_ITEMS.length} item contoh</span>
          </div>
          <div className="shop-picks">
            {SHOP_ITEMS.map((item) => (
              <button
                className="shop-pick"
                key={item.id}
                type="button"
                onClick={() => onSelect(item)}
              >
                <span className={`shop-pick__art shop-pick__art--${item.art}`}>
                  <Artwork item={item} id={`shop-pick-${item.id}`} />
                  <span>{item.category}</span>
                </span>
                <span className="shop-pick__info">
                  <strong>{item.title}</strong>
                  <span>{item.rank} · {item.skinCount}</span>
                </span>
                <span className="shop-pick__arrow"><Arrow /></span>
              </button>
            ))}
          </div>
          <p className="sec__note">
            Nama akun, rank, dan jumlah skin di sini adalah data contoh; detail item belum terhubung ke inventaris nyata.
          </p>
        </div>
      </section>

      <section className="sec" id="cara-memilih">
        <div className="sec__inner">
          <div className="sec__head">
            <h2>Yang perlu diperiksa sebelum membeli.</h2>
            <p>Gunakan langkah sederhana ini untuk memahami penawaran dan mengurangi risiko salah pilih.</p>
          </div>
          <div className="market-buyer-steps">
            <article>
              <span>01</span>
              <h3>Cocokkan detail</h3>
              <p>Pastikan rank, hero, jumlah skin, dan informasi lain sesuai dengan yang ditawarkan.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Tanyakan akses akun</h3>
              <p>Konfirmasi akses email, metode bind, bukti kepemilikan, dan proses serah terima.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Baca ketentuannya</h3>
              <p>Periksa kebijakan game dan pahami risiko serta ketentuan transaksi sebelum melanjutkan.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="sec sec--white" id="tentang">
        <div className="sec__inner market-about">
          <div className="sec__head">
            <h2>Tentang GameKalcer</h2>
            <p>
              GameKalcer dirancang sebagai tempat untuk meninjau informasi akun Mobile Legends yang ditawarkan dan membantu calon pembeli membandingkan pilihan.
            </p>
            <p>
              Listing publik hanya untuk akun yang disetujui pemilik. Data contoh pada halaman ini belum terhubung ke inventaris atau proses transaksi, jadi belum ada pembelian yang dapat dilakukan melalui situs.
            </p>
          </div>
          <p className="market-about__note">
            Mobile Legends: Bang Bang adalah merek dagang pemiliknya. Pembelian atau penjualan akun dapat tunduk pada ketentuan game.
          </p>
        </div>
      </section>
    </>
  );
}
