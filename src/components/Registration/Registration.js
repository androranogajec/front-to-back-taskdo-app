import React from 'react'
import s from "./registration.module.css";


function Registration() {
  return (
    <div className={s.wrapper}>
    <div className={s.wrapperInner}>
      <form className={s.upperBlock}>
        <label className={s.upperBlockInner}>
          <p className={s.inputText}>Username</p>
          <input className={s.inputField} type="text" />
        </label>
        <label className={s.upperBlockInner}>
          <p className={s.inputText}>Email</p>
          <input className={s.inputField} type="text" />
        </label>
        <label className={s.upperBlockInner}>
          <p className={s.inputText}>Password</p>
          <input className={s.inputField} type="text" />
        </label>
        <label className={s.upperBlockInner}>
          <p className={s.inputText}>Password</p>
          <input className={s.inputField} type="text" />
        </label>
      </form>
      <div className={s.lowerBlock}>
        <button className={s.button} type="submit">
          <span className={s.text}>Submit</span>
        </button>
      </div>
    </div>
  </div>
  )
}

export default Registration