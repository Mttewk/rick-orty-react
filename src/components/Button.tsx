import type { ReactNode } from 'react'

// Контракт кнопки: содержимое, оформление и поведение (слайд 94).
type ButtonProps = {
  variant: 'primary' | 'secondary'
  children: ReactNode
  disabled?: boolean
  pressed?: boolean
  onClick?: () => void
}

/** Одна кнопка — разные настройки. Классы по БЭМ: button и button_variant_*. */
export function Button({ variant, children, pressed, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      type="button"
      aria-pressed={pressed}
      className={`button button_variant_${variant}`}
    >
      {children}
    </button>
  )
}
