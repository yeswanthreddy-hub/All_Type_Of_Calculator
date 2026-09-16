import { useState } from 'react'
import {
  FaBackspace,
  FaDivide,
  FaEquals,
  FaMinus,
  FaPlus,
  FaTimes,
} from 'react-icons/fa'
import { formatNumber } from '../../utils/format'

/** Only numbers, basic operators, parentheses, %, ^, commas, π and e are allowed. */
const SAFE_EXPRESSION = /^[\d\s+\-*/^().,%πeE]+$/

function evaluate(expression) {
  if (!expression.trim()) return 0
  const raw = expression.trim()
  if (!SAFE_EXPRESSION.test(raw)) return 'Error'
  const cleaned = raw
    .replace(/\^/g, '**')
    .replace(/,/g, '.')
    .replace(/π/g, 'Math.PI')
    .replace(/(?<!\d)e(?!\d)/g, 'Math.E')
  try {
    // eslint-disable-next-line no-new-func
    const value = Function(`"use strict"; return (${cleaned})`)()
    return typeof value === 'number' && Number.isFinite(value) ? value : 'Error'
  } catch {
    return 'Error'
  }
}

function factorial(n) {
  if (n < 0 || !Number.isInteger(n)) return 'Error'
  if (n > 170) return Infinity
  let result = 1
  for (let i = 2; i <= n; i += 1) result *= i
  return result
}

const DIGITS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', 'e']

const FUNCTIONS = [
  { label: 'sin', fn: (v) => Math.sin((v * Math.PI) / 180) },
  { label: 'cos', fn: (v) => Math.cos((v * Math.PI) / 180) },
  { label: 'tan', fn: (v) => Math.tan((v * Math.PI) / 180) },
  { label: 'log', fn: (v) => Math.log10(v) },
  { label: 'ln', fn: (v) => Math.log(v) },
  { label: '√', fn: (v) => Math.sqrt(v) },
  { label: 'x²', fn: (v) => v * v },
  { label: 'x³', fn: (v) => v * v * v },
  { label: '1/x', fn: (v) => 1 / v },
  { label: 'x!', fn: (v) => factorial(v) },
]

function ScientificCalculator() {
  const [expression, setExpression] = useState('')
  const [lastResult, setLastResult] = useState(null)

  const value = evaluate(expression)

  const append = (token) => setExpression(expression + token)

  const clearAll = () => {
    setExpression('')
    setLastResult(null)
  }

  const deleteLast = () => setExpression(expression.slice(0, -1))

  const applyFunction = ({ fn }) => {
    const result = fn(value)
    setExpression(formatNumber(result))
    setLastResult(null)
  }

  const equals = () => {
    if (value === 'Error') return
    setExpression(formatNumber(value))
    setLastResult(value)
  }

  const showValue = value === 'Error' ? 'Error' : formatNumber(value)

  return (
    <div>
      <div className="calc-display" aria-live="polite">
        <div className="calc-display-expression">
          {expression || (lastResult !== null ? `Ans = ${formatNumber(lastResult)}` : '\u00A0')}
        </div>
        <div className="calc-display-value">{showValue}</div>
      </div>

      <div className="keypad keypad-6">
        <button type="button" className="key key-danger" onClick={clearAll}>
          AC
        </button>
        <button
          type="button"
          className="key key-danger"
          onClick={deleteLast}
          aria-label="Backspace"
        >
          <FaBackspace />
        </button>
        <button type="button" className="key key-function" onClick={() => append('(')}>
          (
        </button>
        <button type="button" className="key key-function" onClick={() => append(')')}>
          )
        </button>
        <button type="button" className="key key-function" onClick={() => append('π')}>
          π
        </button>
        <button type="button" className="key key-function" onClick={() => append('^')}>
          xʸ
        </button>

        {FUNCTIONS.map((f) => (
          <button
            key={f.label}
            type="button"
            className="key key-function"
            onClick={() => applyFunction(f)}
          >
            {f.label}
          </button>
        ))}

        {DIGITS.map((d) => (
          <button key={d} type="button" className="key" onClick={() => append(d)}>
            {d}
          </button>
        ))}

        <button
          type="button"
          className="key key-operator"
          onClick={() => append(' / ')}
          aria-label="Divide"
        >
          <FaDivide />
        </button>
        <button
          type="button"
          className="key key-operator"
          onClick={() => append(' * ')}
          aria-label="Multiply"
        >
          <FaTimes />
        </button>
        <button
          type="button"
          className="key key-operator"
          onClick={() => append(' - ')}
          aria-label="Subtract"
        >
          <FaMinus />
        </button>
        <button
          type="button"
          className="key key-operator"
          onClick={() => append(' + ')}
          aria-label="Add"
        >
          <FaPlus />
        </button>
        <button
          type="button"
          className="key key-equals"
          onClick={equals}
          aria-label="Equals"
        >
          <FaEquals />
        </button>
      </div>
    </div>
  )
}

export default ScientificCalculator
