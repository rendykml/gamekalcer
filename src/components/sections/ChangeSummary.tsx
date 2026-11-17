import { changeGroups, SAMPLE_NOTE } from "../../data/sample";

export default function ChangeSummary() {
  return (
    <section className="sec" id="changes">
      <div className="sec__inner">
        <div className="sec__head">
          <h2>What changed since last Tuesday.</h2>
          <p>One screen for the handover. Nothing to dig for before the morning stand-up.</p>
        </div>

        <div className="changes">
          {changeGroups.map((g, gi) => (
            <section className="changes__group" key={g.title} aria-labelledby={`chg-${gi}`}>
              <h3 id={`chg-${gi}`}>
                {g.title} <span className="num">{g.items.length}</span>
              </h3>
              <ul>
                {g.items.map((it) => (
                  <li key={it.text}>
                    <span>{it.text}</span>
                    <span className="changes__ref">{it.ref}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="sec__note">{SAMPLE_NOTE}</p>
      </div>
    </section>
  );
}
