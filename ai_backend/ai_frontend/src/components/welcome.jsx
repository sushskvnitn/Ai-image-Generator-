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
        <Link to="/home"> <h4>Text to Image</h4> </Link>
        <Link to ="/Variation"><h4>Image to Ai Image</h4></Link>
        <Link to ="/speechtoimg"><h4>Speech to Ai Image</h4></Link>
        <Link to ="/imagetotext"><h4> Image To Text </h4></Link>
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
