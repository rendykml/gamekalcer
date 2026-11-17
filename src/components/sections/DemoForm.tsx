import { useState } from "react";
import type { FormEvent } from "react";

export type DemoRequest = {
  name: string;
  email: string;
  company: string;
  sources: string;
};

type Status = "idle" | "sending" | "sent" | "error" | "unconnected";

const messages: Record<Status, string> = {
  idle: "",
  sending: "Sending your request…",
  sent: "Request received. We will reply from a person, not a bot.",
  error: "The request did not go through. Check your connection and try again.",
  unconnected:
    "This form is not connected to a server yet. Pass an onSubmit handler to DemoForm to send requests.",
};

export default function DemoForm({
  onSubmit,
}: {
  onSubmit?: (data: DemoRequest) => Promise<void>;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const data: DemoRequest = {
      name: String(f.get("name") ?? ""),
      email: String(f.get("email") ?? ""),
      company: String(f.get("company") ?? ""),
      sources: String(f.get("sources") ?? ""),
    };

    if (!onSubmit) {
      setStatus("unconnected");
      return;
    }
    setStatus("sending");
    try {
      await onSubmit(data);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="sec sec--white" id="demo">
      <div className="sec__inner demo">
        <div className="sec__head">
          <h2>See your own sources in Vigil.</h2>
          <p>
            Tell us what you run today. We set up a sandbox with your source types and walk
            through a real case with you. We do not store your data after the call.
          </p>
        </div>

        <form className="form" onSubmit={handle} noValidate={false}>
          <div className="form__field">
            <label htmlFor="demo-name">Name</label>
            <input id="demo-name" name="name" type="text" autoComplete="name" required />
          </div>
          <div className="form__field">
            <label htmlFor="demo-email">Work email</label>
            <input id="demo-email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="form__field">
            <label htmlFor="demo-company">Company</label>
            <input id="demo-company" name="company" type="text" autoComplete="organization" required />
          </div>
          <div className="form__field">
            <label htmlFor="demo-sources">Sources you would connect</label>
            <select id="demo-sources" name="sources" defaultValue="1-5">
              <option value="1-5">1 to 5</option>
              <option value="6-25">6 to 25</option>
              <option value="25+">More than 25</option>
            </select>
          </div>
          <div className="form__actions">
            <button className="btn-ink" type="submit" disabled={status === "sending"}>
              Book a demo
            </button>
            <p className="form__status" role="status">
              {messages[status]}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
