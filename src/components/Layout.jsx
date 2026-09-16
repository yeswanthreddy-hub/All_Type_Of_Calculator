import { Link, Outlet } from 'react-router-dom'
import { FaCalculator, FaLayerGroup } from 'react-icons/fa'

function Layout() {
  return (
    <>
      <div className="bg-orbs" aria-hidden="true">
        <span className="orb-aqua" />
        <span className="orb-pink" />
        <span className="orb-green" />
      </div>

      <header className="app-header">
        <div className="app-header-inner">
          <Link to="/" className="brand">
            <span className="brand-icon" aria-hidden="true">
              <FaCalculator />
            </span>
            <span>All Type Calculator</span>
          </Link>
          <nav className="app-nav">
            <Link to="/">
              <FaLayerGroup aria-hidden="true" />
              All Calculators
            </Link>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        Built with React + Vite — add new calculators in{' '}
        <code>src/calculators</code> and register them in{' '}
        <code>src/data/calculators.jsx</code>.
      </footer>
    </>
  )
}

export default Layout
