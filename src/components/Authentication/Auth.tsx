import s from "./auth.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import { setToken } from "../../types/props";
const initUserString = { username: "", password: "" };



function Auth(props: setToken) {
  const [user, setUser] = useState(initUserString);
  const [token, setToken] = useLocalStorage("token", "");
  console.log("token auth", token);

  const navigate = useNavigate();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    let name = event.target.name;
    let value = event.target.value;
    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      let tokenAndUserId = await login(user);
      setToken(tokenAndUserId.data);
      props.setToken(tokenAndUserId.data);
      navigate("/tasks", { replace: true });
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