import { useState } from 'react'
import NumberField from '../../components/NumberField'
import ResultCard from '../../components/ResultCard'
import { formatNumber } from '../../utils/format'

const MODES = [
  { id: 'of', label: 'X% of Y' },
  { id: 'is', label: 'X is what % of Y?' },
  { id: 'change', label: '% change' },
]

function PercentageCalculator() {
  const [mode, setMode] = useState('of')
  const [first, setFirst] = useState('')
  const [second, setSecond] = useState('')

  const a = parseFloat(first)
  const b = parseFloat(second)
  const valid = !Number.isNaN(a) && !Number.isNaN(b)

  let result = null
  let label = ''
  if (valid) {
    if (mode === 'of') {
      result = (a / 100) * b
      label = `${formatNumber(a)}% of ${formatNumber(b)}`
    } else if (mode === 'is') {
      result = b === 0 ? 'Error' : (a / b) * 100
      label = `${formatNumber(a)} as a percentage of ${formatNumber(b)}`
    } else {
      result = a === 0 ? 'Error' : ((b - a) / a) * 100
      label = `Change from ${formatNumber(a)} to ${formatNumber(b)}`
    }
  }

  return (
    <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
      <div className="btn-group">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            className="btn btn-segment"
            aria-pressed={mode === m.id}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <NumberField
        label={mode === 'of' ? 'Percentage (X)' : 'First value (X)'}
        value={first}
        onChange={setFirst}
        step="any"
        suffix={mode === 'of' ? '%' : undefined}
        placeholder={mode === 'of' ? 'e.g. 15' : 'e.g. 30'}
      />
      <NumberField
        label={mode === 'of' ? 'Of value (Y)' : 'Second value (Y)'}
        value={second}
        onChange={setSecond}
        step="any"
        placeholder="e.g. 200"
      />

      {valid && result !== null && (
        <ResultCard title="Result">
          <div className="result-value">
            {result === 'Error' ? 'Error' : `${formatNumber(result)}${mode === 'is' || mode === 'change' ? '%' : ''}`}
          </div>
          <div className="result-note">{label}</div>
        </ResultCard>
      )}
    </form>
  )
}

export default PercentageCalculator
