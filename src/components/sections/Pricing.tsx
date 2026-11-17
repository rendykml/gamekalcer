type Tier = {
  name: string;
  price: string;
  note: string;
  features: string[];
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Team",
    price: "[Price]",
    note: "per month",
    features: ["Up to 5 connected sources", "Root-cause trace on every alert", "Email and chat handover"],
  },
  {
    name: "Programme",
    price: "[Price]",
    note: "per month",
    features: [
      "Up to 25 connected sources",
      "Case history with search",
      "Verdict agreement report",
      "Single sign-on",
    ],
    featured: true,
  },
  {
    name: "Estate",
    price: "Quoted",
    note: "for your size",
    features: ["Unlimited sources", "Private deployment option", "Named support contact"],
  },
];

export default function Pricing() {
  return (
    <section className="sec" id="pricing">
      <div className="sec__inner">
        <div className="sec__head">
          <h2>Priced by connected source, never by analyst seat.</h2>
          <p>Add as many analysts as you need. The price follows the sources you connect.</p>
        </div>

        <div className="tiers">
          {tiers.map((t) => (
            <article className={t.featured ? "tier tier--featured" : "tier"} key={t.name}>
              <h3>{t.name}</h3>
              <p className="tier__price num">
                {t.price} <span>{t.note}</span>
              </p>
              <ul>
                {t.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a className={t.featured ? "tier__cta tier__cta--light" : "tier__cta"} href="#demo">
                Book a demo
              </a>
            </article>
          ))}
        </div>
        <p className="sec__note">Prices are placeholders. Replace [Price] with your own.</p>
      </div>
    </section>
  );
}
