import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { Icon, type IconName } from '@/components/Icon';
import './button.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'dark';
type Size = 'sm' | 'md' | 'lg';

interface VisualProps {
  /** primary = merah (CTA utama), secondary = biru, ghost = garis. */
  variant?: Variant;
  size?: Size;
  trailingIcon?: IconName;
  children: ReactNode;
}

type ButtonProps = VisualProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    loading?: boolean;
  };

export function Button({
  variant = 'primary',
  size = 'md',
  trailingIcon,
  loading = false,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx('btn', `btn--${variant}`, `btn--${size}`, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      <span>{loading ? 'Memproses…' : children}</span>
      {trailingIcon && !loading ? <Icon name={trailingIcon} size={18} /> : null}
    </button>
  );
}

type ButtonLinkProps = VisualProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'>;

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  trailingIcon,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a className={cx('btn', `btn--${variant}`, `btn--${size}`, className)} {...rest}>
      <span>{children}</span>
      {trailingIcon ? <Icon name={trailingIcon} size={18} /> : null}
    </a>
  );
}

type TextLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
  children: ReactNode;
  arrow?: boolean;
};

/** Tautan teks: selalu bergaris bawah, tidak mengandalkan warna saja. */
export function TextLink({ arrow = false, className, children, ...rest }: TextLinkProps) {
  return (
    <a className={cx('text-link', className)} {...rest}>
      <span>{children}</span>
      {arrow ? <Icon name="arrow" size={16} /> : null}
    </a>
  );
}
