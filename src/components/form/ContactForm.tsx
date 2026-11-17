import { useRef, useState, type FormEvent } from 'react';
import { Button } from '@/components/button/Button';
import { Checkbox, Field, Input, Segmented, Select, Textarea } from './Fields';
import './form.css';

export interface ContactValues {
  name: string;
  email: string;
  company: string;
  sites: string;
  channel: string;
  message: string;
  consent: boolean;
}

type Errors = Partial<Record<keyof ContactValues, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'failed';

interface ContactFormProps {
  /**
   * Wajib. Formulir hanya menampilkan "terkirim" setelah promise ini selesai,
   * dan menampilkan galat jika promise ditolak. Tidak ada keberhasilan palsu.
   */
  onSubmit: (values: ContactValues) => Promise<void>;
  sentMessage: string;
  failedMessage?: string;
}

const EMPTY: ContactValues = {
  name: '',
  email: '',
  company: '',
  sites: '',
  channel: 'email',
  message: '',
  consent: false,
};

function validate(v: ContactValues): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = 'Tulis nama Anda agar kami tahu siapa yang dihubungi.';
  if (!v.email.trim()) e.email = 'Tulis alamat email kerja, misalnya nama@perusahaan.id.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Alamat email belum lengkap. Periksa tanda @ dan domainnya.';
  if (!v.sites) e.sites = 'Pilih perkiraan jumlah lokasi aktif.';
  if (!v.consent) e.consent = 'Centang persetujuan agar kami boleh membalas pesan ini.';
  return e;
}

export function ContactForm({ onSubmit, sentMessage, failedMessage }: ContactFormProps) {
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const summaryRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof ContactValues>(key: K, val: ContactValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus('idle');
      // beri waktu render ringkasan galat sebelum fokus dipindahkan
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus('sending');
    try {
      await onSubmit(values);
      setStatus('sent');
      setValues(EMPTY);
    } catch {
      setStatus('failed');
    }
  };

  const errorList = Object.values(errors);

  if (status === 'sent') {
    return (
      <div className="form-done" role="status">
        <h3>Pesan diterima</h3>
        <p>{sentMessage}</p>
        <Button variant="ghost" onClick={() => setStatus('idle')}>
          Kirim pesan lain
        </Button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {errorList.length > 0 ? (
        <div ref={summaryRef} className="form__summary" role="alert" tabIndex={-1}>
          <p>Ada {errorList.length} isian yang perlu diperbaiki:</p>
          <ul>
            {errorList.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {status === 'failed' ? (
        <div className="form__summary" role="alert">
          <p>{failedMessage ?? 'Pesan belum terkirim. Isian Anda masih tersimpan di formulir, silakan coba lagi.'}</p>
        </div>
      ) : null}

      <div className="form__grid">
        <Field label="Nama" required error={errors.name}>
          {(c) => (
            <Input {...c} name="name" autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} />
          )}
        </Field>

        <Field label="Email kerja" required error={errors.email}>
          {(c) => (
            <Input
              {...c}
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              value={values.email}
              onChange={(e) => set('email', e.target.value)}
            />
          )}
        </Field>

        <Field label="Perusahaan">
          {(c) => (
            <Input {...c} name="company" autoComplete="organization" value={values.company} onChange={(e) => set('company', e.target.value)} />
          )}
        </Field>

        <Field label="Lokasi aktif" required error={errors.sites}>
          {(c) => (
            <Select
              {...c}
              name="sites"
              placeholder="Pilih jumlah"
              value={values.sites}
              onChange={(e) => set('sites', e.target.value)}
              options={[
                { value: '1', label: 'Satu lokasi' },
                { value: '2-6', label: 'Dua sampai enam' },
                { value: '7-12', label: 'Tujuh sampai dua belas' },
                { value: '12+', label: 'Lebih dari dua belas' },
              ]}
            />
          )}
        </Field>
      </div>

      <Segmented
        legend="Balas lewat"
        name="channel"
        value={values.channel}
        onChange={(v) => set('channel', v)}
        options={[
          { value: 'email', label: 'Email' },
          { value: 'phone', label: 'Telepon' },
        ]}
      />

      <Field label="Pesan" hint="Ceritakan satu lokasi dan satu pengukuran yang ingin dicek ulang.">
        {(c) => (
          <Textarea {...c} name="message" value={values.message} onChange={(e) => set('message', e.target.value)} />
        )}
      </Field>

      <div className="field">
        <Checkbox
          name="consent"
          checked={values.consent}
          onChange={(e) => set('consent', e.target.checked)}
          aria-invalid={errors.consent ? true : undefined}
          label="Saya setuju dihubungi mengenai pesan ini."
        />
      </div>

      <div className="form__actions">
        <Button type="submit" size="lg" loading={status === 'sending'}>
          Kirim pesan
        </Button>
        <p className="form__note">Kami membalas dalam satu hari kerja.</p>
      </div>
    </form>
  );
}
