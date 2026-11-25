import { z } from 'zod'

// Типы описывают договорённость, но не проверяют ответ сервера (слайд 71).
// Поэтому JSON проверяем схемой во время выполнения, а тип получаем из неё (слайд 72).

export const CharacterSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(['Alive', 'Dead', 'unknown']),
  species: z.string(),
  gender: z.string(),
  image: z.string(),
  location: z.object({ name: z.string() }),
})

export const CharactersResponseSchema = z.object({
  info: z.object({
    count: z.number(),
    pages: z.number(),
  }),
  results: z.array(CharacterSchema),
})

export type Character = z.infer<typeof CharacterSchema>
