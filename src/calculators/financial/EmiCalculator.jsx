import { useState } from 'react'
import NumberField from '../../components/NumberField'
import ResultCard from '../../components/ResultCard'
import ResultRow from '../../components/ResultRow'
import { formatCurrency } from '../../utils/format'

function EmiCalculator() {
  const [principal, setPrincipal] = useState('')
  const [annualRate, setAnnualRate] = useState('')
  const [years, setYears] = useState('')

  const p = parseFloat(principal)
  const rate = parseFloat(annualRate)
  const nYears = parseFloat(years)

  const valid = p > 0 && !Number.isNaN(rate) && nYears > 0

  let emi = null
  let total = null
  let interest = null
  if (valid) {
    const n = nYears * 12
    const r = rate / 12 / 100
    emi = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    total = emi * n
    interest = total - p
  }

  return (
    <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
      <NumberField
        label="Loan amount"
        value={principal}
        onChange={setPrincipal}
        min="0"
        step="any"
        suffix="$"
        placeholder="e.g. 500000"
      />
      <NumberField
        label="Annual interest rate"
        value={annualRate}
        onChange={setAnnualRate}
        min="0"
        step="0.01"
        suffix="%"
        placeholder="e.g. 8.5"
      />
      <NumberField
        label="Loan tenure"
        value={years}
        onChange={setYears}
        min="0"
        step="0.5"
        suffix="years"
        placeholder="e.g. 20"
      />

      {emi !== null && (
        <ResultCard title="Loan summary">
          <ResultRow
            label="Monthly EMI"
            value={`$${formatCurrency(emi)}`}
            highlight
          />
          <ResultRow label="Total payment" value={`$${formatCurrency(total)}`} />
          <ResultRow label="Total interest" value={`$${formatCurrency(interest)}`} />
        </ResultCard>
      )}
    </form>
  )
}

export default EmiCalculator
