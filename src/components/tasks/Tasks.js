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
import Header from './Header'
function Tasks(props) {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");

  function handleInputChange(event) {
    setCurrentTask(event.target.value);
  }

  async function handlePost(event) {
    let tasksCopy = [...tasks];
    event.preventDefault();
    try {
      const { data } = await postTask({
        task: currentTask,
      });
      tasksCopy.push(data);
      setTasks(tasksCopy);
      setCurrentTask("");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    let tasksCopy = [...tasks];
    try {
      await deleteTaskById(id);
      tasksCopy = tasksCopy.filter(function (e) {
        if (e._id !== id) {
          return e;
        }
        return null;
      });
      setTasks(tasksCopy);
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePatch(id) {
    let tasksCopy = [...tasks];
    let completed = "";
    tasksCopy.map(function (e) {
      if (e._id === id) {
        if (e.completed) {
          e.completed = false;
          completed = false;
        } else {
          e.completed = true;
          completed = true;
        }
      }
      console.log(completed);
    });
    /* ошибка в том что я обновляю стейт локально но не отсылаю на бэк по итогу расинхрон */
    try {
      await patchTask(id, { completed });
      /*    setTasks(tasksCopy) */
    } catch (error) {
      console.log(error);
    }
  }

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
