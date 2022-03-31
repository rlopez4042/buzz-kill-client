import Stings from "../Stings/V1Stings";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div>
      <nav className="navbar">
        <h1>BuzzKill</h1>
        <Stings />
        <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Main;
