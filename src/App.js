import React from "react";
import "./App.css";
import EmailConfirm from "./pages/EmailConfirm";
import ResetPassword from "./pages/ResetPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      {" "}
      <Routes>
        {" "}
        <Route path="/" element={<EmailConfirm />} />{" "}
        <Route path="/reset" element={<ResetPassword />} />{" "}
      </Routes>{" "}
    </Router>
  );
}
export default App;
