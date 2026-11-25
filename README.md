# Рик и Морти — каталог персонажей


**Сайт:** `https://mttewk.github.io/rick-orty-react/` 

## Участники

- Абрамов Матвей
- Шакиров Айдар
- Лунин Роман

## API

[Rick and Morty API](https://rickandmortyapi.com/) — без ключа, по HTTPS, с CORS. Входит в список [public-apis](https://github.com/public-apis/public-apis) (Games & Comics).

```
GET https://rickandmortyapi.com/api/character/?name=rick&status=alive&page=1
```

Документация: https://rickandmortyapi.com/documentation/#character

## Запуск

Нужен Node.js 20.19+ (или 22+) и npm.

```bash
npm install     # зависимости
npm run dev     # сервер разработки, http://localhost:5173
```

## Сборка и проверка

```bash
npm run build   # проверка типов (tsc) и сборка Vite, результат в dist/
npm run preview # посмотреть сборку локально
npm run lint    # oxlint
```

Публикуется содержимое `dist/`. Если ломается проверка типов, `build` падает до сборки Vite.

## Публикация на GitHub Pages

В репозитории есть `.github/workflows/deploy.yml`: он собирает проект и выкладывает `dist/` при каждом пуше в `main`.

1. Создайте репозиторий и запушьте в `main`.
2. Settings → Pages → Source: **GitHub Actions**.
3. Дождитесь зелёной галочки во вкладке Actions. Адрес сайта появится в Settings → Pages.

## Как устроено

```
Catalog                 хранит общее состояние: запрос, статус, страница, выбранные id
├─ Search               управляемое поле: value + onChange
├─ StatusSelect         выбор статуса
├─ Button               одна кнопка, варианты primary / secondary
├─ Results              loading | error | пусто | список (сужение по status)
│  └─ CharacterList     map + key={id}
│     └─ CharacterCard  карточка, кнопка «Выбрать»
└─ Pager                страницы
```

| Файл | Что внутри |
| --- | --- |
| `src/schema.ts` | схема Zod; тип `Character` выводится из неё через `z.infer` |
| `src/types.ts` | `StatusFilter`, `CharactersQuery`, `LoadState` (union из loading / error / ready) |
| `src/api.ts` | `getCharacters`: проверка `response.ok`, 404 как «ничего не найдено», разбор JSON через Zod |
| `src/hooks/useCharacters.ts` | эффект загрузки: флаг `ignore` и `AbortController` против ответов не по порядку |
| `src/components/` | компоненты по БЭМ (`button_variant_primary`, `character-card__title` и т. д.) |

Что из лекции использовано:

- **Props и типы.** У каждого компонента есть тип props, `strict: true` в tsconfig.
- **Состояние у родителя.** `Catalog` хранит данные, дочерние компоненты получают значения и callbacks.
- **Неизменяемость.** Выбор персонажей — через `setSelectedIds(ids => [...ids, id])` и `filter`, без `push` и `splice`.
- **Эффекты.** Загрузка при смене запроса, пауза 400 мс после ввода (cleanup сбрасывает таймер), `document.title` с числом выбранных.
- **Проверка ответа.** Тип после `:` JSON не проверяет, поэтому структуру ответа проверяет Zod. Битый ответ даёт сообщение об ошибке и кнопку повтора.
