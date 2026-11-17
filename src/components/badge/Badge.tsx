import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { Icon } from '@/components/Icon';
import './badge.css';

type BadgeTone = 'neutral' | 'blue' | 'red';

interface BadgeProps {
  tone?: BadgeTone;
  /** Titik merah penanda pembaruan atau notifikasi penting. */
  dot?: boolean;
  children: ReactNode;
}

/** Label status. Huruf biasa (bukan kapital berjarak), angka memakai font data. */
export function Badge({ tone = 'neutral', dot = false, children }: BadgeProps) {
  return (
    <span className={cx('badge', `badge--${tone}`)}>
      {dot ? <span className="badge__dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

interface TagProps {
  children: ReactNode;
  /** Mode filter: tombol yang bisa dipilih. */
  pressed?: boolean;
  onPressedChange?: (next: boolean) => void;
  /** Mode terpilih: tampil dengan tombol hapus. */
  onRemove?: () => void;
}

export function Tag({ children, pressed, onPressedChange, onRemove }: TagProps) {
  if (onRemove) {
    return (
      <span className="tag tag--removable">
        <span>{children}</span>
        <button type="button" className="tag__remove" onClick={onRemove} aria-label={`Hapus ${String(children)}`}>
          <Icon name="close" size={14} />
        </button>
      </span>
    );
  }

  if (onPressedChange) {
    return (
      <button
        type="button"
        className={cx('tag', 'tag--button')}
        aria-pressed={pressed}
        onClick={() => onPressedChange(!pressed)}
      >
        {pressed ? <Icon name="check" size={14} /> : null}
        {children}
      </button>
    );
  }

  return <span className="tag">{children}</span>;
}

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  /** Label di tengah garis, untuk memisahkan kelompok isi. */
  label?: string;
}

export function Divider({ orientation = 'horizontal', label }: DividerProps) {
  if (orientation === 'vertical') {
    return <span className="divider divider--vertical" role="separator" aria-orientation="vertical" />;
  }
  if (label) {
    return (
      <div className="divider divider--label" role="separator">
        <span>{label}</span>
      </div>
    );
  }
  return <hr className="divider" />;
}
