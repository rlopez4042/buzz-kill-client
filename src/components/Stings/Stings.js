import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Stings = () => {
  let data = useLocation();
  let projectID = data.state.project;

  const [project, setProject] = useState("");

  //Populate the selected project on page load
  function getProject() {
    fetch(`http://localhost:4000/projects/${projectID}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setProject(data.project));
  }
  useEffect(() => {
    let ignore = false;
    if (!ignore) getProject();
    return () => {
      ignore = true;
    };
  }, []);

  const projectDetails = (
    <div>
      {project.director}, {project.date}, {project.projectDescription},{" "}
      {project.repoLink}
    </div>
  );

  const [stings, setStings] = useState([]);
  const [sting, setSting] = useState({});

  const handleChange = (event) => {
    event.persist();
    setSting((prevSting) => {
      const editedSting = {
        ...prevSting,
        [event.target.name]: event.target.value,
      };
      return editedSting;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(sting);
    fetch(`http://localhost:4000/projects/addSting/${projectID}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(sting),
    })
    .then(response => response.json())
    .then(data => {
      setStings(data.stings)
        console.log("Sting: ", stings) 
        console.log("data.Sting: ", data.stings) 
    })
}

// function getProject() {
//   fetch(`http://localhost:4000/projects/${projectID}`, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     method: "GET",
//   })
//     .then((response) => response.json())
//     .then((data) => setProject(data.project));
// }
// useEffect(() => {
//   let ignore = false;
//   if (!ignore) getProject();
//   return () => {
//     ignore = true;
//   };
// }, []);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(sting);
  //   fetch(`http://localhost:4000/projects/addSting/${projectID}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "PUT",
  //     body: JSON.stringify(sting),
  //   })
  //     .then(() => fetch(`http://localhost:4000/projects/addSting/${projectID}`))
  //     .then((response) => response.json())
  //     // console.log(sting)
  //     .then((data) => setStings(data.stings))
  //     .then(() =>
  //     setSting({
  //         author: "",
  //         date: "",
  //         codeBlock: "",
  //         description: "",
  //       })
  //     );
  // };

  // const stingList = stings.map((sting, index) => (
  //   <div>
  //     <li key={index}>
  //       {sting.author}, {sting.date}
  //       {/* <button key={index} onClick={deleteProject} value={sting._id}>
  //         Delete Project
  //       </button> */}
  //     </li>
  //   </div>
  // ));

  return (
    <div>
      <Link to="/">
        <button>Back to Home Page</button>
      </Link>
      <h1>{projectDetails}</h1>
    <div className="stingInputForm">
      <form className="stingForm" onSubmit={handleSubmit}>
        <h1>Add Sting</h1>
        <input
          type="author"
          placeholder="Author"
          name="author"
          onChange={handleChange}
          value={sting.author}
          required
          className="inputField"
        />
        <input
          type="date"
          placeholder="Date"
          name="date"
          onChange={handleChange}
          value={sting.date}
          required
          className="inputField"
        />
        <input
          type="codeBlock"
          placeholder="codeBlock"
          name="codeBlock"
          onChange={handleChange}
          value={sting.codeBlock}
          required
          className="inputField"
        />
        <input
          type="description"
          placeholder="Description"
          name="description"
          onChange={handleChange}
          value={sting.description}
          required
          className="inputField"
        />
        <button type="Submit">Add Sting</button>
      </form>
      {/* <ul>{stingList}</ul> */}
    </div>
    </div>
  );
};

export default Stings;
