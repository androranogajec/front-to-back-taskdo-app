import axios from "axios";

/* API URL */
const URL = "http://localhost:8080/api";

/* 


API FOR TASKS


*/

export function getAllTasks() {
  return axios.get(`${URL}/tasks`);
}

export function getAllTasksByUserId(userId) {
  return axios.get(`${URL}/tasks/${userId}`);
}

export function postTask(task, userId) {
  return axios.post(`${URL}/tasks/postTask`, task, userId);
}

export function patchTask(id, task) {
  return axios.patch(`${URL}/${id}`, task);
}

export function deleteTaskById(id) {
  return axios.delete(`${URL}/tasks/deleteTaskById/${id}`);
}

export function deleteAllTasksByUserId(userId) {
  return axios.delete(`${URL}/tasks/deleteAllTasksByUserId/${userId}`);
}

/* 


API FOR USERS



*/

export function postUser(user) {
  return axios.post(`${URL}/users/postUser`, user);
}
/* login */
export function login(user) {
  return axios.post(`${URL}/users/login`, user);
}

/* logout */
export function logout(userId, accessToken) {
  return axios.post(`${URL}/users/logout`, userId, {
    headers: { authorization: accessToken },
  });
}
