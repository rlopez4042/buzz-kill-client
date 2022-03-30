import { useState } from "react";
import Stings from "../Stings/Stings";
import { Link } from "react-router-dom";

const Solutions = ({sting}) => {
  // let info = {props.info}
  return (
    <div>
      <Link to="/">
        <button>Back to Home Page</button>
      </Link>
      <h1>Solutions</h1>
      <h2>{sting}</h2>
    </div>
  );
};

export default Solutions;
