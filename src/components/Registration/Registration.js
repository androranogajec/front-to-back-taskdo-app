import React, { useEffect, useState } from "react";
import s from "./registration.module.css";
import { postUser } from "../../services/api";
import validator from "validator";

function Registration(props) {
  /* useContext */
  const [user, setUser] = useState({
    username: "",
    name: "",
    password: "",
    passwordCheck: "",
    email: "",
  });
  const [userBoolen, setUserBoolean] = useState({
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
    function test() {
      let userValidation = {};
      for (const property in user) {
        if (property === "username") {
          userValidation.username = validator.isLength(
            user[property].toString(),
            { min: 0, max: 24 }
          );
        }

        if (property === "name") {
          userValidation.name = validator.isLength(user[property].toString(), {
            min: 0,
            max: 24,
          });
        }

        if (property === "email") {
          userValidation.email =
            validator.isLength(user[property].toString(), {
              min: 0,
              max: 42,
            }) && validator.isEmail(user[property].toString());
        }

        if (property === "password") {
          userValidation.password = validator.isLength(
            user[property].toString(),
            {
              min: 0,
              max: 42,
            }
          );
        }

        if (property === "passwordCheck") {
          userValidation.passwordCheck = validator.isLength(
            user[property].toString(),
            {
              min: 0,
              max: 42,
            }
          );
        }

        if (user["password"] !== user["passwordCheck"]) {
          userValidation.password = false;
          userValidation.passwordCheck = false;
        }
      }
      return userValidation;
    }
    console.log(user, test());
   /*  try {
      let data = await postUser(user);
      console.log(data);
    } catch (error) {
      console.log(error);
    } */
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
