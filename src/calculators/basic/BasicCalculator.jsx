import { useState } from 'react'
import {
  FaBackspace,
  FaDivide,
  FaEquals,
  FaMinus,
  FaPercent,
  FaPlus,
  FaTimes,
} from 'react-icons/fa'
import { TbPlusMinus } from 'react-icons/tb'
import { formatNumber } from '../../utils/format'

function calculate(a, b, op) {
  switch (op) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '*':
      return a * b
    case '/':
      return b === 0 ? 'Error' : a / b
    default:
      return b
  }
}

function BasicCalculator() {
  const [display, setDisplay] = useState('0')
  const [accumulator, setAccumulator] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waiting, setWaiting] = useState(false)

  const inputDigit = (digit) => {
    if (waiting) {
      setDisplay(digit === '.' ? '0.' : digit)
      setWaiting(false)
      return
    }
    if (digit === '.') {
      if (!display.includes('.')) setDisplay(display + '.')
      return
    }
    setDisplay(display === '0' ? digit : display + digit)
  }

  const clearAll = () => {
    setDisplay('0')
    setAccumulator(null)
    setOperator(null)
    setWaiting(false)
  }

  const deleteLast = () => {
    if (waiting) {
      setDisplay('0')
      setWaiting(false)
      return
    }
    if (display === 'Error') {
      clearAll()
      return
    }
    const next = display.slice(0, -1)
    setDisplay(next === '' || next === '-' ? '0' : next)
  }

  const toggleSign = () => {
    if (display === '0' || display === 'Error') return
    setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display)
  }

  const percent = () => {
    const value = parseFloat(display)
    if (Number.isNaN(value) || value === 0) return
    setDisplay(formatNumber(value / 100))
  }

  const applyOperator = (op) => {
    if (display === 'Error') return
    const value = parseFloat(display)
    if (operator !== null && !waiting) {
      const result = calculate(accumulator, value, operator)
      setAccumulator(result)
      setDisplay(formatNumber(result))
    } else {
      setAccumulator(value)
    }
    setOperator(op)
    setWaiting(true)
  }

  const equals = () => {
    if (operator === null || accumulator === null || display === 'Error') return
    const value = parseFloat(display)
    const result = calculate(accumulator, value, operator)
    setDisplay(formatNumber(result))
    setAccumulator(null)
    setOperator(null)
    setWaiting(false)
  }

  const show = display === 'Error' ? display : formatNumber(parseFloat(display))

  return (
    <div>
      <div className="calc-display" aria-live="polite">
        <div className="calc-display-expression">
          {operator ? `${formatNumber(accumulator)} ${operator} ` : '\u00A0'}
        </div>
        <div className="calc-display-value">{show}</div>
      </div>

      <div className="keypad">
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
        <button
          type="button"
          className="key"
          onClick={percent}
          aria-label="Percent"
        >
          <FaPercent />
        </button>
        <button
          type="button"
          className="key key-operator"
          onClick={() => applyOperator('/')}
          aria-label="Divide"
        >
          <FaDivide />
        </button>

        <button type="button" className="key" onClick={() => inputDigit('7')}>
          7
        </button>
        <button type="button" className="key" onClick={() => inputDigit('8')}>
          8
        </button>
        <button type="button" className="key" onClick={() => inputDigit('9')}>
          9
        </button>
        <button
          type="button"
          className="key key-operator"
          onClick={() => applyOperator('*')}
          aria-label="Multiply"
        >
          <FaTimes />
        </button>

        <button type="button" className="key" onClick={() => inputDigit('4')}>
          4
        </button>
        <button type="button" className="key" onClick={() => inputDigit('5')}>
          5
        </button>
        <button type="button" className="key" onClick={() => inputDigit('6')}>
          6
        </button>
        <button
          type="button"
          className="key key-operator"
          onClick={() => applyOperator('-')}
          aria-label="Subtract"
        >
          <FaMinus />
        </button>

        <button type="button" className="key" onClick={() => inputDigit('1')}>
          1
        </button>
        <button type="button" className="key" onClick={() => inputDigit('2')}>
          2
        </button>
        <button type="button" className="key" onClick={() => inputDigit('3')}>
          3
        </button>
        <button
          type="button"
          className="key key-operator"
          onClick={() => applyOperator('+')}
          aria-label="Add"
        >
          <FaPlus />
        </button>

        <button type="button" className="key" onClick={() => inputDigit('0')}>
          0
        </button>
        <button
          type="button"
          className="key"
          onClick={toggleSign}
          aria-label="Toggle sign"
        >
          <TbPlusMinus />
        </button>
        <button type="button" className="key" onClick={() => inputDigit('.')}>
          .
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

export default BasicCalculator
