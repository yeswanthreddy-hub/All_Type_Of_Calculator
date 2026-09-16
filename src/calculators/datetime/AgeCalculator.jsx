import { useState } from 'react'
import ResultCard from '../../components/ResultCard'
import ResultRow from '../../components/ResultRow'

function ageParts(birthDate) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const birth = new Date(birthDate + 'T00:00:00')
  if (Number.isNaN(birth.getTime()) || birth > today) return null

  let years = today.getFullYear() - birth.getFullYear()
  let months = today.getMonth() - birth.getMonth()
  let days = today.getDate() - birth.getDate()

  if (days < 0) {
    months -= 1
    const prevMonthDays = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    ).getDate()
    days += prevMonthDays
  }
  if (months < 0) {
    years -= 1
    months += 12
  }
  return { years, months, days }
}

function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('')

  const parts = birthDate ? ageParts(birthDate) : null
  const inFuture = birthDate !== '' && parts === null

  return (
    <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
      <label className="field">
        <span className="field-label">Date of birth</span>
        <input
          type="date"
          className="field-input"
          value={birthDate}
          max={new Date().toISOString().slice(0, 10)}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </label>

      {inFuture && (
        <p className="result-note" style={{ color: 'var(--danger)' }}>
          The date of birth can&apos;t be in the future.
        </p>
      )}

      {parts && (
        <ResultCard title="Your age">
          <ResultRow label="Years" value={parts.years} highlight />
          <ResultRow label="Months" value={parts.months} />
          <ResultRow label="Days" value={parts.days} />
          <ResultRow
            label="Total days"
            value={Math.floor(
              (Date.now() - new Date(birthDate + 'T00:00:00').getTime()) /
                (1000 * 60 * 60 * 24),
            ).toLocaleString()}
          />
        </ResultCard>
      )}
    </form>
  )
}

export default AgeCalculator
