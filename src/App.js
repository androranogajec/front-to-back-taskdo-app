import "./App.css";
import Tasks from "./components/tasks/Tasks.js";
import Preauthscreen from "./components/PreAuthentication/Preauthscreen";
import { Routes, Route, Link } from "react-router-dom";
import Auth from "./components/Authentication/Auth";
import Registration from "./components/Registration/Registration";

function App(props) {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Preauthscreen />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/auth" element={<Auth />}/>
        <Route path="/reg" element={<Registration />}/>
      </Routes>
    </div>
  );
}

export default App;
