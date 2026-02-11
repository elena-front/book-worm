import { useState } from "react";
import "./App.css";
import AppRouter from "./app/routing/AppRouter";

// Компонент React - это функция
function App() {
  const [user, setUser] = useState(null);

  return <AppRouter />;
}

export default App;
