/**
 * Card that shows the outcome of a calculation.
 *
 * It is rendered as a status live region so screen reader users hear the
 * new result as soon as the numbers they type change.
 */
function ResultCard({ title = 'Result', children }) {
  return (
    <div className="result-card" role="status" aria-live="polite">
      <div className="result-title">{title}</div>
      {children}
    </div>
  )
}

export default ResultCard
