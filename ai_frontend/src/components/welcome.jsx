import React from "react";
import "./welcome.css"
import { Link } from "react-router-dom";
const welcome = () => {
  return (
    <div>
      <div class="context">
        <h1> welcome to World Of Ai</h1>
        <Link to="/home"> <h1>lets explore</h1> </Link>
      </div>

      <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default welcome;
