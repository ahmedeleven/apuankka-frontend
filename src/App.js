import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import ServicesList from "./components/ServicesList";
import Cookies from "js-cookie";
import Header from "./components/Header";
import { API_BASE_URL } from "./config/config";
import Register from "./components/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the 'token' cookie exists
    const token = Cookies.get("token");

    if (token) {
      // If the token is found, set the user as logged in
      setIsLoggedIn(true);
    }
  }, []);

  const logout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false); // Update the logged-in state
  };

  return (
    <Router>
      <Header logout={logout} isLoggedIn={isLoggedIn} />
      <Routes>
        {" "}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/services"
          element={
            isLoggedIn ? (
              <ServicesList />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route
          index
          element={
            isLoggedIn ? (
              <ServicesList />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
