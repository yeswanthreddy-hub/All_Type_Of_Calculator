import { useState } from 'react'
import NumberField from '../../components/NumberField'
import ResultCard from '../../components/ResultCard'
import ResultRow from '../../components/ResultRow'
import { formatNumber } from '../../utils/format'

function categoryFor(bmi) {
  if (bmi < 18.5) return { label: 'Underweight', color: '#f59e0b' }
  if (bmi < 25) return { label: 'Normal weight', color: '#16a34a' }
  if (bmi < 30) return { label: 'Overweight', color: '#f97316' }
  return { label: 'Obese', color: '#dc2626' }
}

function BmiCalculator() {
  const [weight, setWeight] = useState('') // kg
  const [height, setHeight] = useState('') // cm

  const w = parseFloat(weight)
  const h = parseFloat(height)
  const valid = w > 0 && h > 0
  const bmi = valid ? w / ((h / 100) * (h / 100)) : null
  const category = bmi !== null ? categoryFor(bmi) : null

  return (
    <form
      className="calc-form"
      onSubmit={(e) => e.preventDefault()}
    >
      <NumberField
        label="Weight"
        value={weight}
        onChange={setWeight}
        min="0"
        step="0.1"
        suffix="kg"
        placeholder="e.g. 70"
      />
      <NumberField
        label="Height"
        value={height}
        onChange={setHeight}
        min="0"
        step="0.1"
        suffix="cm"
        placeholder="e.g. 175"
      />

      {bmi !== null && (
        <ResultCard title="Your BMI">
          <div
            className="result-value"
            style={{ color: category.color }}
          >
            {formatNumber(bmi)}
          </div>
          <ResultRow label="Category" value={category.label} />
        </ResultCard>
      )}
    </form>
  )
}

export default BmiCalculator
