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
import Sidebar from "./components/Sidebar";
import UserServicesList from "./components/UserServicesList";
import ServicesItem from "./components/ServicesItem";

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
      <div className="container-fluid">
        {/* Header */}
        <Header logout={logout} isLoggedIn={isLoggedIn} />

        <div className="row">
          {isLoggedIn && (
            <div className="col-md-3">
              {/* Sidebar */}
              <Sidebar isLoggedIn={isLoggedIn} />
            </div>
          )}
          <div
            className={`col-md-${isLoggedIn ? "9" : "12"}`}
            style={{
              padding: "20px", // Add padding for better spacing
            }}
          >
            <Routes>
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
                path="/services/:service_id"
                element={
                  isLoggedIn ? (
                    <ServicesItem />
                  ) : (
                    <Login setIsLoggedIn={setIsLoggedIn} />
                  )
                }
              />
              <Route
                path="/my-services"
                element={
                  isLoggedIn ? (
                    <UserServicesList />
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
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
