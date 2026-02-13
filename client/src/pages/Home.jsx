import { useEffect, useState } from "react";
import { axiosInstance } from "../shared/lib/axiosInstance";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await axiosInstance.get("/books"); // ✅ через vite proxy

        // бек возвращает массив, но оставим поддержку обоих форматов
        const list = Array.isArray(data) ? data : (data?.data ?? []);
        setBooks(list);
      } catch (e) {
        console.error(e);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

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
            />
          </div>
        </div>
      </section>

      <section className="catalog">
        <div className="container">
          {loading && <div style={{ padding: 16 }}>Загрузка...</div>}

          {!loading && books.length === 0 && (
            <div style={{ padding: 16, color: "#7a6f66" }}>
              Пока нет книг. Добавьте первую на странице “Добавить книгу”.
            </div>
          )}

          <div className="grid">
            {!loading &&
              books.map((b) => (
                <article className="card" key={b.id}>
                  <button
                    className="fav"
                    type="button"
                    aria-label="В избранное"
                    aria-pressed={b.isFavorite ? "true" : "false"} // пока всегда false, позже подключим favorites
                  >
                    ♥️
                  </button>

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
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // пока нет реального auth — тестовый user_id
//   const userId = 1;

//   useEffect(() => {
//     async function load() {
//       try {
//         // 1) грузим книги
//         const booksRes = await fetch("/books");
//         if (!booksRes.ok) throw new Error("Не удалось загрузить книги");
//         const booksData = await booksRes.json();
//         const booksList = Array.isArray(booksData)
//           ? booksData
//           : (booksData?.data ?? []);

//         // 2) грузим favorites пользователя
//         const favRes = await fetch(`/favorites/${userId}`);
//         if (!favRes.ok) throw new Error("Не удалось загрузить избранное");
//         const favData = await favRes.json();
//         const favList = Array.isArray(favData)
//           ? favData
//           : (favData?.data ?? []);
//         const favBookIds = new Set(favList.map((f) => f.book_id));

//         // 3) собираем книги с флагом isFavorite
//         const merged = booksList.map((b) => ({
//           ...b,
//           isFavorite: favBookIds.has(b.id),
//         }));

//         setBooks(merged);
//       } catch (e) {
//         console.error(e);
//         setBooks([]);
//       } finally {
//         setLoading(false);
//       }
//     }

//     load();
//   }, []);
//   async function deleteBook(bookId) {
//     try {
//       const res = await fetch(`/books/${bookId}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Не удалось удалить книгу");

//       // убрать карточку из списка
//       setBooks((prev) => prev.filter((b) => b.id !== bookId));
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   async function toggleFavorite(book) {
//     try {
//       // оптимистично обновим UI сразу
//       setBooks((prev) =>
//         prev.map((b) =>
//           b.id === book.id ? { ...b, isFavorite: !b.isFavorite } : b,
//         ),
//       );

//       if (!book.isFavorite) {
//         // добавить
//         const res = await fetch("/favorites", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ user_id: userId, book_id: book.id }),
//         });

//         if (!res.ok) throw new Error("Не удалось добавить в избранное");
//       } else {
//         // удалить
//         const res = await fetch("/favorites", {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ user_id: userId, book_id: book.id }),
//         });

//         if (!res.ok) throw new Error("Не удалось удалить из избранного");
//       }
//     } catch (e) {
//       console.error(e);

//       // откат UI если ошибка
//       setBooks((prev) =>
//         prev.map((b) =>
//           b.id === book.id ? { ...b, isFavorite: book.isFavorite } : b,
//         ),
//       );
//     }
//   }

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
//                     onClick={() => toggleFavorite(b)}
//                     style={{ opacity: b.isFavorite ? 1 : 0.6 }}
//                   >
//                     ♥️
//                   </button>
//                   {/* <button type="button" onClick={() => deleteBook(b.id)}>
//                     🗑
//                   </button> */}

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
