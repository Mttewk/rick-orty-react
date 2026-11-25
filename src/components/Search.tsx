type SearchProps = {
  value: string
  onChange: (value: string) => void
}

/** Управляемое поле: value приходит от родителя, onChange сообщает о вводе (слайды 113, 117). */
export function Search({ value, onChange }: SearchProps) {
  return (
    <label className="field">
      <span className="field__label">Имя</span>
      <input
        className="field__control"
        type="search"
        placeholder="Например, Rick"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}
