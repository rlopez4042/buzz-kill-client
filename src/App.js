import { Route, Routes, Navigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import "./App.scss";
import "./App.css";
import Main from "./components/Main/Main";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Stings from "./components/Stings/V1Stings";
import Solutions from "./components/Solutions/V1Solutions";
import Projects from "./components/Project/Project";

function App() {
  const user = localStorage.getItem("userName");
  return (
    <div className="container">
      <header className="appHeader">
        <a
          href={"https://rlopez4042.github.io/Personal-Portfolio/"}
          target="_blank"
        >
          <img
            className="aboutMeLink"
            src={require("./images/AboutMeImage.png.png")}
            alt="icon"
          />
        </a>
      </header>
      <Routes>
        {user && <Route path="/buzz-kill-client" exact element={<Main />} />}
        <Route path="/register" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/stings" exact element={<Stings />} />
        <Route path="/solutions" exact element={<Solutions />} />
        <Route path="/projects" exact element={<Projects />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
