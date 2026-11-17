import Platform from "./Platform";

function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <>
      <div className="hero">
        <div className="hero__copy">
          <div className="hero__badges">
            <span className="badge">Marketplace akun MLBB</span>
          </div>

          <h1 className="hero__title">
            <span className="hero__title-dim">Temukan akun impian</span>
            <span
              className="hero__rotator"
              role="group"
              aria-label="Beli akun pilihanmu. Mainkan hero favoritmu. Mulai petualanganmu."
            >
              <span>Mainkan hero favoritmu.</span>
              <span>Beli akun pilihanmu.</span>
              <span>Mulai petualanganmu.</span>
            </span>
          </h1>

          <div className="cta">
            <a className="cta__main" href="/?shop=1">
              Jelajahi akun
            </a>
            <a className="cta__arrow" href="/?shop=1" aria-label="Lihat katalog akun">
              <Arrow />
            </a>
          </div>
        </div>

        <Platform />
      </div>

      <div className="trusted">
        <span className="trusted__label">Temukan akun berdasarkan</span>
        <div className="trusted__logos">
          <span className="logo">Rank pilihan</span>
          <span className="logo">Koleksi skin</span>
          <span className="logo">Budget kamu</span>
        </div>
      </div>
    </>
  );
}
