import React from "react";
import Signin from "./components/Signin";
import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Verify from "./components/Verify";
import BankSystem from "./components/BankSystem";

function App() {
  // UserAuth();
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Signin />}></Route>
        <Route path="/bank-system" element={<BankSystem />}></Route>
        <Route path="/verify/:id" element={<Verify />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
