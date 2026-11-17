import { useId } from 'react';

interface IsoPlateProps {
  /** Teks alternatif untuk pembaca layar. */
  label: string;
  /** Tulisan pada pita di tepi plat. */
  strip?: string;
  /** Tulisan pada penanda merah. */
  marker?: string;
}

const CX = 330;
const CY = 235;
const SQ = Math.SQRT1_2;
const FLAT = 0.56;

/** Titik bidang (x, y) ke koordinat layar, sesuai transformasi isometrik plat. */
function toScreen(x: number, y: number, dy = 0): [number, number] {
  return [CX + (x * SQ - y * SQ), CY + dy + (x * SQ + y * SQ) * FLAT];
}

const plane = (dy: number) => `translate(${CX} ${CY + dy}) scale(1 ${FLAT}) rotate(45)`;

/**
 * Plat isometrik berlapis: pengganti grafik utama hero.
 * Biru = struktur, putih = garis ukur, merah = penanda aktif.
 */
export function IsoPlate({ label, strip = 'PENAMPANG B', marker = 'Potongan B' }: IsoPlateProps) {
  const titleId = useId();
  const corners: [number, number][] = [
    [-102, -102],
    [102, -102],
    [102, 102],
    [-102, 102],
  ];
  const [mx, my] = toScreen(44, -34);

  return (
    <svg viewBox="0 0 660 480" width="100%" role="img" aria-labelledby={titleId} className="iso-plate">
      <title id={titleId}>{label}</title>

      {/* garis rambut luar */}
      <g transform={plane(0)} fill="none" stroke="rgb(169 176 220 / 0.22)">
        <rect x={-215} y={-215} width={430} height={430} vectorEffect="non-scaling-stroke" />
        <rect x={-175} y={-175} width={350} height={350} vectorEffect="non-scaling-stroke" />
      </g>

      {/* tumpukan plat */}
      <g transform={plane(30)}>
        <rect x={-130} y={-130} width={260} height={260} fill="var(--ink-900)" stroke="var(--blue-600)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
      </g>
      <g transform={plane(15)}>
        <rect x={-118} y={-118} width={236} height={236} fill="var(--blue-700)" />
      </g>
      <g transform={plane(0)}>
        <rect x={-102} y={-102} width={204} height={204} fill="var(--blue-600)" stroke="rgb(255 255 255 / 0.7)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        <rect x={-80} y={-80} width={160} height={160} fill="none" stroke="rgb(255 255 255 / 0.55)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        <path
          d="M-56,12 C-62,-38 -22,-72 10,-42 S62,-6 32,22 S-46,56 -56,12Z"
          fill="none"
          stroke="rgb(255 255 255 / 0.8)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        <g>
          <rect x={-84} y={62} width={116} height={15} fill="rgb(255 255 255 / 0.92)" />
          <text x={-78} y={72.6} fontFamily="var(--font-data)" fontSize={7.5} fill="var(--ink-950)">
            {strip}
          </text>
        </g>
      </g>

      {/* titik sudut */}
      {corners.map(([x, y]) => {
        const [sx, sy] = toScreen(x, y);
        const isRed = x > 0 && y < 0;
        return isRed ? (
          <g key={`${x}${y}`}>
            <circle cx={sx} cy={sy} r={9} fill="none" stroke="var(--red-700)" strokeWidth={1.5} />
            <circle cx={sx} cy={sy} r={4.5} fill="var(--red-700)" stroke="#fff" strokeWidth={1.5} />
          </g>
        ) : (
          <circle key={`${x}${y}`} cx={sx} cy={sy} r={3} fill="#fff" />
        );
      })}

      {/* penanda merah: garis potong naik dari plat */}
      <line x1={mx} y1={my} x2={mx} y2={42} stroke="var(--red-700)" strokeWidth={2} strokeDasharray="6 5" />
      <circle cx={mx} cy={my} r={6} fill="var(--red-700)" stroke="#fff" strokeWidth={2} />
      <rect x={mx - 48} y={20} width={96} height={24} rx={4} fill="var(--red-700)" />
      <text x={mx} y={36} textAnchor="middle" fill="#fff" fontFamily="var(--font-data)" fontSize={12}>
        {marker}
      </text>
    </svg>
  );
}
