import { Link, useLocation } from "react-router-dom";

function AboutMe() {
  return (
    <div className="aboutMe">
      <p className="aboutMeText">hi its me im a dev guy</p>
      <Link to={"/"}>
        <button id="meHome" className="button-18">
          Home
        </button>
      </Link>
      <a href={"https://rlopez4042.github.io/Personal-Portfolio/"} target="_blank">
        Click me
      </a>
    </div>
  );
}
export default AboutMe;
