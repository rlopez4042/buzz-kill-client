import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Stings() {
  //Store user info in speperate variables
  const user = localStorage.getItem("userName");
  const userID = localStorage.getItem("userID");
  const bear = localStorage.getItem("bear");

  //Method to get time for time stamp
  const now = new Date().toLocaleString();

  const [stings, setStings] = useState([]);
  const [sting, setSting] = useState("");

  //Populate the list of projects on page load
  function getStings() {
    fetch("http://localhost:4000/stings/")
      .then((response) => response.json())
      .then((data) => setStings(data.stings));
  }
  useEffect(() => {
    let ignore = false;

    if (!ignore) getStings();
    return () => {
      ignore = true;
    };
  }, []);

  //Update new state with user input
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

  //Create new sting with user input and user info from logged in user
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(sting);
    fetch("http://localhost:4000/stings/", {
      headers: {
        Authorization: "Bearer " + bear,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        authorID: userID,
        author: user,
        codeBlock: sting.codeBlock,
        description: sting.description,
        time: now,
      }),
    })
      .then(() => fetch("http://localhost:4000/stings/"))
      .then((response) => response.json())
      .then((data) => setStings(data.stings))
      .then(() =>
        setSting({
          codeBlock: "",
          description: "",
        })
      );
  };

  //Delete a project by ID
  function deleteSting(event) {
    fetch(`http://localhost:4000/stings/${event.target.value}`, {
      headers: {
        Authorization: "Bearer " + bear,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then(() => fetch("http://localhost:4000/stings/"))
      .then((response) => response.json())
      .then((data) => setStings(data.stings));
  }

  //Checkbox to indicate whether or not a sting has been solved
  function handleCheckBox(event) {
    fetch(`http://localhost:4000/stings/${event.target.value}`, {
      headers: {
        Authorization: "Bearer " + bear,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        solution: (Boolean = !Boolean),
      }),
    })
      .then(() => fetch("http://localhost:4000/stings/"))
      .then((response) => response.json())
      .then((data) => setStings(data.stings));
  }

  //Display list of all stings
  const stingList = stings
    .slice(0)
    .reverse()
    .map((sting, index) => (
      <div className="individualInput" key={sting._id}>
        <ul key={sting._id}>
          <li className="creator">
            Author: <span style={{ color: "yellow" }}>{sting.author}</span> /
            Publication Date:{" "}
            <span style={{ color: "yellow" }}>{sting.time}</span>
          </li>
          <span className="prevDisplaySubtitles">Code Block:</span>
          <section className="displayCode">
            <pre>
              <code>
                <li>{sting.codeBlock}</li>
              </code>
            </pre>
          </section>
          <span className="prevDisplaySubtitles">Problem Set:</span>
          <section className="displayDescription">
            <li className="wrapword">{sting.description}</li>
          </section>
          <button
            className="button-54"
            role="button"
            key={index}
            onClick={deleteSting}
            value={sting._id}
          >
            Delete Sting
          </button>
          <Link key={sting._id} to={"/solutions"} state={{ sting: sting._id }}>
            <button className="button-54" role="button">
              View Solutions
            </button>
          </Link>
          <label className="checkedText">Solved:</label>
          <input
            className="checkBOX"
            type="checkbox"
            value={sting._id}
            onChange={handleCheckBox}
            checked={sting.solution}
          />
        </ul>
      </div>
    ));

  //Display componenet contents
  return (
    <div className="stingContainer">
      <header className="buzzKillHeader">
        <h1 className="buzzKill" data-heading="z">
          Buzz-Kill
        </h1>
      </header>
      <div className="stingFunctions">
        <div className="stickyDIV">
          <section className="welcomePage">
            <h2>
              {user ? (
                <h2> Welcome {user}! </h2>
              ) : (
                <div>
                  <h2>Log in to post a sting.</h2>
                  <Link to={"/login"}>
                    <button id="login" className="button-18">
                      Log in
                    </button>
                  </Link>
                </div>
              )}
            </h2>
            <p className="pageDescription">
              Buzz-Kill is a question and answer website for professional and
              enthusiast programmers. View previous inquiries or create a sting
              below.{" "}
            </p>
          </section>
          <form className="userForm" onSubmit={handleSubmit}>
            <h1 className="formTitle">Add Sting:</h1>
            <ul>
              <span className="subtitles">Code Block:</span>
              <li>
                <textarea
                  cols="40"
                  rows="6"
                  type="text"
                  placeholder="Code Block"
                  name="codeBlock"
                  onChange={handleChange}
                  value={sting.codeBlock}
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
                  value={sting.description}
                  required
                  className="inputFieldDescription"
                ></textarea>
              </li>
              {/* MobileVersions for user input */}
              <span className="subtitlesMobile">Code Block:</span>
              <li>
                <textarea
                  cols="28"
                  rows="4"
                  type="text"
                  placeholder="Code Block"
                  name="codeBlock"
                  onChange={handleChange}
                  value={sting.codeBlock}
                  required
                  className="inputFieldCodeBlockMobile"
                ></textarea>
              </li>
              <span className="subtitlesMobile">Comments:</span>
              <li>
                <textarea
                  cols="28"
                  rows="4"
                  type="description"
                  placeholder="Description"
                  name="description"
                  onChange={handleChange}
                  value={sting.description}
                  required
                  className="inputFieldDescriptionMobile"
                ></textarea>
              </li>
              <button className="button-18" type="Submit">
                Add Sting
              </button>
            </ul>
          </form>
        </div>
      </div>
      <div className="prevDisplay">
        <ul>{stingList}</ul>
      </div>
    </div>
  );
}
export default Stings;
