import { useState } from 'react'
import ResultCard from '../../components/ResultCard'
import { formatNumber } from '../../utils/format'

const CATEGORIES = {
  length: {
    label: 'Length',
    units: {
      mm: 0.001,
      cm: 0.01,
      m: 1,
      km: 1000,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.344,
    },
  },
  weight: {
    label: 'Weight',
    units: {
      mg: 0.000001,
      g: 0.001,
      kg: 1,
      t: 1000,
      oz: 0.0283495,
      lb: 0.453592,
      st: 6.35029,
    },
  },
  temperature: {
    label: 'Temperature',
    units: { C: 'Celsius', F: 'Fahrenheit', K: 'Kelvin' },
  },
}

// Temperature converts through Celsius as the base scale.
const TEMPERATURE = {
  C: { toBase: (v) => v, fromBase: (v) => v },
  F: { toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
  K: { toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
}

function UnitConverter() {
  const [category, setCategory] = useState('length')
  const [fromUnit, setFromUnit] = useState('m')
  const [toUnit, setToUnit] = useState('km')
  const [value, setValue] = useState('')

  const isTemperature = category === 'temperature'
  const units = CATEGORIES[category].units
  const unitNames = Object.keys(units)

  const changeCategory = (next) => {
    setCategory(next)
    const first = Object.keys(CATEGORIES[next].units)[0]
    const second = Object.keys(CATEGORIES[next].units)[1]
    setFromUnit(first)
    setToUnit(second)
  }

  const input = parseFloat(value)
  const valid = value !== '' && !Number.isNaN(input)

  let result = null
  if (valid) {
    if (isTemperature) {
      const base = TEMPERATURE[fromUnit].toBase(input)
      result = TEMPERATURE[toUnit].fromBase(base)
    } else {
      result = (input * units[fromUnit]) / units[toUnit]
    }
  }

  return (
    <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
      <div className="btn-group">
        {Object.entries(CATEGORIES).map(([key, { label }]) => (
          <button
            key={key}
            type="button"
            className="btn btn-segment"
            aria-pressed={category === key}
            onClick={() => changeCategory(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <NumberFieldRow
        label="From"
        value={value}
        onValueChange={setValue}
        unit={fromUnit}
        onUnitChange={setFromUnit}
        unitNames={unitNames}
        units={units}
      />
      <NumberFieldRow
        label="To"
        value={result !== null ? formatNumber(result) : ''}
        onValueChange={() => {}}
        unit={toUnit}
        onUnitChange={setToUnit}
        unitNames={unitNames}
        units={units}
        readOnly
      />

      {valid && result !== null && (
        <ResultCard title="Conversion">
          <div className="result-value">
            {formatNumber(input)} {fromUnit} = {formatNumber(result)} {toUnit}
          </div>
        </ResultCard>
      )}
    </form>
  )
}

function NumberFieldRow({
  label,
  value,
  onValueChange,
  unit,
  onUnitChange,
  unitNames,
  units,
  readOnly = false,
}) {
  return (
    <div className="field">
      <span className="field-label">{label}</span>
      <div className="field-row" style={{ gridTemplateColumns: '1fr 140px' }}>
        <input
          type="number"
          className="field-input"
          value={value}
          readOnly={readOnly}
          step="any"
          onChange={(e) => onValueChange(e.target.value)}
        />
        <select
          className="field-input"
          value={unit}
          onChange={(e) => onUnitChange(e.target.value)}
        >
          {unitNames.map((u) => (
            <option key={u} value={u}>
              {units[u]}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default UnitConverter
