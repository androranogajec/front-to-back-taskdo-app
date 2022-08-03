import React from "react";
import s from "../NoMatch/noMatch.module.css";
function NoMatch() {
  return (
    <div className={s.wrapper}>
      <div className={s.text}>
        The page you were looking for was not found <br></br> or not
        authenticated :(
      </div>
    </div>
  );
}

export default NoMatch;
