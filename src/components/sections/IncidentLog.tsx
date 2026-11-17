import { logRows, SAMPLE_NOTE } from "../../data/sample";

export default function IncidentLog() {
  return (
    <section className="sec sec--white" id="log">
      <div className="sec__inner">
        <div className="sec__head">
          <h2>Every case kept, every cause named.</h2>
          <p>
            Closed cases stay searchable with the root cause attached, so the next similar alert
            starts from an answer.
          </p>
        </div>

        <div className="log" role="region" aria-label="Recent cases" tabIndex={0}>
          <table>
            <caption className="visually-hidden">Most recent cases, newest first</caption>
            <thead>
              <tr>
                <th scope="col">Case</th>
                <th scope="col">Opened</th>
                <th scope="col">Source</th>
                <th scope="col">Root cause</th>
                <th scope="col" className="log__right">Time to cause</th>
                <th scope="col">Verdict</th>
              </tr>
            </thead>
            <tbody>
              {logRows.map((r) => (
                <tr key={r.id}>
                  <th scope="row" className="data">{r.id}</th>
                  <td>{r.opened}</td>
                  <td>{r.source}</td>
                  <td>{r.cause}</td>
                  <td className="data log__right">{r.time}</td>
                  <td>
                    <span className={r.verdict === "Real threat" ? "chip chip--threat" : "chip"}>
                      {r.verdict}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="sec__note">{SAMPLE_NOTE}</p>
      </div>
    </section>
  );
}
