import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Solutions = () => {
  //Get info from previous page and use sting data
  let data = useLocation();
  let stingID = data.state.sting;
  const [sting, setSting] = useState("");

  //Store user info in speperate variables
  const user = localStorage.getItem("userName");
  const userID = localStorage.getItem("userID");
  const bear = localStorage.getItem("bear");

  //Method to get time for time stamp
  const now = new Date().toLocaleString();

  //Populate the selected sting and solutions on page load
  function getSting() {
    fetch(`http://localhost:4000/stings/${stingID}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setSting(data.sting))
      .then(() =>
        fetch(`http://localhost:4000/stings/allSolutions/${stingID}`, {
          headers: {
            Authorization: "Bearer " + bear,
            "Content-Type": "application/json",
          },
          method: "GET",
        })
      )
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

  const [solutions, setSolutions] = useState([]);
  const [solution, setSolution] = useState({});

  //Update new state with user input
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

  //Create new solution with user input and user info from logged in user
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(solution);
    fetch(`http://localhost:4000/stings/addSolution/${stingID}`, {
      headers: {
        Authorization: "Bearer " + bear,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        authorID: userID,
        author: user,
        codeBlock: solution.codeBlock,
        description: solution.description,
        time: now,
      }),
    })
      .then(() =>
        fetch(`http://localhost:4000/stings/allSolutions/${stingID}`, {
          headers: {
            Authorization: "Bearer " + bear,
            "Content-Type": "application/json",
          },
          method: "GET",
        })
      )
      .then((response) => response.json())
      .then((data) => setSolutions(data.solutions))
      .then(() =>
        setSolution({
          codeBlock: "",
          description: "",
        })
      );
  };

  function deleteSolution(event) {
    fetch(
      `http://localhost:4000/stings/deleteSolution/${stingID}/${event.target.value}`,
      {
        headers: {
          Authorization: "Bearer " + bear,
          "Content-Type": "application/json",
        },
        method: "PUT",
      }
    )
      .then(() =>
        fetch(`http://localhost:4000/stings/allSolutions/${stingID}`, {
          headers: {
            Authorization: "Bearer " + bear,
            "Content-Type": "application/json",
          },
          method: "GET",
        })
      )
      .then((response) => response.json())
      .then((data) => setSolutions(data.solutions));
  }

  //Display list of all solutions
  const solutionList = solutions
    .slice(0)
    .reverse()
    .map((solution, index) => (
      <div className="individualInput" key={index}>
        <ul key={solution._id}>
          <li className="creator">
            Author: <span className="colorSpan">{solution.author}</span> /
            Publication Date: <span className="colorSpan">{solution.time}</span>
          </li>
          <span className="prevDisplaySubtitles">Code Block:</span>
          <section className="displayCode">
            <pre>
              <code>
                <li>{solution.codeBlock}</li>
              </code>
            </pre>
          </section>
          <span className="prevDisplaySubtitles">Comment:</span>
          <section className="displayDescription">
            <li className="wrapword">{solution.description}</li>
          </section>
          <button
            class="button-54"
            role="button"
            key={index}
            onClick={deleteSolution}
            value={solution._id}
          >
            Delete Solution
          </button>
        </ul>
      </div>
    ));

  //Display componenet contents
  return (
    <div className="solutionContainer">
      <header className="buzzKillHeader">
        <h1 className="buzzKill" data-heading="z">
          Buzz-Kill
        </h1>
      </header>
      <div className="solutionFunctions">
        <h2 className="problem">Sting:</h2>
        <div className="stingToSolve">
          <div className="stingToSolveInput">
            <ul>
              <li className="creator">
                Author: <span className="colorSpan">{sting.author}</span> /
                Publication Date:{" "}
                <span className="colorSpan">{sting.time}</span>
              </li>
              <span className="prevDisplaySubtitles">Code Block:</span>
              <section className="displayCode">
                <pre>
                  <code>
                    <li>{sting.codeBlock}</li>
                  </code>
                </pre>
              </section>
              <span className="prevDisplaySubtitles">Comment:</span>
              <section className="displayDescription">
                <li className="wrapword">{sting.description}</li>
              </section>
            </ul>
          </div>
        </div>
        <form className="userForm" onSubmit={handleSubmit}>
          <h1 className="formTitle">Add a sting of your own below:</h1>
          <ul>
            <span className="subtitles">Your Code Block:</span>
            <li>
              <textarea
                cols="40"
                rows="6"
                type="text"
                placeholder="Code Block"
                name="codeBlock"
                onChange={handleChange}
                value={solution.codeBlock}
                required
                className="inputFieldCodeBlock"
              ></textarea>
            </li>
            <span className="subtitles">Comments:</span>
            <li>
              <textarea
                cols="40"
                rows="6"
                type="description"
                placeholder="Description"
                name="description"
                onChange={handleChange}
                value={solution.description}
                required
                className="inputFieldDescription"
              ></textarea>
            </li>
            {/* MobileVersions for user input */}
            <span className="subtitlesMobile">Your Code Block:</span>
            <li>
              <textarea
                cols="28"
                rows="4"
                type="text"
                placeholder="Code Block"
                name="codeBlock"
                onChange={handleChange}
                value={solution.codeBlock}
                required
                className="inputFieldCodeBlockMobile"
              ></textarea>
            </li>
            <span className="subtitlesMobile">Your Issue / Intent:</span>
            <li>
              <textarea
                cols="28"
                rows="4"
                type="description"
                placeholder="Description"
                name="description"
                onChange={handleChange}
                value={solution.description}
                required
                className="inputFieldDescriptionMobile"
              ></textarea>
            </li>
            <button className="button-18" type="Submit">
              Add Solution
            </button>
          </ul>
        </form>
      </div>
      <div className="prevDisplay">
        <ul>{solutionList}</ul>
      </div>
      <Link to="/">
        <button id="logout" className="button-18">
          Back to Home Page
        </button>
      </Link>
    </div>
  );
};

export default Solutions;
