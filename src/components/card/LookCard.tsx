import { useState } from 'react';
import { cx } from '@/lib/cx';
import { ContourArt } from '@/components/ContourArt';
import { Icon } from '@/components/Icon';
import './card.css';

export interface LookProduct {
  id: string;
  name: string;
  detail: string;
  /** Harga dalam rupiah penuh. */
  price: number;
  /** Posisi titik pada gambar, dalam persen (0 sampai 100). */
  x: number;
  y: number;
}

interface LookCardProps {
  title: string;
  image?: string;
  imageAlt?: string;
  artSeed?: number;
  products: LookProduct[];
  onAdd: (product: LookProduct) => void;
}

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

/**
 * Kartu "belanja tampilan ini": titik di atas gambar menyorot produk,
 * daftar di bawah gambar memuat produk yang sama dengan tombol tambah.
 */
export function LookCard({ title, image, imageAlt = '', artSeed = 4, products, onAdd }: LookCardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = products.find((p) => p.id === activeId) ?? null;

  return (
    <article className="look">
      <div className="look__media">
        {image ? <img src={image} alt={imageAlt} loading="lazy" /> : <ContourArt seed={artSeed} tone="dark" lines={20} />}

        {products.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className={cx('look__dot', p.id === activeId && 'is-active')}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            aria-pressed={p.id === activeId}
            aria-label={`${p.name}, ${rupiah.format(p.price)}`}
            onClick={() => setActiveId(p.id === activeId ? null : p.id)}
          >
            <span className="num" aria-hidden="true">
              {i + 1}
            </span>
          </button>
        ))}

        {active ? (
          <p className="look__chip" role="status">
            <span>{active.name}</span>
            <span className="num">{rupiah.format(active.price)}</span>
          </p>
        ) : null}
      </div>

      <div className="look__body">
        <h3>{title}</h3>
        <ul className="look__list">
          {products.map((p, i) => (
            <li key={p.id} className={cx(p.id === activeId && 'is-active')}>
              <span className="look__idx num" aria-hidden="true">
                {i + 1}
              </span>
              <div className="look__info">
                <p>{p.name}</p>
                <p className="look__detail">{p.detail}</p>
              </div>
              <p className="num look__price">{rupiah.format(p.price)}</p>
              <button type="button" className="look__add" onClick={() => onAdd(p)} aria-label={`Tambah ${p.name} ke keranjang`}>
                <Icon name="bag" size={18} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
