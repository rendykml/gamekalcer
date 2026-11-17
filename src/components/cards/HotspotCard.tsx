import { useState } from "react";
import type { ReactNode } from "react";

export type Hotspot = {
  id: string;
  /** Position inside the visual, in percent. */
  x: number;
  y: number;
  label: string;
  detail: string;
};

export type HotspotCardProps = {
  title: string;
  visual: ReactNode;
  hotspots: Hotspot[];
};

export default function HotspotCard({ title, visual, hotspots }: HotspotCardProps) {
  const [active, setActive] = useState<string>(hotspots[0]?.id ?? "");

  return (
    <article className="hcard">
      <div className="hcard__visual">
        {visual}
        {hotspots.map((h, i) => (
          <button
            key={h.id}
            type="button"
            className={h.id === active ? "hcard__pin is-active" : "hcard__pin"}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            aria-pressed={h.id === active}
            aria-label={`Step ${i + 1}: ${h.label}`}
            onClick={() => setActive(h.id)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="hcard__body">
        <h3>{title}</h3>
        <ul className="hcard__list">
          {hotspots.map((h, i) => {
            const open = h.id === active;
            return (
              <li key={h.id}>
                <button
                  type="button"
                  className={open ? "hcard__row is-open" : "hcard__row"}
                  aria-expanded={open}
                  onClick={() => setActive(h.id)}
                >
                  <span className="hcard__index num">{i + 1}</span>
                  <span className="hcard__text">
                    <span className="hcard__label">{h.label}</span>
                    {open && <span className="hcard__detail">{h.detail}</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
