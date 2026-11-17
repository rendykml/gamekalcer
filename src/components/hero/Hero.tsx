import type { ReactNode } from 'react';
import { ButtonLink } from '@/components/button/Button';
import { Icon } from '@/components/Icon';
import './hero.css';

export interface HeroStat {
  label: string;
  value: string;
}

interface HeroCta {
  label: string;
  href: string;
}

interface HeroProps {
  /** Baris pertama judul, tampil redup. */
  lead: string;
  /** Baris kedua judul, tampil terang. */
  title: string;
  lede: string;
  primary: HeroCta;
  secondary?: HeroCta;
  /** Chip sertifikasi di atas judul. */
  badges?: string[];
  /** Chip status dengan titik merah. */
  status?: { label: string; value: string };
  stats?: HeroStat[];
  /** Visual utama: plat isometrik, tangkapan layar produk, atau foto nyata. */
  visual: ReactNode;
}

export function Hero({ lead, title, lede, primary, secondary, badges, status, stats, visual }: HeroProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__chips">
        {badges?.map((b) => (
          <span key={b} className="chip">
            {b}
          </span>
        ))}
        {status ? (
          <span className="chip chip--status">
            <span className="chip__label">{status.label}</span>
            <span className="chip__dot" aria-hidden="true" />
            <span>{status.value}</span>
          </span>
        ) : null}
      </div>

      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 id="hero-title">
            <span className="hero__lead">{lead}</span>
            <span className="hero__main">{title}</span>
          </h1>
          <p className="hero__lede">{lede}</p>

          <div className="hero__cta">
            <a className="cta-split" href={primary.href}>
              <span className="cta-split__label">{primary.label}</span>
              <span className="cta-split__arrow" aria-hidden="true">
                <Icon name="arrow" size={18} />
              </span>
            </a>
            {secondary ? (
              <ButtonLink href={secondary.href} size="lg" variant="ghost">
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>

        <div className="hero__visual">{visual}</div>
      </div>

      {stats?.length ? (
        <div className="container">
          <dl className="hero__stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd className="num">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </section>
  );
}
