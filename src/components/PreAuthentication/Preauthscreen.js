import React from "react";
import { Link } from "react-router-dom";
import s from "./preauthscreen.module.css";

function Preauthscreen() {
  return (
    <div className={s.flexContainer}>
      <div className={s.row}>
        <div className={s.flexContainer_1}>
        <Link className={s.buttonInner} to="/auth">
        <span className={s.span}>Already have an account ?</span>
        </Link>
      </div>
      </div>
      <div className={s.row}>
        <div className={s.flexContainer_2}>
          <div className={s.header}>TaskDo</div>
          <div className={s.headerText}>Manage Your Task Checklist Easily</div>
          <button className={s.button}>
            <Link className={s.buttonInner} to="/reg">
              <span className={s.text}>Lets Start</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Preauthscreen;
