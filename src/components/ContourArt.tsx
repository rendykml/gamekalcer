import { useMemo } from 'react';

interface ContourArtProps {
  /** Benih deterministik: seed sama selalu menghasilkan garis yang sama. */
  seed?: number;
  tone?: 'blue' | 'dark' | 'red';
  lines?: number;
}

const TONES = {
  blue: { bg: 'var(--blue-700)', stroke: 'rgb(255 255 255 / 0.55)' },
  dark: { bg: 'var(--ink-900)', stroke: 'var(--line-strong)' },
  red: { bg: 'var(--red-700)', stroke: 'rgb(255 255 255 / 0.5)' },
} as const;

/**
 * Pengganti foto yang jujur: garis kontur buatan kode, bukan gambar stok.
 * Dipakai selama `image` belum diberikan pada kartu.
 */
export function ContourArt({ seed = 1, tone = 'blue', lines = 16 }: ContourArtProps) {
  const paths = useMemo(() => {
    const out: string[] = [];
    for (let i = 0; i < lines; i += 1) {
      const base = 20 + i * (360 / lines);
      const a = 14 + ((seed * 7 + i * 3) % 18);
      const f = 0.012 + ((seed * 3) % 7) * 0.002;
      const p = seed * 1.3 + i * 0.35;
      let d = '';
      for (let x = 0; x <= 300; x += 10) {
        const y = base + a * Math.sin(x * f * 6 + p) + (a / 2) * Math.sin(x * f * 14 + p * 2);
        d += `${x === 0 ? 'M' : 'L'}${x},${y.toFixed(1)} `;
      }
      out.push(d.trim());
    }
    return out;
  }, [seed, lines]);

  const t = TONES[tone];

  return (
    <svg
      viewBox="0 0 300 400"
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
      aria-hidden="true"
      focusable="false"
      style={{ background: t.bg }}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={t.stroke} strokeWidth={1} />
      ))}
    </svg>
  );
}
