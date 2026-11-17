type NavPage = "home" | "shop";

function LogoMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <path
        d="M13 2 L22 7.5 V18.5 L13 24 L4 18.5 V7.5 Z"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="13" cy="13" r="3.2" fill="#fff" />
    </svg>
  );
}

export default function Nav({ page = "home" }: { page?: NavPage }) {
  const links = page === "shop"
    ? [
      { label: "Shop", href: "/?shop=1#shop-list" },
      { label: "Cara memilih", href: "/#cara-memilih" },
      { label: "Tentang", href: "/#tentang" },
    ]
    : [
      { label: "Shop", href: "/?shop=1" },
      { label: "Cara memilih", href: "#cara-memilih" },
      { label: "Tentang", href: "#tentang" },
    ];

  return (
    <header className="nav">
      <a className="nav__brand" href={page === "shop" ? "/" : "#top"}>
        <LogoMark />
        GameKalcer
      </a>
      <nav className="nav__links" aria-label="Navigasi utama">
        {links.map((l) => (
          <a key={l.label} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="nav__actions">
        <a className="btn btn--dark" href="/?auth=login">
          Masuk
        </a>
        <a className="btn btn--light" href={page === "shop" ? "/?shop=1#shop-list" : "/?shop=1"}>
          Lihat akun
        </a>
      </div>
    </header>
  );
}
