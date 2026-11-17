# Vigil Landing Page

Landing page built with Vite, React 18 and TypeScript.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
```

## Structure

```
src/
  App.tsx                      page composition
  index.css                    hero, nav and feature styles
  styles/
    typography.css             font and type-scale tokens (see TYPOGRAPHY.md)
    sections.css               styles for everything below the feature grid
  data/sample.ts               generated demo figures, replace before launch
  components/
    Nav, Hero, Platform, Features, Illustrations
    sections/                  the 8 sections + extras
      StatTiles                1  hero figures
      SourceLayers             2  toggleable sources
      Precision                3  large figure and comparison
      TraceCut                 4  draggable cut through an incident
      ChangeSummary            5  what changed since last week
      IncidentLog              6  table of cases
      Pricing                  7  three tiers, prices are placeholders
      DemoForm                 8  demo request, takes an onSubmit prop
      Integrations, Walkthrough, Footer
    cards/
      SourceCard               image-led card, optional imageSrc
      HotspotCard              image with numbered pins and a step list
```

## Before launch

- Replace the figures in `src/data/sample.ts` and the `[Price]` placeholders in `Pricing.tsx`.
- Pass an `onSubmit` handler to `DemoForm`. Without one it says it is not connected.
- Add real photos to `SourceCard` through `imageSrc` if you want them.
- The brand name and customer names are placeholders.
