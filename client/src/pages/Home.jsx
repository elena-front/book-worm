export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <h1 className="hero__title">
            Откройте мир книг 📖
          </h1>

          <p className="hero__subtitle">
            Делитесь впечатлениями, обсуждайте любимые произведения и находите новые книги для чтения
          </p>

          <div className="search">
            <div className="search__icon" aria-hidden="true">🔎</div>
            <input
              className="search__input"
              type="search"
              placeholder="Поиск по названию или автору..."
            />
          </div>
        </div>
      </section>

      <section className="catalog">
        <div className="container">
          <div className="grid">
            <article className="card">
              <button
                className="fav"
                type="button"
                aria-label="В избранное"
                aria-pressed="false"
              >
                ♥
              </button>

              <div className="card__media"></div>

              <div className="card__body">
                <h3 className="card__title">Название книги</h3>
                <p className="card__author">Автор</p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
