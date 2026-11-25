import { useEffect, useState } from 'react'
import { describeError, getCharacters } from '../api'
import type { CharactersQuery, LoadState } from '../types'

/**
 * Собственный хук: загружает персонажей при каждом изменении запроса.
 * reloadKey нужен для кнопок «Обновить» и «Повторить попытку»:
 * меняем число — эффект выполняется снова с теми же параметрами.
 */
export function useCharacters(query: CharactersQuery, reloadKey: number): LoadState {
  const [state, setState] = useState<LoadState>({ status: 'loading' })
  const { name, status, page } = query

  useEffect(() => {
    // ignore защищает от ответов не по порядку (слайд 131): поздний ответ
    // на прежний запрос не должен заменить свежий результат.
    let ignore = false
    const controller = new AbortController()

    async function load() {
      setState({ status: 'loading' })
      try {
        const data = await getCharacters({ name, status, page }, controller.signal)
        if (!ignore) setState({ status: 'ready', page: data })
      } catch (error) {
        if (!ignore) setState({ status: 'error', message: describeError(error) })
      }
    }

    load()

    // Очистка: прежний ответ больше не нужен, и сам запрос тоже отменяем.
    return () => {
      ignore = true
      controller.abort()
    }
  }, [name, status, page, reloadKey])

  return state
}
