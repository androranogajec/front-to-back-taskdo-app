import React from 'react'
import s from "./tasks.module.css";
import {
   logout
  } from "../../services/api";
import { useLocalStorage } from '../Hooks/useLocalStorage';

function Header(props) {
const [token, setToken] = useLocalStorage("token","");

    async function handleLogout(){
        const userId = token.userId;
        const accessToken = token.accessToken;
        try{
            let response = await logout(userId, accessToken);
            console.log(response.data)
        }
        catch(error){
            console.log(error)
        }
        /* window.localStorage.removeItem("token"); */
        console.log(userId);

      }

  return (
    <div className={s.a}>
        <div className={s.userData}>
          <div>avatar</div>
          <div>name</div>
          <div>pending</div>
        </div>
        <div className={s.title}>TaskDo</div>
        <div className={s.logout} onClick={handleLogout}>Logout</div>
      </div>
  )
}

export default Header