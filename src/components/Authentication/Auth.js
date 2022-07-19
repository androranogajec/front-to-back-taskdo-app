import React, { useContext } from "react";
import s from "./auth.module.css";
import {
  isUser,
  isPasswordMatch,
  isEveryFieldTrue,
  filterUserObjectFromPasswordMatch,
  setPasswordToFalse,
} from "../Validators/users/user";
import { UserContext } from "../UserContext";
import { useState } from "react";
import { isSemiGetToken } from "../../services/api";
import { useNavigate } from "react-router-dom";

const initUserString = { username: "", password: "" };


function Auth() {
  const [user, setUser] = useState(initUserString);
  const tokenContext = useContext(UserContext);
  const navigate = useNavigate();
  
  function handleInputChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let token = await isSemiGetToken(user);
    if (token.data) {
      tokenContext.setToken(token.data);
      navigate("/tasks", {replace : true});
    } else {
      console.log(`user doesn't exist`);
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
