import { useState } from 'react'
import { useAuth } from '../auth.jsx'

const NAV = ['Overview', 'Orders', 'Products', 'Customers', 'Settings']

const STATS = [
  { label: 'Revenue this month', value: 'Rs. 482,900', note: '14% more than last month' },
  { label: 'Orders', value: 136, note: '9 waiting to ship' },
  { label: 'Products', value: 58, note: '4 low on stock' },
  { label: 'Customers', value: 312, note: '21 new this week' },
]

const ORDERS = [
  { id: '#1042', customer: 'Amaya Perera', total: 'Rs. 12,500', status: 'Paid', date: 'Sep 28' },
  { id: '#1041', customer: 'Nuwan Silva', total: 'Rs. 4,800', status: 'Shipped', date: 'Sep 28' },
  { id: '#1040', customer: 'Dilini Fernando', total: 'Rs. 27,300', status: 'Pending', date: 'Sep 27' },
  { id: '#1039', customer: 'Kasun Rajapaksa', total: 'Rs. 6,150', status: 'Delivered', date: 'Sep 26' },
  { id: '#1038', customer: 'Sahan Wijesinghe', total: 'Rs. 9,900', status: 'Refunded', date: 'Sep 25' },
]

const LOW_STOCK = [
  { name: 'Cotton t-shirt (M)', left: 3 },
  { name: 'Leather wallet', left: 5 },
  { name: 'Wireless earbuds', left: 2 },
  { name: 'Canvas tote bag', left: 4 },
]

const WEEK = [
  { d: 'Mon', v: 42 }, { d: 'Tue', v: 65 }, { d: 'Wed', v: 51 },
  { d: 'Thu', v: 88 }, { d: 'Fri', v: 74 }, { d: 'Sat', v: 96 }, { d: 'Sun', v: 60 },
]

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [active, setActive] = useState('Overview')
  const [open, setOpen] = useState(false)
  const max = Math.max(...WEEK.map((w) => w.v))
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const initials = user.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div className="shell">
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">Shopwise</div>
        <nav aria-label="Main">
          {NAV.map((n) => (
            <button key={n} className={n === active ? 'nav active' : 'nav'}
              onClick={() => { setActive(n); setOpen(false) }}>
              {n}
            </button>
          ))}
        </nav>
        <button className="nav logout" onClick={logout}>Log out</button>
      </aside>

      <div className="content">
        <header className="topbar">
          <button className="menu" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">Menu</button>
          <input className="search" type="search" placeholder="Search orders, products, customers" aria-label="Search" />
          <div className="avatar" title={user.email}>{initials}</div>
        </header>

        <main className="page">
          <h1>{greeting}, {user.name.split(' ')[0]}</h1>
          <p className="muted">Here is how your store is doing today.</p>

          <section className="stats" aria-label="Summary">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <span className="stat-label">{s.label}</span>
                <span className="stat-value">{s.value}</span>
                <span className="stat-note">{s.note}</span>
              </div>
            ))}
          </section>

          <div className="grid">
            <section className="panel">
              <h2>Sales this week (in thousands, Rs.)</h2>
              <div className="bars" role="img" aria-label="Bar chart of sales each day">
                {WEEK.map((w) => (
                  <div className="bar-col" key={w.d}>
                    <span className="bar-num">{w.v}</span>
                    <div className="bar" style={{ height: `${(w.v / max) * 100}%` }} />
                    <span className="bar-day">{w.d}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="panel">
              <h2>Low stock</h2>
              <dl className="account">
                {LOW_STOCK.map((p) => (
                  <>
                    <dt key={p.name}>{p.name}</dt>
                    <dd key={p.name + 'n'}>{p.left} left</dd>
                  </>
                ))}
              </dl>
            </section>
          </div>

          <section className="panel">
            <h2>Recent orders</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {ORDERS.map((o) => (
                    <tr key={o.id}>
                      <td>{o.id}</td>
                      <td>{o.customer}</td>
                      <td>{o.total}</td>
                      <td><span className={`pill ${o.status.toLowerCase()}`}>{o.status}</span></td>
                      <td>{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
