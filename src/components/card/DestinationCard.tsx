import { cx } from '@/lib/cx';
import { Badge } from '@/components/badge/Badge';
import { ContourArt } from '@/components/ContourArt';
import { Icon } from '@/components/Icon';
import './card.css';

export interface DestinationMeta {
  label: string;
  value: string;
}

interface DestinationCardProps {
  title: string;
  location: string;
  /** URL foto nyata. Tanpa ini kartu memakai ContourArt. */
  image?: string;
  imageAlt?: string;
  artSeed?: number;
  tag?: string;
  meta?: DestinationMeta[];
  price: string;
  selected: boolean;
  onSelect: () => void;
}

/**
 * Kartu "pilih tujuan": media penuh, panel info pekat di bawah.
 * Seluruh kartu adalah satu kontrol pilihan (tombol toggle), bukan hanya tombol kecil.
 */
export function DestinationCard({
  title,
  location,
  image,
  imageAlt = '',
  artSeed = 1,
  tag,
  meta = [],
  price,
  selected,
  onSelect,
}: DestinationCardProps) {
  return (
    <article className={cx('dest', selected && 'is-selected')}>
      <div className="dest__media">
        {image ? <img src={image} alt={imageAlt} loading="lazy" /> : <ContourArt seed={artSeed} tone="blue" />}
        {tag ? (
          <div className="dest__tag">
            <Badge tone="neutral">{tag}</Badge>
          </div>
        ) : null}
      </div>

      <div className="dest__panel">
        <h3>{title}</h3>
        <p className="dest__loc">
          <Icon name="pin" size={16} />
          {location}
        </p>

        {meta.length ? (
          <dl className="dest__meta">
            {meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd className="num">{m.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="dest__foot">
          <p className="dest__price num">{price}</p>
          <button
            type="button"
            className="dest__pick"
            aria-pressed={selected}
            aria-label={`Pilih ${title}`}
            onClick={onSelect}
          >
            {selected ? <Icon name="check" size={18} /> : <Icon name="plus" size={18} />}
            <span>{selected ? 'Terpilih' : 'Pilih'}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
