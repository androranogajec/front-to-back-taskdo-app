import React, { useState } from "react";
import s from "./registration.module.css";
import { postUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
  isUser,
  isPasswordMatch,
  isEveryFieldTrue,
  filterUserObjectFromPasswordMatch,
  setPasswordToFalse,
} from "../Validators/users/user";


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



function Registration(props: any) {
  const [user, setUser] = useState(userStringInit);
  const [userBoolean, setUserBoolean] = useState(userBooleanInit);

  /* navigate to tasks if user is validated */
  const navigate = useNavigate();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  }
  async function backendCallandNavigateAndSetCurrentContextWithToken(
    validatedUser: any
  ) {
    try {
      //await the token from backend
      let token = await postUser(validatedUser);
      props.setToken(token.data);
      navigate("/tasks", { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (isPasswordMatch(user)) {
      setUserBoolean(userBooleanInit);
        //@ts-ignore
      if (isEveryFieldTrue(isUser(filterUserObjectFromPasswordMatch(user)))) {
        let validatedUser = filterUserObjectFromPasswordMatch(user);
        setUser(userStringInit);
        backendCallandNavigateAndSetCurrentContextWithToken(validatedUser);
      } else {
        /*if not every true setUserBoolean needed fields to false values */
          //@ts-ignore
        setUserBoolean(isUser(filterUserObjectFromPasswordMatch(user)));
      }
    } else {
      /* passwords don't match,setPassword field to false */
      
      setUserBoolean(
          //@ts-ignore
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
              value={user.name}
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
              value={user.email}
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
              value={user.password}
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
              value={user.passwordCheck}
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
