import HotspotCard from "../cards/HotspotCard";
import type { Hotspot } from "../cards/HotspotCard";
import { TraceIllustration } from "../Illustrations";

// Pin positions match the four slabs in TraceIllustration (viewBox 180 x 240).
const hotspots: Hotspot[] = [
  {
    id: "signin",
    x: 39,
    y: 21,
    label: "Sign-in from a new country",
    detail: "The first sign of trouble. A valid password with no history from this region.",
  },
  {
    id: "token",
    x: 67,
    y: 40,
    label: "Token granted to an unfamiliar app",
    detail: "Mail and file scopes approved in one prompt, minutes after the sign-in.",
  },
  {
    id: "rule",
    x: 33,
    y: 62,
    label: "Mailbox rule hides replies",
    detail: "Replies from finance were moved to a folder the owner never opens.",
  },
  {
    id: "read",
    x: 58,
    y: 79,
    label: "Bulk read of the exports folder",
    detail: "41 files read in under a minute with the same token.",
  },
];

export default function Walkthrough() {
  return (
    <section className="sec sec--white" id="walkthrough">
      <div className="sec__inner walk">
        <div className="sec__head">
          <h2>Follow one incident from the first signal.</h2>
          <p>
            Tap a point to read what Vigil saw there. The same path is what your analyst receives,
            already ordered.
          </p>
        </div>
        <HotspotCard
          title="Case 214, stolen session token"
          visual={<TraceIllustration maxWidth={260} />}
          hotspots={hotspots}
        />
      </div>
    </section>
  );
}
