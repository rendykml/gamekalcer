import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Nav from "../Nav";
import { HeroArtwork } from "../Platform";
import type { ShopItem } from "./MarketplaceSections";
import { SHOP_ITEMS } from "./MarketplaceSections";

type ShopFilter = "all" | "collection" | "rank" | "starter" | "wishlist";
type ShopIconName = "home" | "grid" | "skin" | "rank" | "heart" | "help";

const filters: { id: ShopFilter; label: string; icon: ShopIconName }[] = [
  { id: "all", label: "Semua akun", icon: "grid" },
  { id: "collection", label: "Koleksi skin", icon: "skin" },
  { id: "rank", label: "Rank tinggi", icon: "rank" },
  { id: "starter", label: "Akun pemula", icon: "home" },
  { id: "wishlist", label: "Favorit", icon: "heart" },
];

function ShopIcon({ name }: { name: ShopIconName }) {
  const paths: Record<ShopIconName, ReactNode> = {
    home: <path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z" />,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    skin: <><path d="M12 3 14.8 8.7 21 9.6l-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z" /></>,
    rank: <><path d="M12 3 19 7v10l-7 4-7-4V7z" /><path d="m9 12 2 2 4-4" /></>,
    heart: <path d="M20.8 8.8c0 4.1-8.8 10-8.8 10s-8.8-5.9-8.8-10a4.8 4.8 0 0 1 8.8-2.6 4.8 4.8 0 0 1 8.8 2.6Z" />,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9.6 9a2.5 2.5 0 1 1 4.6 1.3c-.8 1.1-2.2 1.4-2.2 3" /><path d="M12 17h.01" /></>,
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3.5 9h11m-4.5-4.5L14.5 9 10 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FavoriteIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} aria-hidden="true">
      <path d="M20.8 8.8c0 4.1-8.8 10-8.8 10s-8.8-5.9-8.8-10a4.8 4.8 0 0 1 8.8-2.6 4.8 4.8 0 0 1 8.8 2.6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function ItemArtwork({ item, id }: { item: ShopItem; id: string }) {
  return <HeroArtwork variant={item.art} id={id} />;
}

export default function ShopPage({
  onSelect,
  favoriteIds,
  onToggleFavorite,
}: {
  onSelect: (item: ShopItem) => void;
  favoriteIds: string[];
  onToggleFavorite: (itemId: string) => void;
}) {
  const [activeFilter, setActiveFilter] = useState<ShopFilter>("all");
  const [search, setSearch] = useState("");
  const featured = SHOP_ITEMS[0];
  const visibleItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return SHOP_ITEMS.filter((item) => {
      const matchesFilter = activeFilter === "all"
        || (activeFilter === "collection" && item.category === "Koleksi skin")
        || (activeFilter === "rank" && item.category === "Rank tinggi")
        || (activeFilter === "starter" && item.category === "Akun pemula")
        || (activeFilter === "wishlist" && favoriteIds.includes(item.id));
      const searchableText = `${item.title} ${item.category} ${item.rank} ${item.skinCount}`.toLowerCase();

      return matchesFilter && searchableText.includes(normalizedSearch);
    });
  }, [activeFilter, favoriteIds, search]);

  return (
    <main className="page shop-page">
      <Nav page="shop" />
      <div className="shop-page__layout">
        <aside className="shop-sidebar">
          <div className="shop-sidebar__label">JELAJAHI</div>
          <nav className="shop-sidebar__nav" aria-label="Kategori Shop">
            {filters.map((filter) => (
              <button
                className={`shop-sidebar__link${activeFilter === filter.id ? " is-active" : ""}`}
                key={filter.id}
                type="button"
                aria-pressed={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              >
                <ShopIcon name={filter.icon} />
                <span>{filter.label}</span>
                {filter.id === "wishlist" && favoriteIds.length > 0 && (
                  <span className="shop-sidebar__count">{favoriteIds.length}</span>
                )}
              </button>
            ))}
          </nav>

          <a className="shop-sidebar__guide" href="/#cara-memilih">
            <span className="shop-sidebar__guide-icon"><ShopIcon name="help" /></span>
            <strong>Baru di GameKalcer?</strong>
            <span>Pahami hal penting sebelum memilih akun.</span>
            <span className="shop-sidebar__guide-link">Baca panduan <ArrowIcon /></span>
          </a>
        </aside>

        <div className="shop-main">
          <div className="shop-toolbar">
            <label className="shop-search">
              <span className="shop-search__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.6" />
                  <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari akun, rank, atau koleksi skin"
                aria-label="Cari akun"
              />
            </label>
            <span className="shop-toolbar__note">Preview katalog</span>
          </div>

          <section className="shop-featured" aria-label="Akun unggulan">
            <div className={`shop-featured__art shop-featured__art--${featured.art}`}>
              <ItemArtwork item={featured} id="shop-page-featured" />
            </div>
            <div className="shop-featured__shade" />
            <div className="shop-featured__tags">
              <span>PILIHAN UNGGULAN</span>
              <span>{featured.category}</span>
            </div>
            <button
              className={`shop-favorite shop-featured__favorite${favoriteIds.includes(featured.id) ? " is-favorite" : ""}`}
              type="button"
              aria-label={favoriteIds.includes(featured.id) ? "Hapus dari favorit" : "Simpan ke favorit"}
              aria-pressed={favoriteIds.includes(featured.id)}
              onClick={() => onToggleFavorite(featured.id)}
            >
              <FavoriteIcon filled={favoriteIds.includes(featured.id)} />
            </button>
            <div className="shop-featured__copy">
              <span className="shop-featured__eyebrow">AKUN MOBILE LEGENDS · PREVIEW</span>
              <h1>{featured.title}</h1>
              <p>{featured.description}</p>
              <div className="shop-featured__facts">
                <span>{featured.rank}</span>
                <span>{featured.skinCount}</span>
              </div>
            </div>
            <button className="shop-featured__button" type="button" onClick={() => onSelect(featured)}>
              Lihat detail <ArrowIcon />
            </button>
          </section>

          <section className="shop-catalog" id="shop-list">
            <div className="shop-catalog__heading">
              <div>
                <span className="shop-catalog__eyebrow">PILIHAN UNTUKMU</span>
                <h2>{activeFilter === "wishlist" ? "Akun favorit" : "Jelajahi akun"}</h2>
                <p>Bandingkan rank dan koleksi sebelum melihat detail akun.</p>
              </div>
              <span className="shop-catalog__count">{visibleItems.length} preview</span>
            </div>

            {visibleItems.length > 0 ? (
              <div className="shop-cards">
                {visibleItems.map((item) => {
                  const isFavorite = favoriteIds.includes(item.id);

                  return (
                    <article className="shop-card" key={item.id}>
                      <button className="shop-card__open" type="button" onClick={() => onSelect(item)}>
                        <span className={`shop-card__art shop-card__art--${item.art}`}>
                          <ItemArtwork item={item} id={`shop-page-${item.id}`} />
                          <span className="shop-card__badge">PREVIEW</span>
                        </span>
                        <span className="shop-card__info">
                          <span className="shop-card__category">{item.category}</span>
                          <strong>{item.title}</strong>
                          <span className="shop-card__meta">{item.rank}<span aria-hidden="true">·</span>{item.skinCount}</span>
                        </span>
                      </button>
                      <button
                        className={`shop-favorite shop-card__favorite${isFavorite ? " is-favorite" : ""}`}
                        type="button"
                        aria-label={isFavorite ? `Hapus ${item.title} dari favorit` : `Simpan ${item.title} ke favorit`}
                        aria-pressed={isFavorite}
                        onClick={() => onToggleFavorite(item.id)}
                      >
                        <FavoriteIcon filled={isFavorite} />
                      </button>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="shop-empty">
                <ShopIcon name={activeFilter === "wishlist" ? "heart" : "grid"} />
                <strong>{activeFilter === "wishlist" ? "Belum ada akun favorit" : "Akun tidak ditemukan"}</strong>
                <span>
                  {activeFilter === "wishlist"
                    ? "Simpan akun dengan ikon hati agar mudah dilihat lagi."
                    : "Coba kata kunci atau kategori yang berbeda."}
                </span>
              </div>
            )}

            <p className="shop-catalog__disclaimer">
              Semua item di halaman ini adalah ilustrasi contoh, bukan stok aktif. Harga dan transaksi belum tersedia.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
