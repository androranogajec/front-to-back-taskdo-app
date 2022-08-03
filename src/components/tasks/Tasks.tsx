import React from "react";
import { useState, useEffect } from "react";
import {
  postTask,
  getAllTasks,
  deleteTaskById,
  patchTask,
  getAllTasksByUserId,
  login,
} from "../../services/api";
import Input from "./Input";
import Task from "../Task/Task";
import s from "./tasks.module.css";
import Header from './Header';
import {setToken} from '../../types/props';

function Tasks(props: setToken) {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");


  return (
    <div className={s.gridContainer}>
      <Header setToken={props.setToken}/>
      <div className={s.b}>BBBBBBBBB</div>

      {/*   <Input
        currentTask={currentTask}
        handlePost={handlePost}
        handleInputChange={handleInputChange}
      /> */}
      {/*   {tasks.map((value, index) => {
        console.log(value);
        return (
            <Task
            value={value}
            handleDelete={handleDelete}
            handlePatch={handlePatch}
            key={value._id}
          />
          <div key={value._id}>
            <img
                src={logo}
              alt="logo"
              onClick={() => handleDelete(value._id)}
            />
            <span>
              <input type="checkbox" onClick={() => handlePatch(value._id)} />
              {value.task}
            </span>
          </div>
        );
      })} */}
    </div>
  );
}

export default Tasks;
