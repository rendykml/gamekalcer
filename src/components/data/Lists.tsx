import { useId, useState, type ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { Icon } from '@/components/Icon';
import './data.css';

/* ---------- Daftar lapisan (kotak centang dengan hitungan) ---------- */

export interface LayerItem {
  id: string;
  label: string;
  description: string;
  count: number;
}

interface LayerListProps {
  legend: string;
  items: LayerItem[];
  value: Record<string, boolean>;
  onChange: (id: string, checked: boolean) => void;
}

const compact = new Intl.NumberFormat('id-ID', { notation: 'compact', maximumFractionDigits: 1 });

export function LayerList({ legend, items, value, onChange }: LayerListProps) {
  const max = Math.max(...items.map((i) => i.count));
  return (
    <fieldset className="layers">
      <legend className="visually-hidden">{legend}</legend>
      {items.map((item) => {
        const checked = value[item.id] ?? false;
        return (
          <label key={item.id} className={cx('layers__row', checked && 'is-on')}>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => onChange(item.id, e.target.checked)}
            />
            <span className="layers__box" aria-hidden="true">
              <Icon name="check" size={16} />
            </span>
            <span className="layers__text">
              <strong>{item.label}</strong>
              <span>{item.description}</span>
            </span>
            <span className="layers__count num">{compact.format(item.count)}</span>
            <span className="layers__bar" aria-hidden="true">
              <span style={{ width: `${(item.count / max) * 100}%` }} />
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}

/* ---------- Daftar deskripsi (label dan nilai) ---------- */

export interface DescriptionItem {
  term: string;
  detail: ReactNode;
}

export function DescriptionList({ items }: { items: DescriptionItem[] }) {
  return (
    <dl className="deflist">
      {items.map((i) => (
        <div key={i.term}>
          <dt>{i.term}</dt>
          <dd className="num">{i.detail}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- Akordeon ---------- */

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** single: satu panel terbuka; multiple: bebas. */
  mode?: 'single' | 'multiple';
  defaultOpen?: string[];
}

export function Accordion({ items, mode = 'single', defaultOpen = [] }: AccordionProps) {
  const base = useId();
  const [open, setOpen] = useState<string[]>(defaultOpen);

  const toggle = (id: string) => {
    setOpen((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      return mode === 'single' ? [id] : [...prev, id];
    });
  };

  return (
    <div className="acc">
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const btnId = `${base}-${item.id}-btn`;
        const panelId = `${base}-${item.id}-panel`;
        return (
          <section key={item.id} className={cx('acc__item', isOpen && 'is-open')}>
            <h3>
              <button
                type="button"
                id={btnId}
                className="acc__btn"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span>{item.title}</span>
                <Icon name="chevron" size={22} />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className="acc__panel">
              <div>
                <div className="acc__content">{item.content}</div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
