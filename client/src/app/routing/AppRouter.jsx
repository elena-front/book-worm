import { Routes, Route } from "react-router";
import Layout from "../routing/Layout/Layout";
import Favorites from "../../pages/Favorites";
import Home from "../../pages/Home";
import { CLIENT_ROUTES } from "../../shared/consts/clientRoutes";
import { AuthPage } from "../../pages";
import ProtectedRoute from "../routing/ProtectedRoute";

export default function AppRouter({ user, setUser }) {
  return (
    <Routes>
      <Route
        path={CLIENT_ROUTES.MAIN_PAGE}
        element={<Layout user={user} setUser={setUser} />}
      >
        <Route index element={<Home />} />
        <Route
          path={CLIENT_ROUTES.FAVORITES}
          element={<ProtectedRoute user={user} element={<Favorites />} />}
        />
        <Route
        
          path={CLIENT_ROUTES.AUTH}
          element={<ProtectedRoute anonymous={true} user={user} element={<AuthPage setUser={setUser} />} />}
        ></Route>
      </Route>
    </Routes>
  );
}
