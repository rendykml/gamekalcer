import { IsoArt, type IsoKind } from './IsoArt';
import './feature.css';

export interface FeatureItem {
  tag: string;
  title: string;
  text: string;
  art: IsoKind;
}

interface FeatureGridProps {
  items: FeatureItem[];
}

/** Empat kolom berbingkai garis rambut, tiap kolom satu ilustrasi dan satu gagasan. */
export function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <ul className="features">
      {items.map((item) => (
        <li key={item.tag} className="feature">
          <p className="feature__tag num">{item.tag}</p>
          <div className="feature__art">
            <IsoArt kind={item.art} />
          </div>
          <div className="feature__text">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
