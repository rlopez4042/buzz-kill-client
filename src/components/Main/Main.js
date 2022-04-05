import Projects from "../Project/Project";
import Stings from "../Stings/V1Stings";

const Main = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    window.location = "/login";
  };

  return (
    <div>
      <header>
        <h1 className="buzzKill" data-heading="z">
          Buzz-Kill
        </h1>
      </header>
      <Projects />
      <button id="logout" className="button-18" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Main;
