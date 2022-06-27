import React, { useEffect, useState } from "react";
import s from "./registration.module.css";
import { postUser } from "../../services/api";
import { isUser, isSemiFilterUserObject } from "../Validators/users/user";

function Registration(props) {
  /* useContext */
  const [user, setUser] = useState({
    username: "",
    name: "",
    password: "",
    passwordCheck: "",
    email: "",
  });

  const [userBoolean, setUserBoolean] = useState({
    username: true,
    name: true,
    password: true,
    passwordCheck: true,
    email: true,
  });

  useEffect(() => {}, []);

  function handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
   /*  setUserBoolean(isSemiUserValidate(user)) */
 /*    console.log("init", user, "modified", isUser(user)); */
    console.log(isSemiFilterUserObject(isUser(user),user))
   
  }


  return (
    <div className={s.wrapper}>
      <div className={s.wrapperInner}>
        <form className={s.upperBlock} onSubmit={handleSubmit}>
          <label className={s.upperBlockInner}>
            <p className={s.inputText}>Username</p>
            <span className={s.error}>username is too long</span>
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
            <p className={s.inputText}>Name</p>
            <span className={s.error}>name is too long</span>
            <input
              required
              name="name"
              onChange={handleInputChange}
              className={s.inputField}
              type="text"
            />
          </label>
          <label className={s.upperBlockInner}>
            {userBoolean.passwordCheck && userBoolean.password ? (
              <span className={s.error}>email is invalid</span>
            ) : null}
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
          {userBoolean.passwordCheck && userBoolean.password ? (
              null
            ) : <span className={s.error}>passwords don't match</span>}
            
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
