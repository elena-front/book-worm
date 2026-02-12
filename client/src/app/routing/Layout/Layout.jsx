import { Outlet, NavLink, Link } from "react-router";

export default function Layout() {
  return (
    <>
      <header className="header">
        <div className="container header__inner">
          <Link to="/" className="brand">
            <span className="brand__logo" aria-hidden="true" />
            <span className="brand__text">📚 Книжный червь</span>
          </Link>

          <nav className="nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav__link ${isActive ? "nav__link--active" : ""}`
              }>
              📕 Главная
            </NavLink>

            <NavLink
              to="/add"
              className={({ isActive }) =>
                `nav__link ${isActive ? "nav__link--active" : ""}`
              }>
              + Добавить книгу
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `nav__link ${isActive ? "nav__link--active" : ""}`
              }>
              ♡︎ ︎Избранное
            </NavLink>
          </nav>

          <div className="header__actions">
            <Link to="/login" className="btn btn--ghost">
              ⎆ Войти
            </Link>
          </div>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <span>© 2026 ООО "Книжный червь"</span>
        </div>
      </footer>
    </>
  );
}
