import { useEffect, useState, type ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { Icon } from '@/components/Icon';
import './header.css';

export interface NavLink {
  label: string;
  href: string;
  current?: boolean;
}

interface HeaderProps {
  brand: ReactNode;
  brandHref?: string;
  links: NavLink[];
  /** Tombol aksi di kanan (login, CTA). Ditampilkan juga di panel mobile. */
  actions?: ReactNode;
  mainId?: string;
}

export function Header({ brand, brandHref = '#top', links, actions, mainId = 'main' }: HeaderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <a className="skip-link" href={`#${mainId}`}>
        Lewati ke isi halaman
      </a>
      <header className="header">
        <div className="container header__bar">
          <a className="header__brand" href={brandHref}>
            {brand}
          </a>

          <nav className="header__nav" aria-label="Utama">
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} aria-current={l.current ? 'page' : undefined} className="header__link">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">{actions}</div>

          <button
            type="button"
            className="header__toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} />
            <span className="visually-hidden">{open ? 'Tutup menu' : 'Buka menu'}</span>
          </button>
        </div>

        <div id="mobile-nav" className={cx('header__panel', open && 'is-open')} hidden={!open}>
          <nav className="container" aria-label="Utama (ponsel)">
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={l.current ? 'page' : undefined}
                    className="header__panel-link"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="header__panel-actions">{actions}</div>
          </nav>
        </div>
      </header>
    </>
  );
}
