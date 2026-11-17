import SourceCard from "../cards/SourceCard";
import type { SourceCardProps } from "../cards/SourceCard";

const cards: SourceCardProps[] = [
  {
    name: "Identity provider",
    kind: "Sign-ins",
    description: "Sign-ins, token grants and role changes, read as they happen.",
    meta: "Usually connected in 10 minutes",
    href: "#demo",
    tone: "indigo",
  },
  {
    name: "Cloud account",
    kind: "Control plane",
    description: "API calls, storage access and new keys across every region.",
    meta: "Read-only role, no agents",
    href: "#demo",
    tone: "blue",
  },
  {
    name: "Endpoint fleet",
    kind: "Devices",
    description: "Process starts and file writes from the tools you already run.",
    meta: "Works beside your current agent",
    href: "#demo",
    tone: "ink",
  },
];

export default function Integrations() {
  return (
    <section className="sec" id="integrations">
      <div className="sec__inner">
        <div className="sec__head">
          <h2>Pick a source to start from.</h2>
          <p>
            Begin with the one that hurts most. Each source works on its own, and each one you add
            makes the others sharper.
          </p>
        </div>
        <div className="cards">
          {cards.map((c) => (
            <SourceCard key={c.name} {...c} />
          ))}
        </div>
        <p className="sec__note">Photos can be added per card with the imageSrc prop.</p>
      </div>
    </section>
  );
}
