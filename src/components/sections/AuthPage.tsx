import { useState, type FormEvent } from "react";
import "./AuthPage.css";

type AuthMode = "login" | "signup";

function BrandMark() {
  return (
    <svg viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <path
        d="M13 2 22 7.5v11L13 24l-9-5.5v-11L13 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="13" cy="13" r="3.2" fill="currentColor" />
    </svg>
  );
}

export default function AuthPage({
  mode,
  onModeChange,
}: {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");
  const isSignup = mode === "signup";

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(`${isSignup ? "Pendaftaran" : "Login"} belum terhubung. Fitur akun akan tersedia setelah layanan autentikasi siap.`);
  }

  function changeMode(nextMode: AuthMode) {
    setNotice("");
    onModeChange(nextMode);
  }

  return (
    <main className="auth-page">
      <section className="auth-shell" aria-label="Akses akun GameKalcer">
        <aside className="auth-showcase">
          <div className="auth-showcase__art" aria-hidden="true">
            <span className="auth-art__glow" />
            <span className="auth-art__ribbon auth-art__ribbon--one" />
            <span className="auth-art__ribbon auth-art__ribbon--two" />
            <span className="auth-art__ribbon auth-art__ribbon--three" />
            <span className="auth-art__grid" />
          </div>

          <a className="auth-brand auth-brand--showcase" href="/" aria-label="GameKalcer, kembali ke beranda">
            <BrandMark />
            <span>GameKalcer</span>
          </a>

          <div className="auth-showcase__copy">
            <h1>Temukan akun yang cocok untuk caramu bermain.</h1>
            <p>
              Jelajahi katalog akun Mobile Legends. Masuk atau daftar untuk membuat akun publik.
            </p>
            <div className="auth-showcase__note">
              <span className="auth-showcase__note-mark">GK</span>
              <span>Akun publik hanya dapat melihat katalog, sama seperti pengunjung.</span>
            </div>
          </div>
        </aside>

        <section className="auth-panel">
          <a className="auth-brand auth-brand--panel" href="/" aria-label="GameKalcer, kembali ke beranda">
            <BrandMark />
            <span>GameKalcer</span>
          </a>

          <div className="auth-content">
            <div className="auth-content__intro">
              <h2>{isSignup ? "Buat akun publik" : "Masuk ke GameKalcer"}</h2>
              <p>
                {isSignup
                  ? "Daftar sebagai akun Publik. Katalog tetap bisa dilihat tanpa login."
                  : "Gunakan email dan kata sandi akun yang sudah terdaftar."}
              </p>
            </div>

            <form className="auth-form" onSubmit={submitForm}>
              {isSignup && (
                <label className="auth-field">
                  <span>Nama</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nama kamu"
                    autoComplete="name"
                    required
                  />
                </label>
              )}
              <label className="auth-field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="nama@email.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="auth-field">
                <span>Kata sandi</span>
                <span className="auth-password">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Masukkan kata sandi"
                    autoComplete={isSignup ? "new-password" : "current-password"}
                    minLength={isSignup ? 8 : undefined}
                    required
                  />
                  <button
                    className="auth-password__toggle"
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.7 10.7 0 0 1 12 5c5.2 0 8.8 4.2 9.5 6-.3.8-1.1 2-2.3 3.1M6.2 6.2C3.9 7.6 2.7 10 2.5 11c.4 1.2 3.9 7 9.5 7 1 0 1.9-.2 2.7-.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M2.5 12s3.4-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.4 6.5-9.5 6.5S2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="1.6" />
                        <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    )}
                  </button>
                </span>
              </label>

              <p className="auth-role-note">
                {isSignup
                  ? "Pendaftaran hanya membuat akun Publik. Akses Pengguna Input dan Pemilik diberikan oleh Pemilik."
                  : "Hak akses mengikuti peran akun. Akun internal dibuat dan dikelola oleh Pemilik."}
              </p>

              <button className="auth-submit" type="submit">
                {isSignup ? "Buat akun" : "Masuk"}
                <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M3.5 9h11m-4.5-4.5L14.5 9 10 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {notice && <p className="auth-notice" role="status">{notice}</p>}
            </form>

            <p className="auth-switch">
              {isSignup ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
              <button type="button" onClick={() => changeMode(isSignup ? "login" : "signup")}>
                {isSignup ? "Masuk" : "Daftar"}
              </button>
            </p>
            <a className="auth-guest-link" href="/?shop=1">
              Lanjutkan sebagai pengunjung
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <p className="auth-panel__footnote">© GameKalcer · Marketplace akun Mobile Legends</p>
        </section>
      </section>
    </main>
  );
}
