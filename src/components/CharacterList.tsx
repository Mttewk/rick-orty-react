import type { Character } from '../schema'
import { CharacterCard } from './CharacterCard'

type CharacterListProps = {
  characters: Character[]
  selectedIds: number[]
  onToggle: (id: number) => void
}

export function CharacterList({ characters, selectedIds, onToggle }: CharacterListProps) {
  return (
    <ul className="character-list">
      {/* key — стабильный id из API, а не индекс (слайд 119) */}
      {characters.map((character) => (
        <li key={character.id}>
          <CharacterCard
            character={character}
            selected={selectedIds.includes(character.id)}
            onToggle={onToggle}
          />
        </li>
      ))}
    </ul>
  )
}
