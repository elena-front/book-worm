import { useState } from "react";
import { useNavigate } from 'react-router';
import "./SignUpForm.css";
import { UserValidator } from "../../../../entities/user/model/UserValidator";
import UserApi from "../../../../entities/user/UserApi";

function SignUpForm({ setUser }) {
  const [signUpData, setSignUpData] = useState({ имя: "", email: "" });
  const navigate = useNavigate();
  console.log(setUser);

  const inputHandler = (event) => {
    setSignUpData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const signUpHandler = async (event) => {
    event.preventDefault();

    const { isValid, error: validationError } =
      UserValidator.validateSignUpData(signUpData);

    if (!isValid) {
      alert(validationError);
      return;
    }
    const { statusCode, data, error } = await UserApi.signUp(signUpData);
    if (statusCode === 200) {
      setAccessToken(data.accessToken);
      setUser(data.user);
      navigate("/tasks");
      setSignUpData(initialValue);
    } else {
      alert(error || "Ошибка при входе в приложение");
    }
  };

  return (
    <>
      <div className="authWrapper">
        <button className="btn">📧 Email</button>
        <button disabled className="btn btn--disabled">
          📱 Телефон
        </button>
      </div>

      <form className="form" onSubmit={signUpHandler}>
        <div className="inputGroup">
          <label htmlFor="name">Имя</label>
          <input
            id="name"
            placeholder="ваше имя"
            name="name"
            type="text"
            required
            onChange={inputHandler}
            value={signUpData.name}
            label="Email"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="you@example.com"
            name="email"
            type="email"
            required
            onChange={inputHandler}
            value={signUpData.email}
            label="Email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            placeholder="*****"
            name="password"
            type="password"
            required
            onChange={inputHandler}
            value={signUpData.password}
            label="Пароль"
          />
        </div>

        <button className="btn btn--active m20" type="submit">Зарегистрироваться</button>
      </form>
    </>
  );
}

export default SignUpForm;
