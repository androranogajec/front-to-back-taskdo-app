import axios from "axios";

//api url
const URL = 'http://localhost:8080/api'; 

export function getTasks() {
  return axios.get(`${URL}/tasks`);
}

export function postTask(task) {
  return axios.post(URL, task);
}

export function patchTask(id, task) {
  return axios.patch(`${URL}/${id}`, task);
}

export function deleteTask(id) {
  return axios.delete(URL + "/" + id);
}
