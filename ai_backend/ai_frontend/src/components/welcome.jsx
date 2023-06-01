import React from "react";
import "./welcome.css"
import { Link } from "react-router-dom";
import Typewriter from 'typewriter-effect';
const welcome = () => {
  return (
    <div>
      <div class="context">
        <h1> <Typewriter
  options={{
    strings: ['WELCOME TO WORLD OF AI'],
    autoStart: true,
    loop: true,
  }}
/></h1>
        <Link to="/home"> <h1>Text to Image</h1> </Link>
        <Link to ="/Variation"><h1>Image to Ai Image</h1></Link>
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
