import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// var tokenData = JSON.parse(localStorage.getItem('token'));
function Stings() {
  const [stings, setStings] = useState([]);
  const [sting, setSting] = useState("");
  // {localStorage.getItem('token')}
  var tokenData = (localStorage.getItem("token"));
  console.log(tokenData)
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

  //Create new project with user input
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(sting);
    fetch("http://localhost:4000/stings/", {
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': getTokenFromStore(), 
      },
      method: "POST",
      body: JSON.stringify(sting),
    })
      .then(() => fetch("http://localhost:4000/stings/"))
      .then((response) => response.json())
      .then((data) => setStings(data.stings))
      .then(() =>
        setSting({
          author: "",
          time: "",
          codeBlock: "",
          description: "",
        })
      );
  };  
  //Delete a project
  function deleteSting(event) {
    fetch(`http://localhost:4000/stings/${event.target.value}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then(() => fetch("http://localhost:4000/stings/"))
      .then((response) => response.json())
      .then((data) => setStings(data.stings));
  }

  //Display list of projects and link each project to its own page with Stings and solutions
  const stingList = stings.map((sting, index) => (
    <div key={index}>
      <li key={sting._id}>
        {sting.author}, {sting.time}, {sting.codeBlock},{sting.description},{" "}
        {/* {sting.repoLink} */}
        <button key={index} onClick={deleteSting} value={sting._id}>
          Delete Sting
        </button>
        <Link key={sting._id} to={"/solutions"} state={{ sting: sting._id }}>
          <button>View Solutions</button>
        </Link>
      </li>
    </div>
  ));

  //Display componenet contents
  return (
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
          type="time"
          placeholder="Time"
          name="time"
          onChange={handleChange}
          value={sting.time}
          required
          className="inputField"
        />
        <input
          type="codeBlock"
          placeholder="Code Block"
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
      <ul>{stingList}</ul>
    </div>
  );
}
export default Stings;
