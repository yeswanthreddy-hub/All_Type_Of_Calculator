/**
 * Labeled number input.
 *
 * The value is kept as a string so the input stays editable while typing
 * (e.g. an empty field or a trailing "."). Parse it with parseFloat() when
 * computing results.
 */
function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
  placeholder,
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <div className="field-input-wrap">
        <input
          type="number"
          className={`field-input${suffix ? ' has-suffix' : ''}`}
          value={value}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        {suffix && <span className="field-suffix">{suffix}</span>}
      </div>
    </label>
  )
}

export default NumberField
