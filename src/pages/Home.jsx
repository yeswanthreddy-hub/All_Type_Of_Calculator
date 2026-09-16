import { Link } from 'react-router-dom'
import { CALCULATORS, CATEGORIES, CATEGORY_META } from '../data/calculators.jsx'

function Home() {
  return (
    <>
      <section className="hero">
        <h1>Every calculator you need</h1>
        <p>
          Pick a calculator — basic, scientific, health, converters, financial
          and more.
        </p>
      </section>

      {CATEGORIES.map((category) => {
        const items = CALCULATORS.filter(
          (calculator) => calculator.category === category,
        )
        const { accent, icon: CategoryIcon } = CATEGORY_META[category]
        return (
          <section
            key={category}
            className={`category-section ${accent}`}
          >
            <h2 className="category-title">
              <span className="category-icon" aria-hidden="true">
                <CategoryIcon />
              </span>
              {category}
              <span className="category-count">{items.length}</span>
            </h2>
            <div className="calculator-grid">
              {items.map(({ id, name, icon: Icon, description }) => (
                <Link key={id} to={`/calculator/${id}`} className="calculator-card">
                  <div className="calculator-card-icon" aria-hidden="true">
                    <Icon />
                  </div>
                  <h3 className="calculator-card-name">{name}</h3>
                  <p className="calculator-card-desc">{description}</p>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}

export default Home
