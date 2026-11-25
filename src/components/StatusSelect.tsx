import type { StatusFilter } from '../types'

const OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: '', label: 'Любой' },
  { value: 'alive', label: 'Живой' },
  { value: 'dead', label: 'Мёртвый' },
  { value: 'unknown', label: 'Неизвестно' },
]

type StatusSelectProps = {
  value: StatusFilter
  onChange: (value: StatusFilter) => void
}

export function StatusSelect({ value, onChange }: StatusSelectProps) {
  return (
    <label className="field">
      <span className="field__label">Статус</span>
      <select
        className="field__control"
        value={value}
        onChange={(event) => {
          // Находим вариант из списка вместо приведения типа: строка из DOM не обязана быть StatusFilter.
          const option = OPTIONS.find((o) => o.value === event.target.value)
          if (option) onChange(option.value)
        }}
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}
