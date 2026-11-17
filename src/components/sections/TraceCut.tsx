import { useState } from "react";
import { traceEvents } from "../../data/sample";

const START_HOUR = 14;
const LAST = traceEvents[traceEvents.length - 1].t;

function clock(minutes: number) {
  return `${START_HOUR}:${String(minutes).padStart(2, "0")}`;
}

export default function TraceCut() {
  const [cut, setCut] = useState(27);
  const reached = traceEvents.filter((e) => e.t <= cut);

  return (
    <section className="sec sec--white" id="trace">
      <div className="sec__inner">
        <div className="sec__head">
          <h2>Cut anywhere. Read every step.</h2>
          <p>
            Drag the cut to any minute of an incident. You see what Vigil knew at that moment,
            and what it had not yet seen.
          </p>
        </div>

        <div className="cut">
          <div className="cut__control">
            <label htmlFor="cut-range">Cut at</label>
            <input
              id="cut-range"
              type="range"
              min={0}
              max={LAST}
              step={1}
              value={cut}
              aria-valuetext={`${clock(cut)}, ${reached.length} of ${traceEvents.length} steps seen`}
              onChange={(e) => setCut(Number(e.target.value))}
            />
            <output className="data" htmlFor="cut-range">
              {clock(cut)}
            </output>
          </div>

          <ol className="cut__list">
            {traceEvents.map((e) => {
              const seen = e.t <= cut;
              return (
                <li key={e.t} className={seen ? "cut__item is-seen" : "cut__item"}>
                  <span className="cut__time data">{clock(e.t)}</span>
                  <span className="cut__body">
                    <span className="cut__label">{e.label}</span>
                    <span className="cut__detail">
                      {seen ? e.detail : "Not seen yet at this cut"}
                    </span>
                  </span>
                  <span className="cut__source">{e.source}</span>
                </li>
              );
            })}
          </ol>
          <p className="cut__readout" aria-live="polite">
            {reached.length} of {traceEvents.length} steps seen at {clock(cut)}.
          </p>
        </div>
      </div>
    </section>
  );
}
