import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Chats from "./components/Chats";
import AuthPage from "./components/AuthPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/chats" element=<Chats /> />
        {/* <Route path="/auth" element=<AuthPage /> /> */}
      </Routes>
    </Router>
  );
};

export default App;
