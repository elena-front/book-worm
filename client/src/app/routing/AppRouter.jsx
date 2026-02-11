import { Routes, Route } from "react-router";
import Layout from "../routing/Layout/Layout";
import { CLIENT_ROUTES } from "../../shared/consts/clientRoutes";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          path={CLIENT_ROUTES.MAIN_PAGE}
          element={<>Тут будет красиво</>}
        />
      </Route>
    </Routes>
  );
}
