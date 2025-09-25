import React from "react";
import EmailConfirm from "./pages/EmailConfirm";
import ResetPassword from "./pages/ResetPassword";
import { Routes, Route } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <Routes>
      <Route path="/" element={<ResetPassword />} />
      <Route path="/confirm" element={<EmailConfirm />} />
    </Routes>
  );
}

export default App;
