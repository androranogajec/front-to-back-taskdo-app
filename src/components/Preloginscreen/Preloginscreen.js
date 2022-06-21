import React from "react";
import { Link } from "react-router-dom";
import s from "./preloginscreen.module.css";

function Preloginscreen() {
  return (
    <div className={s.wrapper}>
      <div className={s.center}>
        <div className={s.header}>TaskDo</div>
        <div className={s.headerText}>Manage Your Task Checklist Easily</div>
        <button className={s.button}>
          <Link className={s.buttonInner} to="/Auth">
            <span className={s.text}>Lets Start</span>
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Preloginscreen;
