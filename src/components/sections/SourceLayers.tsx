import { useState } from "react";
import { sources } from "../../data/sample";

const SEGMENT_COLORS = ["#1f3fd6", "#4f7cf5", "#8fb0ff", "#c9d8fc"];

export default function SourceLayers() {
  const [on, setOn] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sources.map((s) => [s.id, true])),
  );

  const visible = sources.filter((s) => on[s.id]);
  const total = visible.reduce((sum, s) => sum + s.events, 0);

  return (
    <section className="sec sec--white" id="layers">
      <div className="sec__inner">
        <div className="sec__head">
          <h2>Hide what you are not investigating.</h2>
          <p>
            Turn a source off and it drops out of the count and the timeline. Your analysts see
            only the signals they are working on.
          </p>
        </div>

        <div className="layers">
          <fieldset className="layers__list">
            <legend className="visually-hidden">Signal sources</legend>
            {sources.map((s, i) => (
              <label className="layers__row" key={s.id} htmlFor={`src-${s.id}`}>
                <input
                  id={`src-${s.id}`}
                  type="checkbox"
                  checked={on[s.id]}
                  onChange={(e) => setOn((prev) => ({ ...prev, [s.id]: e.target.checked }))}
                />
                <span
                  className="layers__swatch"
                  style={{ background: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }}
                  aria-hidden="true"
                />
                <span className="layers__text">
                  <span className="layers__name">{s.label}</span>
                  <span className="layers__detail">{s.detail}</span>
                </span>
                <span className="layers__count num">{s.events.toLocaleString("en-US")}</span>
              </label>
            ))}
          </fieldset>

          <div className="layers__panel">
            <p className="layers__total num" aria-live="polite">
              {total.toLocaleString("en-US")}
              <span> events in view</span>
            </p>
            <div className="layers__bar" role="img" aria-label="Share of events by source">
              {visible.map((s) => (
                <span
                  key={s.id}
                  style={{
                    width: `${(s.events / total) * 100}%`,
                    background: SEGMENT_COLORS[sources.indexOf(s) % SEGMENT_COLORS.length],
                  }}
                />
              ))}
            </div>
            <p className="layers__caption">
              {visible.length === 0
                ? "Nothing selected. Turn a source back on to see events."
                : `${visible.length} of ${sources.length} sources shown, last 24 hours.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
