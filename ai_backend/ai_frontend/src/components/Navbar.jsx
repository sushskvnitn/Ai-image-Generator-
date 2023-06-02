import React from 'react';
import {Link} from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg " 
    style={{ zIndex:20 }} 
    >
      <div className="container-fluid ">
        <a className="navbar-brand  text-light" href="#!">
        <h3> Ai Image Generator
        </h3> </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-light" aria-current="page" to="/">Home</Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link active text-light" aria-current="page" to="/home">Text To Image</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/variation">Ai image from Image</Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link text-light" to="/speechtoimg">Speech to Image</Link>
            </li>
          </ul>
          <form className="d-flex">
          <ul className="navbar-nav ml-auto">
                <li className="nav-item ">
                  <a
                    className="nav-link text-light"
                    href="https://beta.openai.com/docs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    OpenAI API Docs
                  </a>
                </li>
              </ul>
           </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
