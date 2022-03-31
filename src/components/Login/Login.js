
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:4000/users/login";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			console.log(res)
			console.log(res.token)
			console.log("token")
			window.location = "/";
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
			<div className="">
				<div className="userInputLogin">
					<form className="loginForm" onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
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
						<button type="submit" className="loginButton">
							Sing In
						</button>
					</form>
				</div>
				<div className="registerLink">
					<h1>New here?</h1>
					<Link to="/register">
						<button type="button" className="registerButton">
							Register
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;