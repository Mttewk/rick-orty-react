import type { LoadState } from '../types'
import { Button } from './Button'
import { CharacterList } from './CharacterList'

type ResultsProps = {
  state: LoadState
  selectedIds: number[]
  onToggle: (id: number) => void
  onRetry: () => void
}

/** Показывает одно из состояний запроса. Проверка status сужает тип (слайд 133). */
export function Results({ state, selectedIds, onToggle, onRetry }: ResultsProps) {
  if (state.status === 'loading') {
    return (
      <div className="state" role="status">
        <div className="state__spinner" aria-hidden="true" />
        <p>Загрузка…</p>
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="state state_kind_error" role="alert">
        <p>{state.message}</p>
        <Button variant="primary" onClick={onRetry}>
          Повторить попытку
        </Button>
      </div>
    )
  }

  if (state.page.characters.length === 0) {
    return (
      <div className="state">
        <p>Ничего не найдено</p>
      </div>
    )
  }

  return (
    <CharacterList
      characters={state.page.characters}
      selectedIds={selectedIds}
      onToggle={onToggle}
    />
  )
}
