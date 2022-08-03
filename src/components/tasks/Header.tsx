import React from "react";
import s from "./tasks.module.css";
import { logout, refreshToken, getAllUsers } from "../../services/api";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {setToken} from "../../types/props"

function Header(props: setToken) {
  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();
  
/* 


INTERCEPTORS 


*/

const axiosJWT = axios.create();
axiosJWT.interceptors.request.use(
  async (config) => {
    /* get current date */
    let currentDate = Date.now();
    /* decode it */
    const decodedToken: any = jwtDecode(token.accessToken);
    /* compare decoded date with current date */
    if (decodedToken.exp * 1000 < new Date(currentDate).getTime()) {
      /* await from the backend new access token */
      let data = await refreshToken(token.userId);
      /* set it to valid object */
      //@ts-ignore
      data = { userId: token.userId, accessToken: data.data.accessToken };
      setToken(data);
      props.setToken(data);
      //@ts-ignore
      config.headers["authorization"] = data.accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

  async function handleLogout() {
    const userId = token.userId;
    const accessToken = token.accessToken;
    try {
      let response = await logout(userId, accessToken, axiosJWT);
      window.localStorage.removeItem("token");
      navigate("/", { replace: true });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

 /*  async function handleUsers() {
    try {
      let users = await getAllUsers(token.accessToken, axiosJWT);
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  } */

  
  return (
    <div className={s.a}>
      <div className={s.userData}>
        <div>avatar</div>
        <div>name</div>
        <div>pending</div>
      </div>
     {/*  <div onClick={handleUsers}>get all users</div> */}
      <div className={s.title}>TaskDo</div>
      <div className={s.logout} onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
}

export default Header;
