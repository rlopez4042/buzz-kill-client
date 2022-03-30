import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main/Main";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Solutions from "./components/Solutions/Solutions";
import Projects from "./components/Projects/Projects";
import Stings from "./components/Stings/Stings";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/register" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/projects" exact element={<Projects />} />
			<Route path="/stings" exact element={<Stings />} />
			<Route path="/solutions" exact element={<Solutions />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;

