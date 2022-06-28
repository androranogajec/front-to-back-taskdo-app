import React, { useEffect, useState } from "react";
import s from "./registration.module.css";
import { postUser } from "../../services/api";
import {
  isUser,
  isPasswordMatch,
  isEveryTrue,
  filterUserObjectFromPasswordMatch,
  setPasswordToFalse,
} from "../Validators/users/user";

function Registration(props) {
  /* useContext */

  const userStringInit = {
    username: "",
    name: "",
    password: "",
    passwordCheck: "",
    email: "",
  };

  const userBooleanInit = {
    username: true,
    name: true,
    password: true,
    email: true,
  };

  const [user, setUser] = useState(userStringInit);
  const [userBoolean, setUserBoolean] = useState(userBooleanInit);

  useEffect(() => {}, []);

  function handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isPasswordMatch(user)) {
      /* 
      passwords match 
      init userBoolean 
      */
      setUserBoolean(userBooleanInit);
      if (isEveryTrue(isUser(filterUserObjectFromPasswordMatch(user)))) {
        let validatedUser = filterUserObjectFromPasswordMatch(user);
        /* 
        send to the backend 
         */
        console.log(validatedUser);
      } else {
        /* 
          something else doesn't match
          */
        setUserBoolean(isUser(filterUserObjectFromPasswordMatch(user)));
      }
    } else {
      /* 
      passwords don't match 
      */
      setUserBoolean(
        setPasswordToFalse(isUser(filterUserObjectFromPasswordMatch(user)))
      );
    }
  }

  return (
    <div className={s.wrapper}>
      <div className={s.wrapperInner}>
        <form className={s.upperBlock} onSubmit={handleSubmit}>
          <label className={s.upperBlockInner}>
            {userBoolean.username ? null : (
              <span className={s.error}>username is too long</span>
            )}
            <p className={s.inputText}>Username</p>
            <input
              value={user.username}
              required
              name="username"
              onChange={handleInputChange}
              className={s.inputField}
              type="text"
            />
          </label>
          <label className={s.upperBlockInner}>
            {userBoolean.name ? null : (
              <span className={s.error}>name is too long</span>
            )}
            <p className={s.inputText}>Name</p>
            <input
              required
              name="name"
              onChange={handleInputChange}
              className={s.inputField}
              type="text"
            />
          </label>
          <label className={s.upperBlockInner}>
            {userBoolean.email ? null : (
              <span className={s.error}>email is invalid</span>
            )}
            <p className={s.inputText}>Email</p>
            <input
              required
              name="email"
              onChange={handleInputChange}
              className={s.inputField}
              type="text"
            />
          </label>
          <label className={s.upperBlockInner}>
            {userBoolean.password ? null : (
              <span className={s.error}>passwords don't match</span>
            )}
            <p className={s.inputText}>Password</p>
            <input
              required
              name="password"
              onChange={handleInputChange}
              className={s.inputFieldPassword}
              type="text"
            />
          </label>
          <label className={s.upperBlockInner}>
            <p className={s.inputText}>Password</p>
            <input
              required
              name="passwordCheck"
              onChange={handleInputChange}
              className={s.inputFieldPassword}
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

export default Registration;
