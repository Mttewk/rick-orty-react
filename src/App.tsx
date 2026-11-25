import { Catalog } from './components/Catalog'

export default function App() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-header__title">Рик и Морти</h1>
        <p className="page-header__subtitle">
          Каталог персонажей из публичного API: ищите, фильтруйте и выбирайте
        </p>
      </header>

      <Catalog />

      <footer className="page-footer">
        Данные:{' '}
        <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener">
          Rick and Morty API
        </a>{' '}
        · список API:{' '}
        <a href="https://github.com/public-apis/public-apis" target="_blank" rel="noopener">
          public-apis
        </a>
      </footer>
    </>
  )
}
