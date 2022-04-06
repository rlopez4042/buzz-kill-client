import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import apiUrl from '../../apiUrl';

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = (apiUrl + "/users/login");
      const { data: res } = await axios.post(url, data);

      //Check contents of res
      console.log(res._id);
      console.log(res.token);
      console.log(res.name);

      //Seperate and store data in local storage
      localStorage.setItem("userID", res._id);
      localStorage.setItem("bear", res.token);
      localStorage.setItem("userName", res.name);

      window.location = "/buzz-kill-client";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="loginFormContainer">
      <header className="buzzKillHeader">
        <h1> </h1>
        <h1 className="buzzKill" data-heading="z">
          Buzz-Kill
        </h1>
      </header>
      <div className="loginContents">
        <div className="userInputLogin">
          <form className="loginForm" onSubmit={handleSubmit}>
            <h1>Login: </h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="inputField"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="inputField"
            />
            {error && <div className="errorMsg">{error}</div>}
            <button type="submit" className="button-18">
              Sing In
            </button>
          </form>
        </div>
        <div className="registerLink">
          <h1 className="sendTo">New here?</h1>
          <Link to="/register">
            <button type="button" className="button-18">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
