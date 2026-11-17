import { SAMPLE_NOTE } from "../../data/sample";

const comparison = [
  { label: "Rules only", value: 61, strong: false },
  { label: "Vigil", value: 94, strong: true },
];

export default function Precision() {
  return (
    <section className="sec" id="security">
      <div className="sec__inner precision">
        <div className="sec__head">
          <h2>Checked against your analysts, every time.</h2>
          <p>
            Each verdict is compared with what your team decided. A source needs 20 reviewed
            cases before its number is shown.
          </p>
        </div>

        <div className="precision__figure">
          <p className="precision__big num">
            94<span>%</span>
          </p>
          <p className="precision__caption">of verdicts your analysts agreed with, last 30 days</p>

          <ul className="precision__bars">
            {comparison.map((c) => (
              <li key={c.label}>
                <span className="precision__label">{c.label}</span>
                <span className="precision__track">
                  <span
                    className={c.strong ? "precision__fill precision__fill--strong" : "precision__fill"}
                    style={{ width: `${c.value}%` }}
                  />
                </span>
                <span className="precision__value num">{c.value}%</span>
              </li>
            ))}
          </ul>
          <p className="sec__note">{SAMPLE_NOTE}</p>
        </div>
      </div>
    </section>
  );
}
