import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Solutions = () => {
  let data = useLocation();
  //Project ID from project component
  let projectID = data.state.project;
  //Specific deatials from the selected Sting
  let thisSting = data.state.stingContents;
  //Sting ID from sting component
  let stingID= data.state.stingContents._id;
  //Check for content
  console.log(projectID)

  //Populate details from the selected Sting for reference
  const stingDetails = (
    <div>
      {thisSting.author}, {thisSting.date}, {thisSting.codeBlock}, {thisSting.description}
    </div>
  );

  const [solutions, setSolutions] = useState([]);
  const [solution, setSolution] = useState({});

  const handleChange = (event) => {
    event.persist();
    setSolution((prevSolution) => {
      const editedSolution = {
        ...prevSolution,
        [event.target.name]: event.target.value,
      };
      return editedSolution;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(solution);
    fetch(`http://localhost:4000/projects/addSolution/${projectID}/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(solution),
    })
      .then(() =>
        fetch(`http://localhost:4000/projects/allStings/${projectID}/`)
      )
      .then((response) => response.json())
      .then((data) => setSolutions(data.solutions))
      .then(() =>
        setSolution("")
      );
  };

  function deleteSolution(event) {
    fetch(
      `http://localhost:4000/projects/deleteSting/${projectID}/${event.target.value}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      }
    )
      .then(() =>
        fetch(`http://localhost:4000/projects/allStings/${projectID}`)
      )
      .then((response) => response.json())
      .then((data) => setSolutions(data.solutions));
  }

  const solutionList = solutions.map((solution, index) => (
    <div>
      <li key={index}>
        {solution.author}, {solution.date}
        <button key={index} onClick={deleteSolution} value={solution._id}>
          Delete Sting
        </button>
      </li>
    </div>
  ));

  return (
    <div>
      <Link to="/">
        <button>Back to Home Page</button>
      </Link>
      <h1>{stingDetails}</h1>
      <div className="solutionInputForm">
        <form className="solutionForm" onSubmit={handleSubmit}>
          <h1>Add Solution</h1>
          <input
            type="author"
            placeholder="Author"
            name="author"
            onChange={handleChange}
            value={solution.author}
            required
            className="inputField"
          />
          <input
            type="date"
            placeholder="Date"
            name="date"
            onChange={handleChange}
            value={solution.date}
            required
            className="inputField"
          />
          <input
            type="codeBlock"
            placeholder="codeBlock"
            name="codeBlock"
            onChange={handleChange}
            value={solution.codeBlock}
            required
            className="inputField"
          />
          <input
            type="description"
            placeholder="Description"
            name="description"
            onChange={handleChange}
            value={solution.description}
            required
            className="inputField"
          />
          <button type="Submit">Add Sting</button>
        </form>
        <ul>{solutionList}</ul>
      </div>
    </div>
  );
};

export default Solutions;
