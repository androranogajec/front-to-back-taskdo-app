import s from "./auth.module.css";
import {
  isUser,
  isPasswordMatch,
  isEveryFieldTrue,
  filterUserObjectFromPasswordMatch,
  setPasswordToFalse,
} from "../Validators/users/user";
import { useState } from "react";
import { authentication } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";
import { useLocalStorage } from "../Hooks/useLocalStorage";

const initUserString = { username: "", password: "" };

function Auth() {
  const [user, setUser] = useState(initUserString);
  const [token, setToken] = useLocalStorage("token", "");
  console.log('token auth',token);
 /*  window.localStorage.clear('token') */
  const navigate = useNavigate();

  function handleInputChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    setUser({ ...user, [name]: value });
  }
  
  async function getUser(token) {
    try {
      const { data } = await login(token);
    console.log(data)
    } catch (error) {
      console.log(error);
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      let token = await authentication(user);
      if (token.data) {
        setToken(token.data)
        getUser(token.data);
       /*  navigate("/tasks", { replace: true }); */
      } else {
        console.log(`user doesn't exist`);
      }
      console.log(token)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={s.wrapper}>
      <div className={s.wrapperInner}>
        <form onSubmit={handleSubmit} className={s.upperBlock}>
          <label className={s.upperBlockInner}>
            <p className={s.inputText}>Username</p>
            <input
              required
              value={user.username}
              name="username"
              onChange={handleInputChange}
              className={s.inputField}
              type="text"
            />
          </label>
          <label className={s.upperBlockInner}>
            <p className={s.inputText}>Password</p>
            <input
              required
              value={user.password}
              name="password"
              onChange={handleInputChange}
              className={s.inputField}
              type="password"
            />
          </label>
          <br></br>
          <button className={s.button} type="submit">
            <span className={s.text}>Submit</span>
          </button>
        </form>
        <div className={s.lowerBlock}></div>
      </div>
    </div>
  );
}

export default Auth;
