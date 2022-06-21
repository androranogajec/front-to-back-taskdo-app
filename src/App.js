import "./App.css";
import Tasks from "./components/Tasks.js";
import Preloginscreen from "./components/Preloginscreen/Preloginscreen";
import { Routes, Route, Link } from "react-router-dom";

function App(props) {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Preloginscreen />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
}

export default App;
