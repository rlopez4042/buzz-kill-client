import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function AboutMe() {
    return(
        <div className="aboutMe">
            <p className="aboutMeText">

            </p>
            <Link to={"/"}>
                  <button id="meHome" className="button-18">
                    Home
                  </button>
                </Link>
        </div>
    )
}
export default AboutMe;