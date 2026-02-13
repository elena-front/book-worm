import { Outlet, NavLink, Link } from "react-router";
import { CLIENT_ROUTES } from "../../../shared/consts/clientRoutes";
import "./Layout.css";
import UserApi from "../../../entities/user/UserApi";

export default function Layout({ user, setUser }) {
  const handleSignOut = async () => {
   // await UserApi.signOut();
    setUser(null);
  };

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
              }
            >
              📕 Главная
            </NavLink>

            <NavLink
              to="/add"
              className={({ isActive }) =>
                `nav__link ${isActive ? "nav__link--active" : ""}`
              }
            >
              + Добавить книгу
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `nav__link ${isActive ? "nav__link--active" : ""}`
              }
            >
              ♡︎ ︎Избранное
            </NavLink>
          </nav>

          <div className="header__actions">
            {!user && (
              <Link to={CLIENT_ROUTES.AUTH} className="btn btn--ghost">
                ⎆ Войти
              </Link>
            )}

            {user && (
              <div className="authArea">
                Привет, {user}
                <button onClick={handleSignOut} className="btn btn--ghost">
                  Выйти
                </button>
              </div>
            )}
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
