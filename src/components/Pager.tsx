import { Button } from './Button'

type PagerProps = {
  page: number
  pages: number
  disabled: boolean
  onChange: (page: number) => void
}

export function Pager({ page, pages, disabled, onChange }: PagerProps) {
  if (pages <= 1) return null

  return (
    <nav className="pager" aria-label="Страницы">
      <Button variant="secondary" disabled={disabled || page <= 1} onClick={() => onChange(page - 1)}>
        ← Назад
      </Button>
      <span className="pager__info">
        Страница {page} из {pages}
      </span>
      <Button
        variant="secondary"
        disabled={disabled || page >= pages}
        onClick={() => onChange(page + 1)}
      >
        Вперёд →
      </Button>
    </nav>
  )
}
