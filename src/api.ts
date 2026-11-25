import { z } from 'zod'
import { CharactersResponseSchema } from './schema'
import type { CharactersPage, CharactersQuery } from './types'

const BASE_URL = 'https://rickandmortyapi.com/api/character'

/**
 * Загружает одну страницу персонажей.
 * Ошибка может случиться на трёх этапах (слайд 101):
 *  1. запрос: сеть, CORS, отмена — отклоняется сам fetch;
 *  2. HTTP-ответ: 404 или 500 — fetch не отклоняется, проверяем response.ok;
 *  3. тело: невалидный JSON или не та структура — json() или схема Zod выбрасывают ошибку.
 */
export async function getCharacters(
  { name, status, page }: CharactersQuery,
  signal?: AbortSignal,
): Promise<CharactersPage> {
  const url = new URL(BASE_URL)
  if (name) url.searchParams.set('name', name)
  if (status) url.searchParams.set('status', status)
  url.searchParams.set('page', String(page))

  const response = await fetch(url, { signal })

  // На пустой поиск это API отвечает 404 {"error": "There is nothing here"}.
  // Для интерфейса это не ошибка, а «Ничего не найдено».
  if (response.status === 404) {
    return { characters: [], count: 0, pages: 0 }
  }
  if (!response.ok) {
    throw new Error('HTTP ' + response.status)
  }

  const data: unknown = await response.json()
  const parsed = CharactersResponseSchema.parse(data)
  return {
    characters: parsed.results,
    count: parsed.info.count,
    pages: parsed.info.pages,
  }
}

/** Понятное сообщение для пользователя вместо текста исключения. */
export function describeError(error: unknown): string {
  if (error instanceof TypeError) {
    return 'Не удалось подключиться к серверу. Проверьте интернет и попробуйте ещё раз.'
  }
  if (error instanceof SyntaxError || error instanceof z.ZodError) {
    return 'Сервер прислал некорректные данные. Попробуйте ещё раз.'
  }
  if (error instanceof Error) {
    return `Сервер вернул ошибку (${error.message}). Попробуйте ещё раз.`
  }
  return 'Что-то пошло не так. Попробуйте ещё раз.'
}
