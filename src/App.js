import "./App.css";
import Tasks from "./components/Tasks/Tasks.js";
import Preauthscreen from "./components/PreAuthentication/Preauthscreen";
import NoMatch from "./components/NoMatch/NoMatch";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Authentication/Auth";
import Registration from "./components/Registration/Registration";
import { UserContext } from "./components/UserContext";
import { useLocalStorage } from './components/Hooks/useLocalStorage';

function App() {
  const [token, setToken] = useLocalStorage("token", "");
  console.log('token: ', token)
/*   window.localStorage.removeItem("token"); */
  return (
    <div className="App">
      <UserContext.Provider value={{ token: token, setToken: setToken }}>
        <Routes>
          <Route path="/nomatch" element={<NoMatch />} />
          <Route path="/" element={<Preauthscreen />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reg" element={<Registration />} />
          {token && <Route path="/tasks" element={<Tasks />} />}
          <Route path="*" element={<Navigate to="/nomatch" />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
