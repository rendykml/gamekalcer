const columns = [
  { title: "Jelajahi", links: [{ label: "Katalog", href: "/?shop=1" }, { label: "Cara memilih", href: "#cara-memilih" }] },
  { title: "GameKalcer", links: [{ label: "Tentang", href: "#tentang" }, { label: "Kembali ke atas", href: "#top" }] },
];

export default function Footer() {
  return (
    <footer className="footer" id="company">
      <div className="sec__inner footer__inner">
        <div className="footer__brand">
          <p className="footer__name">GameKalcer</p>
          <p className="footer__line">Temukan akun Mobile Legends yang sesuai gaya mainmu.</p>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2>{c.title}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="footer__legal sec__inner">
        © GameKalcer. Listing yang ditampilkan adalah contoh dan bukan penawaran akun aktif.
      </p>
    </footer>
  );
}
