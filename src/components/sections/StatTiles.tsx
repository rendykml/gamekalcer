import { SAMPLE_NOTE, stats } from "../../data/sample";

export default function StatTiles() {
  return (
    <section className="sec sec--tight" aria-label="Workspace overview">
      <div className="sec__inner">
        <dl className="stats">
          {stats.map((s) => (
            <div className="stats__tile" key={s.label}>
              <dt>{s.label}</dt>
              <dd className="num">{s.value}</dd>
            </div>
          ))}
        </dl>
        <p className="sec__note">{SAMPLE_NOTE}</p>
      </div>
    </section>
  );
}
