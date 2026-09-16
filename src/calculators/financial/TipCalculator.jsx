import { useState } from 'react'
import NumberField from '../../components/NumberField'
import ResultCard from '../../components/ResultCard'
import ResultRow from '../../components/ResultRow'
import { formatCurrency, formatNumber } from '../../utils/format'

function TipCalculator() {
  const [bill, setBill] = useState('')
  const [tipPercent, setTipPercent] = useState('15')
  const [people, setPeople] = useState('1')

  const billValue = parseFloat(bill)
  const percent = parseFloat(tipPercent)
  const count = parseInt(people, 10)

  const valid = !Number.isNaN(billValue) && billValue > 0 && !Number.isNaN(percent)

  const tipAmount = valid ? (billValue * percent) / 100 : null
  const total = tipAmount !== null ? billValue + tipAmount : null
  const perPerson =
    total !== null && count > 0 ? total / count : null

  return (
    <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
      <NumberField
        label="Bill amount"
        value={bill}
        onChange={setBill}
        min="0"
        step="0.01"
        suffix="$"
        placeholder="e.g. 84.50"
      />
      <NumberField
        label="Tip percentage"
        value={tipPercent}
        onChange={setTipPercent}
        min="0"
        step="0.5"
        suffix="%"
        placeholder="e.g. 15"
      />
      <NumberField
        label="Number of people"
        value={people}
        onChange={setPeople}
        min="1"
        step="1"
        placeholder="e.g. 4"
      />

      {tipAmount !== null && (
        <ResultCard title="Bill breakdown">
          <ResultRow
            label={`Tip (${formatNumber(percent)}%)`}
            value={`$${formatCurrency(tipAmount)}`}
          />
          <ResultRow label="Total" value={`$${formatCurrency(total)}`} highlight />
          {perPerson !== null && (
            <ResultRow
              label="Per person"
              value={`$${formatCurrency(perPerson)}`}
            />
          )}
        </ResultCard>
      )}
    </form>
  )
}

export default TipCalculator
