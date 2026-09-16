function ResultRow({ label, value, highlight = false }) {
  return (
    <div className="result-row">
      <span className="result-row-label">{label}</span>
      <span className={`result-row-value${highlight ? ' highlight' : ''}`}>
        {value}
      </span>
    </div>
  )
}

export default ResultRow
