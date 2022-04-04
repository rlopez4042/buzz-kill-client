import Stings from "../Stings/V1Stings";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    window.location = "/login";
  };

  return (
    <div>
      <Stings />
      <button id="logout" className="button-18" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Main;
