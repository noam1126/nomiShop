import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";
import Home from "../../Components/Home";

function App() {
  return (
    // <BrowserRouter>
    <Router>
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Router>
    // </BrowserRouter>
  );
}

export default App;
