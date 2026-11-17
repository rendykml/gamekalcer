import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import './card.css';

interface StatCardProps {
  title: string;
  /** Angka utama, ditulis lengkap dengan satuannya. */
  value: string;
  note?: string;
  tone?: 'dark' | 'blue';
  children?: ReactNode;
}

/** Kartu data biasa: satu angka, satu penjelasan. Bukan kartu foto. */
export function StatCard({ title, value, note, tone = 'dark', children }: StatCardProps) {
  return (
    <article className={cx('stat', `stat--${tone}`)}>
      <h3>{title}</h3>
      <p className="stat__value num">{value}</p>
      {note ? <p className="stat__note">{note}</p> : null}
      {children}
    </article>
  );
}
