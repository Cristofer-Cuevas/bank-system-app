import React from "react";
import Signin from "./components/Signin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
