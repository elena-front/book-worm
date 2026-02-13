import { useState, useEffect } from "react";
import "./App.css";
import AppRouter from "./app/routing/AppRouter";
import UserApi from "./entities/user/UserApi";

// Компонент React - это функция
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function refreshUser() {
      const { data, statusCode, error } = await UserApi.refresh();

      if (statusCode === 200) {
        setUser(data.user);
      } else {
        console.error(error);
      }
    }
    refreshUser();
  }, []);

  return <AppRouter setUser={setUser} user={user} />;
}

export default App;
