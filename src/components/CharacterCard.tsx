import type { Character } from '../schema'
import { Button } from './Button'

const STATUS_LABELS: Record<Character['status'], string> = {
  Alive: 'Живой',
  Dead: 'Мёртвый',
  unknown: 'Неизвестно',
}

type CharacterCardProps = {
  character: Character
  selected: boolean
  onToggle: (id: number) => void
}

/** Карточка одного персонажа. Выбранное состояние хранит родитель, карточка только сообщает о клике. */
export function CharacterCard({ character, selected, onToggle }: CharacterCardProps) {
  const { id, name, status, species, gender, image, location } = character

  return (
    <article className={`character-card${selected ? ' character-card_selected' : ''}`}>
      <img
        className="character-card__image"
        src={image}
        alt={name}
        width={300}
        height={300}
        loading="lazy"
      />
      <div className="character-card__body">
        <h2 className="character-card__title">{name}</h2>
        <span
          className={`character-card__badge character-card__badge_status_${status.toLowerCase()}`}
        >
          {STATUS_LABELS[status]}
        </span>
        <p className="character-card__meta">{[species, gender].filter(Boolean).join(' · ')}</p>
        <p className="character-card__meta">Локация: {location.name}</p>
        <Button
          variant={selected ? 'primary' : 'secondary'}
          pressed={selected}
          onClick={() => onToggle(id)}
        >
          {selected ? 'Выбран' : 'Выбрать'}
        </Button>
      </div>
    </article>
  )
}
