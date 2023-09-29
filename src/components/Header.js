import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ logout, isLoggedIn }) => {
  const navigate = useNavigate();
  return (
    <div className="row">
      <div className="col-md-12">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="/">
              <strong>Apuankka</strong>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contact">
                    Contact
                  </a>
                </li>
              </ul>

              {isLoggedIn ? (
                <button className="btn btn-danger" onClick={logout}>
                  Log Out
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
