import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { cx } from '@/lib/cx';
import { Icon } from '@/components/Icon';
import './form.css';

/* ---------- Field: label, petunjuk, pesan galat ---------- */

interface ControlProps {
  id: string;
  'aria-describedby'?: string;
  'aria-invalid'?: true;
  required?: boolean;
}

interface FieldProps {
  label: string;
  hint?: string;
  /** Pesan galat. Ditulis sebagai kalimat yang menyebut cara memperbaiki. */
  error?: string;
  required?: boolean;
  children: (control: ControlProps) => ReactNode;
}

export function Field({ label, hint, error, required, children }: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-err` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cx('field', error && 'has-error')}>
      <label htmlFor={id}>
        {label}
        {required ? <span className="field__req"> (wajib)</span> : null}
      </label>
      {hint ? (
        <p id={hintId} className="field__hint">
          {hint}
        </p>
      ) : null}
      {children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined, required })}
      {error ? (
        <p id={errorId} className="field__error">
          <Icon name="close" size={16} />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}

/* ---------- Kontrol ---------- */

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cx('control', className)} {...rest} />;
}

export function Textarea({ className, rows = 4, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cx('control', 'control--area', className)} rows={rows} {...rest} />;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({ options, placeholder, className, ...rest }: SelectProps) {
  return (
    <span className="select">
      <select className={cx('control', className)} {...rest}>
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Icon name="chevron" size={20} />
    </span>
  );
}

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
}

export function Checkbox({ label, className, ...rest }: CheckboxProps) {
  return (
    <label className={cx('check', className)}>
      <input type="checkbox" {...rest} />
      <span className="check__box" aria-hidden="true">
        <Icon name="check" size={16} />
      </span>
      <span>{label}</span>
    </label>
  );
}

/* ---------- Pilihan segmen (radio) ---------- */

interface SegmentedProps {
  legend: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function Segmented({ legend, name, options, value, onChange }: SegmentedProps) {
  return (
    <fieldset className="seg">
      <legend>{legend}</legend>
      <div className="seg__row">
        {options.map((o) => (
          <label key={o.value} className={cx('seg__opt', value === o.value && 'is-on')}>
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
