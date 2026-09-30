export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <main className="auth">
      <aside className="auth-side">
        <div className="brand">Shopwise</div>
        <div>
          <h2>Run your online store from one place.</h2>
          <p>Log in to manage orders, products and customers.</p>
        </div>
        <svg className="waves" viewBox="0 0 400 120" aria-hidden="true">
          <path d="M0 70 C60 30 120 110 200 70 S340 30 400 70 V120 H0Z" />
          <path d="M0 95 C70 60 130 120 210 92 S340 65 400 95 V120 H0Z" />
        </svg>
      </aside>
      <section className="auth-main">
        <div className="auth-card">
          <h1>{title}</h1>
          <p className="muted">{subtitle}</p>
          {children}
          <p className="auth-footer">{footer}</p>
        </div>
      </section>
    </main>
  )
}
