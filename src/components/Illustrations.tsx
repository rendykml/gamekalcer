import type { ReactNode } from "react";

type SlabProps = {
  cx: number;
  cy: number;
  hw: number;
  hh: number;
  t: number;
  top?: string;
  left?: string;
  right?: string;
};

/** One isometric slab: a diamond top plus two side faces. */
function Slab({
  cx,
  cy,
  hw,
  hh,
  t,
  top = "#f7f8fe",
  left = "#dfe4f6",
  right = "#cfd6ee",
}: SlabProps) {
  const topPts = `${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`;
  const leftPts = `${cx - hw},${cy} ${cx},${cy + hh} ${cx},${cy + hh + t} ${cx - hw},${cy + t}`;
  const rightPts = `${cx},${cy + hh} ${cx + hw},${cy} ${cx + hw},${cy + t} ${cx},${cy + hh + t}`;
  return (
    <>
      <polygon points={topPts} fill={top} />
      <polygon points={leftPts} fill={left} />
      <polygon points={rightPts} fill={right} />
    </>
  );
}

function Dots({ points, r, fill }: { points: [number, number][]; r: number; fill: string }) {
  return (
    <g fill={fill} stroke="none">
      {points.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
      ))}
    </g>
  );
}

function Frame({
  label,
  viewBox = "0 0 180 240",
  maxWidth = 200,
  children,
}: {
  label: string;
  viewBox?: string;
  maxWidth?: number;
  children: ReactNode;
}) {
  return (
    <svg
      className="illustration"
      viewBox={viewBox}
      role="img"
      aria-label={label}
      style={{ maxWidth }}
      stroke="#2b2f45"
      strokeWidth="0.8"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const BLUE = "#3b6bff";
const BLUE_SOFT = "#cddcfb";

export function LayersIllustration() {
  return (
    <Frame label="Five stacked layers">
      {[165, 130, 95].map((cy) => (
        <Slab key={cy} cx={90} cy={cy} hw={56} hh={22} t={9} top="#eef1fb" />
      ))}
      <Slab cx={90} cy={60} hw={56} hh={22} t={9} />
      <ellipse cx="90" cy="60" rx="28" ry="11" fill={BLUE_SOFT} stroke="none" />
      <Dots
        r={1.5}
        fill={BLUE}
        points={[
          [80, 60],
          [90, 60],
          [100, 60],
          [85, 55.5],
          [95, 55.5],
          [85, 64.5],
          [95, 64.5],
        ]}
      />
    </Frame>
  );
}

export function TraceIllustration({ maxWidth = 200 }: { maxWidth?: number }) {
  return (
    <Frame label="Linked nodes tracing an alert to its cause" maxWidth={maxWidth}>
      <g stroke="#9aa3c7" strokeDasharray="2 3" fill="none">
        <path d="M34 57 V157" />
        <path d="M106 57 V100" />
        <path d="M156 102 V190" />
      </g>
      <Slab cx={70} cy={50} hw={36} hh={14} t={7} />
      <Slab cx={120} cy={95} hw={36} hh={14} t={7} />
      <Slab cx={60} cy={150} hw={36} hh={14} t={7} top="#d9dcea" left="#c4c9de" right="#b5bbd5" />
      <g fill="none" stroke={BLUE} strokeWidth="1.1">
        <polyline points="70,56 96,70 96,98 120,95" />
        <polyline points="120,102 120,126 60,150" />
        <polyline points="60,156 82,170 105,190" />
      </g>
      <Slab cx={105} cy={190} hw={36} hh={14} t={7} />
      <ellipse cx="105" cy="190" rx="14" ry="5.5" fill={BLUE_SOFT} stroke="none" />
      <circle cx="105" cy="190" r="1.6" fill={BLUE} stroke="none" />
    </Frame>
  );
}

const CUBES: [number, number][] = [
  [90, 40],
  [112, 50],
  [134, 60],
  [156, 70],
  [68, 50],
  [90, 60],
  [112, 70],
  [134, 80],
  [46, 60],
  [68, 70],
  [90, 80],
  [112, 90],
];

export function FunnelIllustration() {
  return (
    <Frame label="Many small signals funnelled into one block">
      <polygon points="90,115 160,145 90,175 20,145" fill="#f4f6fd" />
      <polygon points="20,145 90,175 90,220 20,190" fill="#e3e7f7" />
      <polygon points="90,175 160,145 160,190 90,220" fill="#d3d9ef" />
      <ellipse cx="90" cy="145" rx="32" ry="13" fill={BLUE_SOFT} stroke="none" />
      <circle cx="90" cy="145" r="2" fill={BLUE} stroke="none" />
      <g fill="#fff">
        {[...CUBES, [90, 124] as [number, number]].map(([x, y]) => (
          <path
            key={`${x}-${y}`}
            d={`M${x - 10} ${y} L${x} ${y - 4} L${x + 10} ${y} L${x + 10} ${y + 6} L${x} ${y + 10} L${x - 10} ${y + 6} Z`}
          />
        ))}
      </g>
    </Frame>
  );
}

export function LoopIllustration() {
  const dots: [number, number][] = [
    [94, 40],
    [100, 40],
    [106, 40],
    [97, 36.5],
    [103, 36.5],
    [94, 85],
    [100, 85],
    [106, 85],
    [97, 81.5],
    [103, 81.5],
  ];
  return (
    <Frame label="A feedback loop around stacked layers" viewBox="0 0 200 240" maxWidth={220}>
      <ellipse cx="100" cy="150" rx="92" ry="36" fill="none" stroke="#8a92b8" />
      <circle cx="8" cy="150" r="3" fill={BLUE} stroke="none" />
      <circle cx="192" cy="150" r="3" fill={BLUE} stroke="none" />
      <g stroke="#9aa3c7" strokeDasharray="2 3" fill="none">
        <path d="M70 46 V150" />
        <path d="M130 46 V150" />
      </g>
      <Slab cx={100} cy={170} hw={70} hh={28} t={12} top="#eef1fb" />
      <Dots
        r={1.4}
        fill="#9aa8d8"
        points={[
          [86, 170],
          [100, 170],
          [114, 170],
          [93, 163],
          [107, 163],
          [93, 177],
          [107, 177],
        ]}
      />
      <Slab cx={100} cy={85} hw={30} hh={12} t={6} />
      <Slab cx={100} cy={40} hw={30} hh={12} t={6} />
      <Dots r={1.3} fill={BLUE} points={dots} />
    </Frame>
  );
}
