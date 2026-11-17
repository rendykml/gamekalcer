import { useId } from 'react';

interface ScanProfileProps {
  /** Teks alternatif yang menjelaskan isi grafik. */
  label: string;
  cutLabel?: string;
}

const W = 560;
const H = 340;

function groundY(x: number): number {
  return 238 - 26 * Math.sin(x / 62) - 14 * Math.sin(x / 21 + 1.2);
}

/**
 * Penampang tanah dan struktur (data contoh, dihitung deterministik).
 * Biru = struktur data, merah = penanda garis potong.
 */
export function ScanProfile({ label, cutLabel = 'Potongan B' }: ScanProfileProps) {
  const titleId = useId();
  const pts: string[] = [];
  for (let x = 0; x <= W; x += 8) pts.push(`${x},${groundY(x).toFixed(1)}`);
  const ground = `M${pts.join(' L')}`;
  const fill = `${ground} L${W},${H} L0,${H} Z`;
  const cutX = 372;

  return (
    <svg
      className="profile"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-labelledby={titleId}
      width="100%"
      height="auto"
    >
      <title id={titleId}>{label}</title>

      {[60, 120, 180, 240, 300].map((y) => (
        <line key={y} x1={0} x2={W} y1={y} y2={y} stroke="var(--line)" strokeWidth={1} />
      ))}
      {[80, 160, 240, 320, 400, 480].map((x) => (
        <line key={x} x1={x} x2={x} y1={0} y2={H} stroke="var(--line)" strokeWidth={1} />
      ))}

      <path d={fill} fill="var(--ink-900)" />
      <path d={ground} fill="none" stroke="var(--text-dim)" strokeWidth={1.5} />

      {/* struktur: pelat lantai bertingkat */}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={196 + i * 4}
          y={groundY(236) - 38 - i * 34}
          width={150 - i * 8}
          height={10}
          fill="var(--blue-600)"
        />
      ))}
      {[200, 258, 316].map((x) => (
        <rect key={x} x={x} y={groundY(x) - 104} width={7} height={104} fill="var(--blue-700)" />
      ))}

      {/* garis potong */}
      <line x1={cutX} x2={cutX} y1={18} y2={H - 18} stroke="var(--red-700)" strokeWidth={2} strokeDasharray="6 5" />
      <rect x={cutX - 46} y={6} width={92} height={22} rx={4} fill="var(--red-700)" />
      <text x={cutX} y={21} textAnchor="middle" fill="#fff" fontFamily="var(--font-data)" fontSize={12}>
        {cutLabel}
      </text>

      <text x={12} y={H - 10} fill="var(--text-dim)" fontFamily="var(--font-data)" fontSize={12}>
        skala horizontal dan vertikal sama
      </text>
    </svg>
  );
}
