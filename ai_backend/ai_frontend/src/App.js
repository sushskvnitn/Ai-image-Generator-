import Home from "./components/home"
import "./spinner.css"
import "./style.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./components/welcome"
import Navbar from "./components/Navbar";
import Variation from "./components/variation";
function App() {
  return (
    <BrowserRouter>
    <div className="App">
  <Navbar/>
      <Routes>


        <Route path="/home" index element={<Home />} />
        <Route path="/variation" index element={<Variation />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
