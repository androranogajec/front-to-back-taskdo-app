import React, { useState } from "react";
import s from "./registration.module.css";

function Registration(props) {
  /* useContext */
  const [user, setUser] = useState({
    username: "",
    name: "",
    password: "",
    email: "",
  });

  function handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUser({...user, [name]: value});
    
  }
  function handleSubmit(event) {
    event.preventDefault();
    
    console.log(user)
  }
  return (
    <div className={s.wrapper}>
      <div className={s.wrapperInner}>
        <form className={s.upperBlock} onSubmit={handleSubmit}>
          <label className={s.upperBlockInner}>
            <p className={s.inputText}>Username</p>
            <input
              name="username"
              onChange={handleInputChange}
              className={s.inputField}
              type="text"
            />
          </label>
          <label className={s.upperBlockInner}>
            <p className={s.inputText}>Name</p>
            <input
              name="name"
              onChange={handleInputChange}
              className={s.inputField}
              type="text"
            />
          </label>
          <label className={s.upperBlockInner}>
            <p className={s.inputText}>Email</p>
            <input
              name="email"
              onChange={handleInputChange}
              className={s.inputField}
              type="text"
            />
          </label>
          <label className={s.upperBlockInner}>
            <p className={s.inputText}>Password</p>
            <input
              name="password"
              onChange={handleInputChange}
              className={s.inputField}
              type="text"
            />
          </label>
          <label className={s.upperBlockInner}>
            <p className={s.inputText}>Password</p>
            <input
              onChange={handleInputChange}
              className={s.inputField}
            
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
