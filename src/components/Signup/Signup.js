import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import apiUrl from '../../apiUrl';

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = apiUrl + "/users/";
      const { data: res } = await axios.post(url, data);
      navigate("/buzz-kill-client");
      console.log(res.message);
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
    <div className="registerFormContainer">
      <header className="buzzKillHeader">
        <h1> </h1>
        <h1 className="buzzKill" data-heading="z">
          Buzz-Kill
        </h1>
      </header>
      <div className="registerContents">
        <div className="userInputRegister">
          <form className="registerForm" onSubmit={handleSubmit}>
            <h1>Create Account:</h1>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={data.name}
              required
              className="inputField"
            />
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
              Register
            </button>
          </form>
        </div>
        <div className="loginLink">
          <h1 className="sendTo">Already registered? Sign In:</h1>
          <Link to="/login">
            <button type="button" className="button-18">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
