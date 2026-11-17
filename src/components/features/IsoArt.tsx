import type { ReactNode } from 'react';

export type IsoKind = 'stack' | 'flow' | 'cluster' | 'orbit';

type Pt = [number, number];

/** Proyeksi isometrik: x ke kanan-bawah, y ke kiri-bawah, z ke atas. */
const P = (x: number, y: number, z: number): Pt => [120 + (x - y) * 0.866, 150 + (x + y) * 0.5 - z];
const fmt = (pts: Pt[]) => pts.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' ');

interface BoxProps {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  /** Isi permukaan atas, untuk kotak yang diberi warna aksen. */
  topFill?: string;
}

function Box({ x, y, z, w, d, h, topFill }: BoxProps) {
  const top = [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)];
  const left = [P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)];
  const right = [P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)];
  return (
    <g>
      <polygon className="iso-l" points={fmt(left)} />
      <polygon className="iso-r" points={fmt(right)} />
      <polygon className="iso-t" points={fmt(top)} style={topFill ? { fill: topFill } : undefined} />
    </g>
  );
}

/** Lingkaran pada bidang datar, diproyeksikan menjadi elips. */
function Disc({ x, y, z, r, fill }: { x: number; y: number; z: number; r: number; fill: string }) {
  const [cx, cy] = P(x, y, z);
  return <ellipse cx={cx} cy={cy} rx={r * 1.2247} ry={r * 0.7071} fill={fill} />;
}

function Dot({ x, y, z, r = 1.8, fill = 'var(--iso-dot)' }: { x: number; y: number; z: number; r?: number; fill?: string }) {
  const [cx, cy] = P(x, y, z);
  return <circle cx={cx} cy={cy} r={r} fill={fill} />;
}

const BLUE = 'rgb(27 59 250 / 0.55)';
const RED = 'var(--red-700)';

function Stack(): ReactNode {
  const zs = [0, 16, 32, 48, 64];
  const corners: Pt[] = [[-42, -42], [42, -42], [-42, 42], [42, 42]];
  return (
    <>
      {corners.map(([x, y]) => {
        const [x1, y1] = P(x, y, 8);
        const [x2, y2] = P(x, y, 72);
        return <line key={`${x}${y}`} className="iso-guide" x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
      {zs.map((z) => (
        <Box key={z} x={-42} y={-42} z={z} w={84} d={84} h={8} />
      ))}
      <Disc x={0} y={0} z={72} r={24} fill={BLUE} />
      {[-1, 0, 1].flatMap((i) => [-1, 0, 1].map((j) => <Dot key={`${i}${j}`} x={i * 8} y={j * 8} z={72} r={1.5} />))}
      <Dot x={32} y={32} z={72} r={3} fill={RED} />
    </>
  );
}

function Flow(): ReactNode {
  const [a, b, c, d] = [P(0, -30, 77), P(40, 10, 47), P(-50, 20, 19), P(-4, 44, -1)];
  return (
    <>
      <Box x={-20} y={-50} z={70} w={40} d={40} h={7} />
      <Box x={-70} y={0} z={12} w={40} d={40} h={7} />
      <Box x={-24} y={24} z={-8} w={40} d={40} h={7} />
      <Box x={20} y={-10} z={40} w={40} d={40} h={7} />
      <polyline className="iso-path" points={fmt([a, b, c, d])} />
      <circle cx={d[0]} cy={d[1]} r={9} fill="none" stroke={RED} strokeWidth={1.5} />
      <circle cx={d[0]} cy={d[1]} r={4} fill={RED} />
    </>
  );
}

function Cluster(): ReactNode {
  const cubes: { x: number; y: number; z: number; red: boolean }[] = [];
  for (let i = 0; i < 4; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      cubes.push({ x: -48 + i * 24, y: -34 + j * 24, z: 70 + ((i * 5 + j * 3) % 3) * 9, red: i === 2 && j === 1 });
    }
  }
  cubes.sort((p, q) => p.x + p.y - (q.x + q.y) || p.z - q.z);
  return (
    <>
      <Box x={-55} y={-55} z={0} w={110} d={110} h={36} />
      <Disc x={0} y={0} z={36} r={26} fill={BLUE} />
      <Dot x={0} y={0} z={36} r={2.2} />
      {cubes.map((c) => (
        <Box key={`${c.x}${c.y}`} x={c.x} y={c.y} z={c.z} w={14} d={14} h={10} topFill={c.red ? RED : undefined} />
      ))}
    </>
  );
}

function Orbit(): ReactNode {
  const grid: Pt[] = [];
  for (let i = -1; i <= 2; i += 1) for (let j = -1; j <= 2; j += 1) grid.push([i * 14 - 7, j * 14 - 7]);
  return (
    <>
      <ellipse className="iso-orbit" cx={120} cy={150} rx={104} ry={52} />
      <Box x={-62} y={-62} z={0} w={124} d={124} h={14} />
      {grid.map(([x, y]) => (
        <Dot key={`${x}${y}`} x={x} y={y} z={14} r={1.2} fill="rgb(169 176 220 / 0.7)" />
      ))}
      <Box x={-30} y={-30} z={50} w={60} d={60} h={8} />
      <Disc x={0} y={0} z={58} r={12} fill={BLUE} />
      <Box x={-30} y={-30} z={88} w={60} d={60} h={8} />
      <Disc x={0} y={0} z={96} r={12} fill={BLUE} />
      <circle cx={16} cy={150} r={3} fill="var(--iso-dot)" />
      <circle cx={224} cy={150} r={4} fill={RED} stroke="#fff" strokeWidth={1.5} />
    </>
  );
}

const ART: Record<IsoKind, () => ReactNode> = { stack: Stack, flow: Flow, cluster: Cluster, orbit: Orbit };

/** Ilustrasi isometrik garis halus. Dekoratif; makna ada pada judul dan teks kolomnya. */
export function IsoArt({ kind }: { kind: IsoKind }) {
  const Art = ART[kind];
  return (
    <svg className="iso-art" viewBox="0 0 240 260" aria-hidden="true" focusable="false">
      <Art />
    </svg>
  );
}
