/**
 * Format a number for display: up to 8 decimal places, thousands separators.
 * Non-finite values and error strings are passed through.
 */
export function formatNumber(value) {
  if (value === null || value === undefined || value === '') return ''
  if (typeof value === 'string') return value
  if (!Number.isFinite(value)) return 'Error'
  const rounded = Math.round(value * 1e8) / 1e8
  return rounded.toLocaleString('en-US', { maximumFractionDigits: 8 })
}

/** Format a number as currency (2 decimals, thousands separators). */
export function formatCurrency(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '—'
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
