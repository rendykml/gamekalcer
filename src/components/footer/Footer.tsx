import type { ReactNode } from 'react';
import './footer.css';

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

interface FooterProps {
  brand: ReactNode;
  tagline: string;
  columns: FooterColumn[];
  legal: string;
  /** Catatan kecil di baris bawah, misalnya sumber data contoh. */
  note?: string;
}

/**
 * Footer tanpa formulir langganan. Halaman berakhir pada aksinya sendiri,
 * footer hanya memuat navigasi dan keterangan hukum.
 */
export function Footer({ brand, tagline, columns, legal, note }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__id">
          <p className="footer__brand">{brand}</p>
          <p className="footer__tag">{tagline}</p>
        </div>

        <nav className="footer__cols" aria-label="Footer">
          {columns.map((col) => (
            <div key={col.title}>
              <h2>{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="container footer__bottom">
        <p>{legal}</p>
        {note ? <p>{note}</p> : null}
      </div>
    </footer>
  );
}
