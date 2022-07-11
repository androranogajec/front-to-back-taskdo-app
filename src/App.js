import "./App.css";
import Tasks from "./components/Tasks/Tasks.js";
import Preauthscreen from "./components/PreAuthentication/Preauthscreen";
import NoMatch from "./components/NoMatch/NoMatch";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Authentication/Auth";
import Registration from "./components/Registration/Registration";
import { useState } from "react";
import { UserContext } from "./components/UserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({ isOnline: false, id: null });
  console.log(currentUser)
  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Routes>
          <Route path="/nomatch" element={<NoMatch />} />
          <Route path="/" element={<Preauthscreen />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reg" element={<Registration />} />
          {currentUser.isOnline && <Route path="/tasks" element={<Tasks />} />}
          <Route path="*" element={<Navigate to="/nomatch" />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
