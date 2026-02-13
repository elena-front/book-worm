import { useEffect, useState } from "react";

export default function Favorites() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = 1;

  useEffect(() => {
    async function loadFavorites() {
      try {
        const favRes = await fetch(`/favorites/${userId}`);
        if (!favRes.ok) throw new Error("Ошибка загрузки избранного");
        const favData = await favRes.json();
        const favorites = Array.isArray(favData)
          ? favData
          : (favData?.data ?? []);
        const favBookIds = new Set(favorites.map((f) => f.book_id));

        const booksRes = await fetch("/books");
        if (!booksRes.ok) throw new Error("Ошибка загрузки книг");
        const booksData = await booksRes.json();
        const allBooks = Array.isArray(booksData)
          ? booksData
          : (booksData?.data ?? []);

        const onlyFavBooks = allBooks.filter((b) => favBookIds.has(b.id));
        setBooks(onlyFavBooks);
      } catch (e) {
        console.error(e);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, []);

  return (
    <section className="favPage">
      <div className="container">
        <div className="favHeader">
          <h1 className="favHeader__title">
            <span className="favHeader__icon">♡</span>
            Избранное
          </h1>
          <p className="favHeader__sub">Книги, которые вы сохранили</p>
        </div>

        {loading ? (
          <div className="favEmpty">
            <div className="favEmpty__img" aria-hidden="true">
              📚
            </div>
            <div className="favEmpty__title">Загрузка…</div>
            <div className="favEmpty__text">Подождите немного</div>
          </div>
        ) : books.length === 0 ? (
          <div className="favEmpty">
            <div className="favEmpty__img" aria-hidden="true">
              📚
            </div>
            <div className="favEmpty__title">Список избранного пуст</div>
            <div className="favEmpty__text">
              Нажмите <span className="favEmpty__heart">❤</span> на карточке
              книги, чтобы добавить её сюда
            </div>
          </div>
        ) : (
          <div className="grid">
            {books.map((b) => (
              <article className="card" key={b.id}>
                <div className="card__media">
                  {b.photo_url && (
                    <img
                      src={b.photo_url}
                      alt={b.name}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 12,
                      }}
                    />
                  )}
                </div>

                <div className="card__body">
                  <h3 className="card__title">{b.name}</h3>
                  <p className="card__author">{b.author}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
