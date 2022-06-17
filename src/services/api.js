import axios from "axios";
//api url
const apiUrl = axios.create({
  baseURL:"http://localhost:8080/api/tasks"
})

export function getTasks() {
  return axios.get(apiUrl);
}

export function postTask(task) {
  return axios.post(apiUrl, task);
}

export function patchTask(id, task) {
  return axios.patch(`${apiUrl}/${id}`, task);
}

export function deleteTask(id) {
  return axios.delete(apiUrl + "/" + id);
}
