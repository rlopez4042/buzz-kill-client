import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Stings from "../Stings/Stings";
import { Link, useLocation } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState("");
  const [viewProject, setViewProject] = useState("");

  //Populate the list of projects on page load
  function getProject() {
    fetch("http://localhost:4000/projects/")
      .then((response) => response.json())
      .then((data) => setProjects(data.projects));
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
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(project),
    })
      .then(() => fetch("http://localhost:4000/projects/"))
      .then((response) => response.json())
      .then((data) => setProjects(data.projects))
      .then(() =>
        setProject({
          director: "",
          date: "",
          projectDescription: "",
          repoLink: "",
        })
      );
  };

  //Delete a project
  function deleteProject(event) {
    fetch(`http://localhost:4000/projects/${event.target.value}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then(() => fetch("http://localhost:4000/projects/"))
      .then((response) => response.json())
      .then((data) => setProjects(data.projects));
  }

  //Display list of projects and link each project to its own page with Stings and solutions
  const projectList = projects.map((project, index) => (
    <div>
      <li key={index}>
        {project.director}, {project.date}, {project.projectDescription},{" "}
        {project.repoLink}
        <button key={index} onClick={deleteProject} value={project._id}>
          Delete Project
        </button>
        <Link key={project._id} to={"/stings"} state={{ project: project._id }}>
          <button>
            View Project
          </button>
        </Link>
      </li>
    </div>
  ));

  //Display componenet contents
  return (
    <div className="projectInputForm">
      <form className="projectForm" onSubmit={handleSubmit}>
        <h1>Add Project</h1>
        <input
          type="director"
          placeholder="Director"
          name="director"
          onChange={handleChange}
          value={project.director}
          required
          className="inputField"
        />
        <input
          type="date"
          placeholder="Date"
          name="date"
          onChange={handleChange}
          value={project.date}
          required
          className="inputField"
        />
        <input
          type="projectDescription"
          placeholder="Project Description"
          name="projectDescription"
          onChange={handleChange}
          value={project.projectDescription}
          required
          className="inputField"
        />
        <input
          type="repoLink"
          placeholder="Repo Links"
          name="repoLink"
          onChange={handleChange}
          value={project.repoLink}
          required
          className="inputField"
        />
        <button type="Submit">Add Project</button>
      </form>
      <ul>{projectList}</ul>
    </div>
  );
}
export default Projects;
