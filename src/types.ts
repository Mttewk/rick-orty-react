import type { Character } from './schema'

/** Значения фильтра совпадают с параметром status у API. Пустая строка — «любой». */
export type StatusFilter = '' | 'alive' | 'dead' | 'unknown'

/** Параметры запроса списка. */
export type CharactersQuery = {
  name: string
  status: StatusFilter
  page: number
}

/** Одна страница результата, уже проверенная схемой. */
export type CharactersPage = {
  characters: Character[]
  count: number
  pages: number
}

/**
 * Три состояния загрузки (слайды 129–130).
 * Каждый статус описывает только те данные, которые у него есть:
 * page доступна только при ready.
 */
export type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; page: CharactersPage }
