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

/**
 * Convert a computed number to a plain string with no thousands separators.
 * Used for values that stay editable on a keypad, because a separator such
 * as "," would be parsed as garbage if the user keeps typing.
 */
export function toPlainString(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 'Error'
  return String(Math.round(value * 1e8) / 1e8)
}

/**
 * Format a raw keypad string for display: adds thousands separators but
 * keeps a decimal point the user is still typing (e.g. "1." stays "1.").
 */
export function formatDisplayValue(input) {
  if (input === 'Error') return 'Error'
  const trailingDot = input.endsWith('.')
  const formatted = formatNumber(parseFloat(trailingDot ? input.slice(0, -1) : input))
  return trailingDot ? `${formatted}.` : formatted
}

/** Format a number as currency (2 decimals, thousands separators). */
export function formatCurrency(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '—'
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
