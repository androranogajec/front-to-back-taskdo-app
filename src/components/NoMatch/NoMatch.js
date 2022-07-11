import React from "react";
import s from "../NoMatch/noMatch.module.css";
function NoMatch() {
  return (
    <div className={s.wrapper}>
      <div className={s.text}>Truly sorry, but the page you were looking for was not found :(</div>
    </div>
  );
}

export default NoMatch;
