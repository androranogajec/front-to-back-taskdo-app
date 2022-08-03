import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

/* API URL */
const URL: string = "http://localhost:8080/api";

/* 


API FOR TASKS


*/

export function getAllTasks() {
  return axios.get(`${URL}/tasks`);
}

export function getAllTasksByUserId(userId: AxiosRequestConfig) {
  return axios.get(`${URL}/tasks/${userId}`);
}

export function postTask(task: AxiosRequestConfig, userId: AxiosRequestConfig) {
  return axios.post(`${URL}/tasks/postTask`, task, userId);
}

export function patchTask(id: AxiosRequestConfig, task: AxiosRequestConfig) {
  return axios.patch(`${URL}/${id}`, task);
}

export function deleteTaskById(id: AxiosRequestConfig) {
  return axios.delete(`${URL}/tasks/deleteTaskById/${id}`);
}

export function deleteAllTasksByUserId(userId: AxiosRequestConfig) {
  return axios.delete(`${URL}/tasks/deleteAllTasksByUserId/${userId}`);
}

/* 


API FOR USERS



*/

/* get all users */
export function getAllUsers(token: AxiosRequestHeaders, axiosJWT: any) {
  return axiosJWT.get(`${URL}/users`, {
    headers: { authorization: token },
  });
}

export function postUser(user: AxiosRequestConfig) {
  return axios.post(`${URL}/users/postUser`, user);
}

/* login */
export function login(user: any) {
  return axios.post(`${URL}/users/login`, user);
}

/* logout */
export function logout(
  userId: AxiosRequestConfig,
  accessToken: AxiosRequestHeaders,
  axiosJWT: any
) {
  return axiosJWT.post(
    `${URL}/users/logout`,
    { userId },
    {
      headers: { authorization: accessToken },
    }
  );
}

/* 


TOKEN


*/

export function refreshToken(userId: AxiosRequestConfig) {
  return axios.post(`${URL}/users/refresh`, { userId });
}
