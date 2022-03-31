import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Solutions = () => {
  let data = useLocation();
  let stingID = data.state.sting;
  const [sting, setSting] = useState("");

  //Populate the selected sting on page load
  function getSting() {
    fetch(`http://localhost:4000/stings/${stingID}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setSting(data.sting))
      .then(() => fetch(`http://localhost:4000/stings/allSolutions/${stingID}`))
      .then((response) => response.json())
      .then((data) => setSolutions(data.solutions));
  }
  useEffect(() => {
    let ignore = false;
    if (!ignore) getSting();
    return () => {
      ignore = true;
    };
  }, []);

  const stingDetails = (
    <div>
      {sting.author}, {sting.time}, {sting.codeBlock}, {sting.description}
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
    fetch(`http://localhost:4000/stings/addSolution/${stingID}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(solution),
    })
      .then(() => fetch(`http://localhost:4000/stings/allSolutions/${stingID}`))
      .then((response) => response.json())
      // console.log(sting)
      .then((data) => setSolutions(data.solutions))
      .then(() => setSolution({
        author: "",
        time: "",
        solutionCodeBlock: "",
        solutionDescription: "",
      }));
  };

  function deleteSolution(event) {
    fetch(
      `http://localhost:4000/stings/deleteSolution/${stingID}/${event.target.value}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      }
    )
      .then(() => fetch(`http://localhost:4000/stings/allSolutions/${stingID}`))
      .then((response) => response.json())
      .then((data) => setSolutions(data.solutions));
  }

  const solutionList = solutions.map((solution, index) => (
    <div key={index}>
      <li key={solution._id}>
        {solution.author}, {solution.date}, {solution.codeBlock}
        <button key={index} onClick={deleteSolution} value={solution._id}>
          Delete Solution
        </button>
      </li>
    </div>
  ));

  return (
    <div>
      <Link to="/">
        <button>Back to Sting Page</button>
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
            type="time"
            placeholder="Time"
            name="time"
            onChange={handleChange}
            value={solution.time}
            required
            className="inputField"
          />
          <input
            type="codeBlock"
            placeholder="codeBlock"
            name="codeBlock"
            onChange={handleChange}
            value={solution.solutionCodeBlock}
            required
            className="inputField"
          />
          <input
            type="description"
            placeholder="Description"
            name="description"
            onChange={handleChange}
            value={solution.solutionDescription}
            required
            className="inputField"
          />
          <button type="Submit">Add Solution</button>
        </form>
        <ul>{solutionList}</ul>
      </div>
    </div>
  );
};

export default Solutions;
