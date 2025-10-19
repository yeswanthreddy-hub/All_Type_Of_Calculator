import { useState } from 'react'
import ResultCard from '../../components/ResultCard'
import ResultRow from '../../components/ResultRow'
import { formatNumber } from '../../utils/format'

function parseNumbers(input) {
  return input
    .split(/[,;\s]+/)
    .map((token) => token.trim())
    .filter(Boolean)
    .map(Number)
    .filter((n) => !Number.isNaN(n))
}

function median(sorted) {
  const mid = Math.floor(sorted.length / 2)
  if (sorted.length % 2 === 1) return sorted[mid]
  return (sorted[mid - 1] + sorted[mid]) / 2
}

function AverageCalculator() {
  const [input, setInput] = useState('')

  const numbers = parseNumbers(input)
  const count = numbers.length

  const sum = count ? numbers.reduce((acc, n) => acc + n, 0) : null
  const sorted = [...numbers].sort((a, b) => a - b)
  const stats =
    count > 0
      ? {
          sum,
          average: sum / count,
          min: sorted[0],
          max: sorted[sorted.length - 1],
          median: median(sorted),
          range: sorted[sorted.length - 1] - sorted[0],
        }
      : null

  return (
    <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
      <label className="field">
        <span className="field-label">
          Numbers (separated by commas or spaces)
        </span>
        <textarea
          className="field-input"
          rows="3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 12, 45, 78, 23, 56"
        />
      </label>

      {stats && (
        <ResultCard title={`Summary of ${count} number${count === 1 ? '' : 's'}`}>
          <ResultRow label="Sum" value={formatNumber(stats.sum)} />
          <ResultRow label="Average" value={formatNumber(stats.average)} highlight />
          <ResultRow label="Median" value={formatNumber(stats.median)} />
          <ResultRow label="Min" value={formatNumber(stats.min)} />
          <ResultRow label="Max" value={formatNumber(stats.max)} />
          <ResultRow label="Range" value={formatNumber(stats.range)} />
        </ResultCard>
      )}
    </form>
  )
}

export default AverageCalculator
