import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Projects() {
  //Store user info in speperate variables
  const user = localStorage.getItem("userName");
  const userID = localStorage.getItem("userID");
  const bear = localStorage.getItem("bear");

  //Method to get time for time stamp
  const now = new Date().toLocaleString();

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState("");

  //Populate the list of projects on page load
  function getProject() {
    fetch(`http://localhost:4000/projects/`)
      .then((response) => response.json())
      .then((data) => setProjects(data.stings));
  }
  useEffect(() => {
    let ignore = false;
    if (!ignore) getProject();
    return () => {
      ignore = true;
    };
  }, []);

  //Update new state with user input
  const handleChange = (event) => {
    event.persist();
    setProject((prevProject) => {
      const editedProject = {
        ...prevProject,
        [event.target.name]: event.target.value,
      };
      return editedProject;
    });
  };

  //Create new project with user input
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(project);
    fetch("http://localhost:4000/projects/", {
      headers: {
        Authorization: "Bearer " + bear,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        director: user,
        date: now,
        projectTitle: project.projectTitle,
        projectDescription: project.projectDescription,
        repoLink: project.repoLink,
      }),
    })
      .then(() => fetch("http://localhost:4000/projects/"))
      .then((response) => response.json())
      .then((data) => setProjects(data.stings))
      .then(() =>
        setProject({
          projectTitle: "",
          projectDescription: "",
          repoLink: "",
        })
      );
  };

  //Delete a project
  function deleteProject(event) {
    fetch(`http://localhost:4000/projects/${event.target.value}`, {
      headers: {
        Authorization: "Bearer " + bear,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then(() => fetch("http://localhost:4000/projects/"))
      .then((response) => response.json())
      .then((data) => setProjects(data.stings));
  }

  //Display list of projects and link each project to its own page with Stings and solutions
  const projectList = projects
    .slice(0)
    .reverse()
    .map((project, index) => (
      <div key={project._id}>
        <div key={project._id}>
          <section className="projectInfo" key={project._id}>
            <ul key={project._id}>
              <li key={project._id} className="projectTitle">
                Title:{" "}
                <span style={{ color: "orange" }}>{project.projectTitle}</span>
              </li>
              <li key={project._id} className="projectDirector">
                Director:{" "}
                <span style={{ color: "yellow" }}>{project.director} </span> /
                Initialized:{" "}
                <span style={{ color: "orange" }}>{project.date}</span>
              </li>
            </ul>
            <button
              key={index}
              onClick={deleteProject}
              value={project._id}
              className="button-18"
            >
              Delete Project
            </button>

            <Link
              key={project._id}
              to={"/stings"}
              state={{ projectID: project._id, projectContents: project }}
            >
              <button className="button-18">View Project</button>
            </Link>

          </section>
        </div>
      </div>
    ));

  //Display componenet contents
  return (
    <div className="projectContainer">
      <div className="projectFunctions">
        <section className="welcomePage">
          <div className="logInLogOut">
            {user ? (
              <h2> Welcome {user}! </h2>
            ) : (
              <div>
                <h2>Log in to get started.</h2>
                <Link to={"/login"}>
                  <button id="login" className="button-18">
                    Log in
                  </button>
                </Link>
              </div>
            )}
          </div>
          <p className="pageDescription">
            Buzz-Kill is a project management / bug tracker website, for
            professional and enthusiast programmers. Create a project to keep
            track of bugs you run into and collaborate with other users to squash them.{" "}
          </p>
        </section>
        <div className="projectInputForm">
          <form className="projectForm" onSubmit={handleSubmit}>
            <ul>
              <h1>Start a project:</h1>
              <li>
                <input
                  type="projectTitle"
                  placeholder="Title"
                  name="projectTitle"
                  onChange={handleChange}
                  value={project.projectTitle}
                  required
                  className="inputField"
                />
              </li>
              <li>
                <textarea
                  cols="16"
                  rows="8"
                  type="projectDescription"
                  placeholder="Project Description"
                  name="projectDescription"
                  onChange={handleChange}
                  value={project.projectDescription}
                  required
                  className="inputField"
                ></textarea>
              </li>
              <li>
                <input
                  type="repoLink"
                  placeholder="Repo Link"
                  name="repoLink"
                  onChange={handleChange}
                  value={project.repoLink}
                  required
                  className="inputField"
                />
              </li>
              <button type="Submit" className="button-18">
                Add Project
              </button>
            </ul>
          </form>
        </div>
      </div>
      <div className="projectList">
        <ul>{projectList}</ul>
      </div>
    </div>
  );
}
export default Projects;
