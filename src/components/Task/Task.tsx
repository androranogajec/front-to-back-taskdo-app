import React from "react";
import logo from "../../images/trash2.svg";

function Task(props: any) {
  console.log(props);
  return (
    <div key={props.value._id}>
      <img
        src={logo}
        alt="logo"
        onClick={() => props.handleDelete(props.value._id)}
      />
      <span>
        <input
          type="checkbox"
          onClick={() => props.handlePatch(props.value._id)}
        />
        {props.value.task}
      </span>
    </div>
  );
}

export default Task;
