import { Routes, Route } from "react-router";
import Layout from "../routing/Layout/Layout";
import Favorites from "../../pages/Favorites";
import Home from "../../pages/Home";
import { CLIENT_ROUTES } from "../../shared/consts/clientRoutes";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
}
