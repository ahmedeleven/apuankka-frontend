import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Sidebar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  return (
    <div>
      {isLoggedIn ? (
        <nav id="sidebar" className="bg-light sidebar">
          <div className="position-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/services" className="nav-link">
                  <i className="bi bi-house-door"></i> Services
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/my-services" className="nav-link">
                  <i className="bi bi-house-door"></i> My Services
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      ) : null}
    </div>
  );
};

export default Sidebar;
