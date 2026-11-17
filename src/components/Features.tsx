import type { ReactNode } from "react";
import {
  LayersIllustration,
  TraceIllustration,
  FunnelIllustration,
  LoopIllustration,
} from "./Illustrations";

type Feature = {
  log: string;
  title: string;
  text: string;
  illustration: ReactNode;
};

const features: Feature[] = [
  {
    log: "Pilih sesuai kebutuhan",
    title: "Mulai dari gaya mainmu",
    text: "Cari akun berdasarkan rank, hero favorit, koleksi skin, atau kisaran budget.",
    illustration: <LayersIllustration />,
  },
  {
    log: "Bandingkan detail",
    title: "Lihat sebelum bertanya",
    text: "Periksa rank dan informasi koleksi akun agar lebih mudah membandingkan pilihan.",
    illustration: <TraceIllustration />,
  },
  {
    log: "Kenali risikonya",
    title: "Pahami hal penting",
    text: "Cek akses email, metode bind, dan ketentuan game sebelum melanjutkan transaksi.",
    illustration: <FunnelIllustration />,
  },
  {
    log: "Pilih dengan tenang",
    title: "Utamakan informasi jelas",
    text: "Gunakan detail listing sebagai bahan pertanyaan, bukan sebagai pengganti pemeriksaan akun.",
    illustration: <LoopIllustration />,
  },
];

export default function Features() {
  return (
    <section className="features" id="platform">
      <div className="features__head">
        <h2 className="features__title">
          <span>Cari akun dengan detail</span>
          <span className="features__title-accent">yang mudah dipahami</span>
        </h2>
        <p className="features__sub">
          GameKalcer membantu pengunjung melihat informasi dasar akun Mobile Legends sebelum memilih.
        </p>
      </div>

      <div className="features__grid">
        {features.map((f) => (
          <article className="feature" key={f.log}>
            <span className="feature__log">{f.log}</span>
            {f.illustration}
            <div className="feature__body">
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="features__foot">
        <a className="learn" href="#cara-memilih">
          Panduan sebelum membeli
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M2 7h10M8 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
