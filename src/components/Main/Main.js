import Projects from "../Project/Project";

const Main = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    window.location = "/buzz-kill-client";
  };

  return (
    <div>
      <header>
        <h1 className="buzzKill" data-heading="z">
          Buzz-Kill
        </h1>
      </header>
      <Projects />
      <Link to="/login">
      <button id="logout" className="button-18" onClick={handleLogout}>
        Logout
      </button>
      </Link>
    </div>
  );
};

export default Main;
