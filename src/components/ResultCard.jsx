function ResultCard({ title = 'Result', children }) {
  return (
    <div className="result-card">
      <div className="result-title">{title}</div>
      {children}
    </div>
  )
}

export default ResultCard
