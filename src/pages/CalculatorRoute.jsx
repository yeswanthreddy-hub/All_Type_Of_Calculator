import { useParams, Navigate } from 'react-router-dom'
import { CALCULATORS, CATEGORY_META } from '../data/calculators.jsx'
import CalculatorShell from '../components/CalculatorShell'

function CalculatorRoute() {
  const { id } = useParams()
  const calculator = CALCULATORS.find((item) => item.id === id)

  if (!calculator) return <Navigate to="/" replace />

  const Component = calculator.component
  const { accent } = CATEGORY_META[calculator.category]

  return (
    <CalculatorShell
      icon={calculator.icon}
      title={calculator.name}
      description={calculator.description}
      accent={accent}
    >
      <Component />
    </CalculatorShell>
  )
}

export default CalculatorRoute
