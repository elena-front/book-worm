import { useState } from "react";
import "./AuthPage.css";
import SignUpForm from "../../features/auth/ui/SignUpForm/SignUpForm";
import SignInForm from "../../features/auth/ui/SignInForm/SignInForm";

const AUTH_MODES = {
  SIGN_IN: "sign_in",
  SIGN_UP: "sign_up",
};

function AuthPage({setUser}) {
  const [mode, setMode] = useState(AUTH_MODES.SIGN_IN);

  return (
    <main className="authPage">
      <span className="mainIcon">📚</span>
      <h1>Книжный червь</h1>
      {mode === AUTH_MODES.SIGN_UP && <p>Создайте аккаунт</p>}
      {mode === AUTH_MODES.SIGN_IN && <p>Войдите, чтобы продолжить</p>}

      <div className="regWrapper">
        <div className="modeWrapper">
          <button
            onClick={() => setMode(AUTH_MODES.SIGN_IN)}
            className={mode === AUTH_MODES.SIGN_IN ? "activeMode" : ""}
          >
            Вход
          </button>
          <button
            onClick={() => setMode(AUTH_MODES.SIGN_UP)}
            className={mode === AUTH_MODES.SIGN_UP ? "activeMode" : ""}
          >
            Регистрация
          </button>
        </div>

        <div className="formWrapper">
          {mode === AUTH_MODES.SIGN_IN && <SignInForm setUser={setUser}/>}
          {mode === AUTH_MODES.SIGN_UP && <SignUpForm setUser={setUser}/>}
        </div>
      </div>
    </main>
  );
}

export default AuthPage;
