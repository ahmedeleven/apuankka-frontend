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
      {/* Header */}
      <Header logout={logout} isLoggedIn={isLoggedIn} />
      <main>
        <div className="container">
          <div className="row g-4">
            {isLoggedIn && (
              <div className="col-lg-3">
                {/* Sidebar */}
                <Sidebar isLoggedIn={isLoggedIn} />
              </div>
            )}
            <div className={`col-lg-${isLoggedIn ? "9" : "12"}`}>
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
      </main>
    </Router>
  );
}

export default App;
