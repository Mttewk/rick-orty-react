import { useEffect, useState } from 'react'
import { useCharacters } from '../hooks/useCharacters'
import type { StatusFilter } from '../types'
import { Button } from './Button'
import { Pager } from './Pager'
import { Results } from './Results'
import { Search } from './Search'
import { StatusSelect } from './StatusSelect'

const DEBOUNCE_MS = 400

/**
 * Родитель: хранит общее состояние и связывает дочерние компоненты (слайд 116).
 *  - query / status / page — параметры запроса;
 *  - selectedIds — выбранные персонажи (только id, объекты хранить не нужно);
 *  - reloadKey — счётчик для повторного запроса.
 */
export function Catalog() {
  const [query, setQuery] = useState('') // то, что в поле ввода
  const [name, setName] = useState('') // то, что реально уходит в запрос (после паузы в наборе)
  const [status, setStatus] = useState<StatusFilter>('')
  const [page, setPage] = useState(1)
  const [reloadKey, setReloadKey] = useState(0)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const state = useCharacters({ name, status, page }, reloadKey)
  const isLoading = state.status === 'loading'

  // Эффект с очисткой (слайд 126): запрос уходит, когда пользователь перестал печатать.
  // Каждое новое нажатие сначала вызывает cleanup и сбрасывает прежний таймер.
  useEffect(() => {
    const timer = setTimeout(() => {
      setName(query.trim())
      setPage(1)
    }, DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [query])

  // Эффект синхронизирует заголовок вкладки с числом выбранных (слайд 123).
  // Само число вычисляется из массива, отдельный state для него не нужен.
  useEffect(() => {
    document.title = `Выбрано: ${selectedIds.length} — Рик и Морти`
  }, [selectedIds.length])

  // Неизменяемые обновления: всегда создаём новый массив (слайд 112).
  function toggleSelected(id: number) {
    setSelectedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))
  }

  function changeStatus(next: StatusFilter) {
    setStatus(next)
    setPage(1)
  }

  const summary =
    state.status === 'ready' && state.page.count > 0 ? `Найдено: ${state.page.count}` : ''

  return (
    <main className="catalog">
      <div className="catalog__filters" role="search">
        <Search value={query} onChange={setQuery} />
        <StatusSelect value={status} onChange={changeStatus} />
        <Button
          variant="secondary"
          disabled={isLoading}
          onClick={() => setReloadKey((key) => key + 1)}
        >
          Обновить
        </Button>
      </div>

      <div className="catalog__bar">
        <p className="catalog__summary" aria-live="polite">
          {summary}
        </p>
        <p className="catalog__selected">
          Выбрано: {selectedIds.length}
          <Button
            variant="secondary"
            disabled={selectedIds.length === 0}
            onClick={() => setSelectedIds([])}
          >
            Сбросить
          </Button>
        </p>
      </div>

      <Results
        state={state}
        selectedIds={selectedIds}
        onToggle={toggleSelected}
        onRetry={() => setReloadKey((key) => key + 1)}
      />

      {state.status === 'ready' && (
        <Pager page={page} pages={state.page.pages} disabled={isLoading} onChange={setPage} />
      )}
    </main>
  )
}
