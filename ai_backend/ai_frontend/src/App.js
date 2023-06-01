import Home from "./components/home"
import "./spinner.css"
import "./style.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./components/welcome"
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/home" index element={<Home />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
