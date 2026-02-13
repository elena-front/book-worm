// import { useEffect, useState } from "react";

// export default function Home() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let cancelled = false;

//     async function load() {
//       setLoading(true);
//       try {
//         const res = await fetch("/books");
//         if (!res.ok) throw new Error("Не удалось загрузить книги");
//         const data = await res.json();
//         const list = Array.isArray(data) ? data : (data?.data ?? []);
//         if (!cancelled) setBooks(list);
//       } catch (e) {
//         console.error(e);
//         if (!cancelled) setBooks([]);
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }

//     load();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   return (
//     <>
//       <section className="hero">
//         <div className="container hero__inner">
//           <h1 className="hero__title">Откройте мир книг 📖</h1>
//           <p className="hero__subtitle">
//             Делитесь впечатлениями, обсуждайте любимые произведения и находите
//             новые книги для чтения
//           </p>

//           <div className="search">
//             <div className="search__icon" aria-hidden="true">
//               🔎
//             </div>
//             <input
//               className="search__input"
//               type="search"
//               placeholder="Поиск по названию или автору..."
//             />
//           </div>
//         </div>
//       </section>

//       <section className="catalog">
//         <div className="container">
//           {loading && <div style={{ padding: 16 }}>Загрузка...</div>}

//           {!loading && books.length === 0 && (
//             <div style={{ padding: 16, color: "#7a6f66" }}>
//               Пока нет книг. Добавьте первую на странице “Добавить книгу”.
//             </div>
//           )}

//           <div className="grid">
//             {!loading &&
//               books.map((b) => (
//                 <article className="card" key={b.id}>
//                   <button
//                     className="fav"
//                     type="button"
//                     aria-label="В избранное"
//                     aria-pressed={b.isFavorite ? "true" : "false"}
//                   >
//                     ♥️
//                   </button>

//                   <div className="card__media">
//                     {b.photo_url ? (
//                       <img
//                         src={b.photo_url}
//                         alt={b.name}
//                         loading="lazy"
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: "cover",
//                           borderRadius: 12,
//                         }}
//                       />
//                     ) : null}
//                   </div>

//                   <div className="card__body">
//                     <h3 className="card__title">{b.name}</h3>
//                     <p className="card__author">{b.author}</p>
//                     <p style={{ marginTop: 8, opacity: 0.8 }}>
//                       Рейтинг: {b.rating}
//                     </p>
//                   </div>
//                 </article>
//               ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { axiosInstance } from "../shared/lib/axiosInstance";

export default function Home({ user }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(() => {
      async function load() {
        setLoading(true);
        try {
          const q = search.trim();
          const url = q ? `/books?query=${encodeURIComponent(q)}` : `/books`;

          const res = await fetch(url);
          if (!res.ok) throw new Error("Не удалось загрузить книги");
          const data = await res.json();
          const list = Array.isArray(data) ? data : (data?.data ?? []);

          if (!cancelled) setBooks(list);
        } catch (e) {
          console.error(e);
          if (!cancelled) setBooks([]);
        } finally {
          if (!cancelled) setLoading(false);
        }
      }

      load();
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [search]);

  async function toggleFavorite(bookId) {
    // делаем простой "lock", чтобы не спамили запросами по 10 раз
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, _favLoading: true } : b)),
    );

    const current = books.find((b) => b.id === bookId);
    const isFav = Boolean(current?.isFavorite);

    try {
      if (!isFav) {
        await axiosInstance.post("/favorites", {
          user_id: user.id,
          book_id: bookId,
        });
      } else {
        await axiosInstance.delete("/favorites", {
          user_id: user.id,
          book_id: bookId,
        });
      }

      // обновляем UI
      setBooks((prev) =>
        prev.map((b) =>
          b.id === bookId
            ? { ...b, isFavorite: !isFav, _favLoading: false }
            : b,
        ),
      );
    } catch (e) {
      console.error(e);
      // если ошибка — просто снимаем лоадер и ничего не меняем
      setBooks((prev) =>
        prev.map((b) => (b.id === bookId ? { ...b, _favLoading: false } : b)),
      );
    }
  }

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <h1 className="hero__title">Откройте мир книг 📖</h1>
          <p className="hero__subtitle">
            Делитесь впечатлениями, обсуждайте любимые произведения и находите
            новые книги для чтения
          </p>

          <div className="search">
            <div className="search__icon" aria-hidden="true">
              🔎
            </div>

            <input
              className="search__input"
              type="search"
              placeholder="Поиск по названию или автору..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="catalog">
        <div className="container">
          {loading && <div style={{ padding: 16 }}>Загрузка...</div>}

          {!loading && books.length === 0 && (
            <div style={{ padding: 16, color: "#7a6f66" }}>
              {search.trim()
                ? "Ничего не найдено по вашему запросу."
                : "Пока нет книг. Добавьте первую на странице “Добавить книгу”."}
            </div>
          )}

          <div className="grid">
            {!loading &&
              books.map((b) => (
                <article className="card" key={b.id}>
                  {user && (
                    <button
                      className="fav"
                      type="button"
                      aria-label="В избранное"
                      aria-pressed={b.isFavorite ? "true" : "false"}
                      onClick={() => toggleFavorite(b.id)}
                      disabled={b._favLoading}
                      style={{ opacity: b._favLoading ? 0.6 : 1 }}
                    >
                      {b.isFavorite ? "❤️" : "🤍"}
                    </button>
                  )}

                  <div className="card__media">
                    {b.photo_url ? (
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
                    ) : null}
                  </div>

                  <div className="card__body">
                    <h3 className="card__title">{b.name}</h3>
                    <p className="card__author">{b.author}</p>
                    <p style={{ marginTop: 8, opacity: 0.8 }}>
                      Рейтинг: {b.rating}
                    </p>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
