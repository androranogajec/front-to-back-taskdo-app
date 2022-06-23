import React from "react";
import s from "./auth.module.css";

function Auth() {
  return (
    <div className={s.wrapper}>
      <div className={s.wrapperInner}>
        <form className={s.upperBlock}>
          <label className={s.upperBlockInner}>
            <p className={s.inputText}>Username</p>
            <input className={s.inputField} type="text" />
          </label>
          <label className={s.upperBlockInner}>
            <p className={s.inputText}>Password</p>
            <input className={s.inputField} type="password" />
          </label>
        </form>
        <div className={s.lowerBlock}>
          <button className={s.button} type="submit">
            <span className={s.text}>Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
