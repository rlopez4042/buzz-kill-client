import { Route, Routes, Navigate } from "react-router-dom";
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
  // const bear = localStorage.getItem("bear");
  console.log({ user });

  return (
    <div className="container">
      <header></header>
      <Routes>
        {user && <Route path="/" exact element={<Main />} />}
        <Route path="/register" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/stings" exact element={<Stings />} />
        <Route path="/solutions" exact element={<Solutions />} />
        {/* <Route path="/projects" exact element={<Projects />} /> */}
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
