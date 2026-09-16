import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

function CalculatorShell({ icon: Icon, title, description, accent = 'accent-aqua', children }) {
  return (
    <>
      <Link to="/" className="back-link">
        <FaArrowLeft aria-hidden="true" />
        All calculators
      </Link>

      <section className={`calc-page ${accent}`}>
        <header className="calc-page-header">
          <span className="calc-icon" aria-hidden="true">
            <Icon />
          </span>
          <h2>{title}</h2>
        </header>
        {description && <p className="calc-page-desc">{description}</p>}
        {children}
      </section>
    </>
  )
}

export default CalculatorShell
