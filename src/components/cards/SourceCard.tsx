export type SourceCardProps = {
  name: string;
  kind: string;
  description: string;
  meta: string;
  href: string;
  tone: "ink" | "blue" | "indigo";
  /** Optional photo or screenshot. Without it the card shows a drawn glyph. */
  imageSrc?: string;
  imageAlt?: string;
};

function Glyph() {
  return (
    <svg className="scard__glyph" viewBox="0 0 160 120" fill="none" aria-hidden="true">
      <polygon points="80,18 140,44 80,70 20,44" stroke="rgba(255,255,255,0.55)" strokeWidth="1" />
      <polygon points="80,38 140,64 80,90 20,64" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <polygon points="80,58 140,84 80,110 20,84" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <circle cx="80" cy="44" r="3" fill="#fff" />
    </svg>
  );
}

export default function SourceCard({
  name,
  kind,
  description,
  meta,
  href,
  tone,
  imageSrc,
  imageAlt = "",
}: SourceCardProps) {
  return (
    <a className={`scard scard--${tone}`} href={href}>
      <span className="scard__media" aria-hidden={imageSrc ? undefined : true}>
        {imageSrc ? <img src={imageSrc} alt={imageAlt} loading="lazy" /> : <Glyph />}
      </span>
      <span className="scard__shade" aria-hidden="true" />

      <span className="scard__tag">{kind}</span>
      <span className="scard__go" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M4 12L12 4M6 4h6v6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span className="scard__body">
        <span className="scard__name">{name}</span>
        <span className="scard__desc">{description}</span>
        <span className="scard__meta num">{meta}</span>
      </span>
    </a>
  );
}
