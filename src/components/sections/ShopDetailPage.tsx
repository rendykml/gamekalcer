import { HeroArtwork } from "../Platform";
import Nav from "../Nav";
import type { ShopItem } from "./MarketplaceSections";

export default function ShopDetailPage({
  item,
  onBack,
}: {
  item: ShopItem;
  onBack: () => void;
}) {
  return (
    <main className="shop-detail-page">
      <Nav page="shop" />
      <div className="shop-detail-content">
        <button className="shop-detail-back" type="button" onClick={onBack}>
          <span aria-hidden="true">←</span> Kembali ke Shop
        </button>

        <section className="shop-detail">
          <div className="shop-detail__media">
            <div className={`shop-detail__art shop-detail__art--${item.art}`}>
              <HeroArtwork variant={item.art} id={`shop-detail-${item.id}`} />
              <span className="shop-detail__image-label">ILUSTRASI CONTOH</span>
            </div>
            <div className="shop-detail__thumbs" role="group" aria-label="Informasi visual">
              <span className={`shop-detail__thumb shop-detail__thumb--${item.art}`}>
                <HeroArtwork variant={item.art} id={`shop-detail-thumb-${item.id}`} />
              </span>
              <span className="shop-detail__thumb-copy">
                Gambar akun asli akan ditampilkan setelah katalog terhubung.
              </span>
            </div>
          </div>

          <aside className="shop-detail__info">
            <span className="shop-detail__eyebrow">DETAIL ITEM · PREVIEW</span>
            <h1>{item.title}</h1>
            <p className="shop-detail__description">{item.description}</p>

            <dl className="shop-detail__facts">
              <div><dt>Kategori</dt><dd>{item.category}</dd></div>
              <div><dt>Rank</dt><dd>{item.rank}</dd></div>
              <div><dt>Koleksi skin</dt><dd>{item.skinCount}</dd></div>
            </dl>

            <p className="shop-detail__notice">
              <strong>Item contoh, bukan stok aktif.</strong>
              <span>Harga, ketersediaan, dan proses transaksi belum terhubung.</span>
            </p>

            <button className="shop-detail__purchase" type="button" disabled>
              Pembelian belum tersedia
            </button>
            <button className="shop-detail__return" type="button" onClick={onBack}>
              ← Kembali melihat pilihan
            </button>
          </aside>
        </section>
      </div>
    </main>
  );
}
