import { useEffect, useState } from "react";

export type ArtworkVariant = "mage" | "knight" | "assassin";
type Accent = "violet" | "blue" | "red";

type FeatureImage = {
  label: string;
  detail: string;
  variant: ArtworkVariant;
  accent: Accent;
};

const slides: FeatureImage[][] = [
  [
    { label: "Koleksi skin", detail: "Mage · Epic", variant: "mage", accent: "violet" },
    { label: "Akun pilihan", detail: "Rank · Mythic", variant: "knight", accent: "blue" },
  ],
  [
    { label: "Skin eksklusif", detail: "Fighter · Special", variant: "knight", accent: "red" },
    { label: "Akun kolektor", detail: "Contoh · 126 skin", variant: "mage", accent: "violet" },
  ],
  [
    { label: "Skin favorit", detail: "Assassin · Epic", variant: "assassin", accent: "blue" },
    { label: "Siap push rank", detail: "Contoh · Mythic", variant: "knight", accent: "red" },
  ],
];

export function HeroArtwork({ variant, id }: { variant: ArtworkVariant; id: string }) {
  return (
    <svg className="platform__artwork" viewBox="0 0 360 560" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-sky`} x1="20" y1="0" x2="320" y2="560" gradientUnits="userSpaceOnUse">
          <stop stopColor={variant === "mage" ? "#43316f" : variant === "knight" ? "#203c73" : "#6e3443"} />
          <stop offset="1" stopColor="#080d20" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0" cy="0" r="1" gradientTransform="matrix(0 240 -188 0 180 250)" gradientUnits="userSpaceOnUse">
          <stop stopColor={variant === "mage" ? "#b794ff" : variant === "knight" ? "#76b7ff" : "#ff8b79"} stopOpacity=".78" />
          <stop offset="1" stopColor="#10132f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-armor`} x1="90" y1="190" x2="270" y2="500" gradientUnits="userSpaceOnUse">
          <stop stopColor={variant === "mage" ? "#d9c9ff" : variant === "knight" ? "#c4e7ff" : "#ffc5b0"} />
          <stop offset=".48" stopColor={variant === "mage" ? "#665a9c" : variant === "knight" ? "#496d9d" : "#9b4554"} />
          <stop offset="1" stopColor="#16182f" />
        </linearGradient>
        <linearGradient id={`${id}-cape`} x1="90" y1="225" x2="250" y2="530" gradientUnits="userSpaceOnUse">
          <stop stopColor={variant === "mage" ? "#3d285f" : variant === "knight" ? "#1c3866" : "#63293b"} />
          <stop offset="1" stopColor="#090c1a" />
        </linearGradient>
      </defs>
      <path fill={`url(#${id}-sky)`} d="M0 0h360v560H0z" />
      <path fill={`url(#${id}-glow)`} d="M0 0h360v560H0z" />
      <circle cx="180" cy="225" r="122" stroke="white" strokeOpacity=".15" />
      <circle cx="180" cy="225" r="95" stroke="white" strokeOpacity=".1" />
      <path d="M0 430 84 328l34 42 70-110 81 126 36-49 55 69v154H0V430Z" fill="#080d1b" fillOpacity=".58" />
      <path d="m31 476 93-118 38 47 44-73 128 144" stroke="white" strokeOpacity=".14" />
      <path d="M31 515h298" stroke="white" strokeOpacity=".12" />

      {variant === "mage" && (
        <>
          <path d="M91 561c8-100 31-179 77-226l42-3c45 47 67 132 75 229H91Z" fill={`url(#${id}-cape)`} />
          <path d="m127 337 39-40 51 9 30 55-33 86-69-12-34-49 16-49Z" fill={`url(#${id}-armor)`} stroke="#e1dcff" strokeOpacity=".5" />
          <path d="m164 287-5-38 44-24 38 29-8 43-34 25-35-35Z" fill="#d0bfc7" />
          <path d="m157 263-25-47 20-67 57-28 45 39-10 73-36 38-51-8Z" fill="#201b37" />
          <path d="m152 226-28-63 35-77 61 19 29 73-32 44-65 4Z" fill={`url(#${id}-cape)`} />
          <path d="m155 205 39 13 42-16-16 40-42 14-30-26 7-25Z" fill="#d7ccdd" />
          <path d="m116 351-48 83 21 9 73-72-46-20Zm126 14 53 73-22 13-65-57 34-29Z" fill={`url(#${id}-armor)`} />
          <circle cx="288" cy="343" r="27" fill="#b8a0ff" fillOpacity=".24" stroke="#ded5ff" strokeOpacity=".8" />
          <circle cx="288" cy="343" r="12" fill="#e7dfff" fillOpacity=".8" />
          <path d="M287 301v-18m0 120v-18m42-42h-18m-46 0h-18" stroke="#e5ddff" strokeOpacity=".65" />
        </>
      )}

      {variant === "knight" && (
        <>
          <path d="M78 560c13-96 35-182 76-230h55c45 51 65 134 76 230H78Z" fill={`url(#${id}-cape)`} />
          <path d="m112 350 31-62 39-15 51 25 25 65-42 73-82-9-22-77Z" fill={`url(#${id}-armor)`} stroke="#d7edff" strokeOpacity=".55" />
          <path d="m143 271 2-59 31-38 48 13 24 48-15 59-42 25-48-48Z" fill="#202c49" />
          <path d="m151 246 27-44 38 7 21 35-38 18-48-16Z" fill={`url(#${id}-armor)`} />
          <path d="m176 211 11 34 27 3-14 16h-36l-9-20 21-33Z" fill="#101a30" />
          <path d="m111 352-47 79 25 14 67-71-45-22Zm131 2 52 69-22 20-67-61 37-28Z" fill={`url(#${id}-armor)`} />
          <path d="m254 337 44-169 13 2-23 181-34-14Z" fill="#c6e8ff" />
          <path d="m290 172 15-37 16 42-20 10-11-15Z" fill="#e4f4ff" />
          <path d="m157 321 26 19 32-19m-58 52 39 15 37-19" stroke="#e5f4ff" strokeOpacity=".55" strokeWidth="3" />
        </>
      )}

      {variant === "assassin" && (
        <>
          <path d="M68 560c25-104 49-177 91-231l48 4c43 62 68 139 85 227H68Z" fill={`url(#${id}-cape)`} />
          <path d="m105 355 37-61 43-22 44 31 24 75-43 75-78-15-27-83Z" fill={`url(#${id}-armor)`} stroke="#ffd9d1" strokeOpacity=".48" />
          <path d="m143 279-8-51 28-45 54 4 25 48-25 57-42 21-32-34Z" fill="#30202e" />
          <path d="m144 251 31-44 43 12 20 25-40 16-54-9Z" fill={`url(#${id}-armor)`} />
          <path d="m159 253 22-9 36 11-27 13-31-15Z" fill="#111526" />
          <path d="m111 359-56 68 23 22 81-66-48-24Zm130 8 60 65-23 22-75-59 38-28Z" fill={`url(#${id}-armor)`} />
          <path d="m102 375-44 65m183-65 57 67" stroke="#ffd5ca" strokeOpacity=".75" strokeWidth="5" />
          <path d="m74 444 12 9m200-9-12 9" stroke="#fff1ed" strokeOpacity=".8" strokeWidth="2" />
          <path d="m142 311 31 16 40-17m-58 64 37 15 34-18" stroke="#ffd6ce" strokeOpacity=".5" strokeWidth="3" />
        </>
      )}

      <g fill="white" fillOpacity=".72">
        <circle cx="46" cy="101" r="2" />
        <circle cx="297" cy="119" r="1.5" />
        <circle cx="73" cy="254" r="1.5" />
        <circle cx="319" cy="274" r="2" />
        <circle cx="54" cy="332" r="1" />
      </g>
      <path d="M28 0v560M332 0v560" stroke="white" strokeOpacity=".08" />
    </svg>
  );
}

export default function Platform() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div className="platform">
      <div className="platform__gallery" role="group" aria-label="Contoh visual skin dan akun Mobile Legends">
        {slides[activeIndex].map((image, index) => {
          const artworkId = `hero-art-${activeIndex}-${index}`;
          return (
            <article
              className={`platform__tile platform__tile--${image.accent}`}
              key={`${activeIndex}-${image.label}`}
            >
              <HeroArtwork variant={image.variant} id={artworkId} />
              <div className="platform__tile-info">
                <span>{image.detail}</span>
                <h2>{image.label}</h2>
              </div>
              <span className="platform__tile-index">0{index + 1}</span>
            </article>
          );
        })}
      </div>
      <div className="platform__gallery-footer">
        <p> listing akun aktif</p>
        <div className="platform__controls" role="group" aria-label="Kontrol gambar pilihan">
          <button
            className="platform__pause"
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Lanjutkan pergantian gambar" : "Jeda pergantian gambar"}
            title={paused ? "Lanjutkan" : "Jeda"}
          >
            {paused ? <span className="platform__play-icon" /> : <span className="platform__pause-icon" />}
          </button>
          {slides.map((slide, index) => (
            <button
              className={`platform__slide-dot${activeIndex === index ? " is-active" : ""}`}
              type="button"
              key={slide[0].label}
              onClick={() => setActiveIndex(index)}
              aria-label={`Tampilkan pilihan gambar ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
            />
          ))}
          <span className="platform__rotate-label">FAVORIT ACCOUNT</span>
        </div>
      </div>
    </div>
  );
}
