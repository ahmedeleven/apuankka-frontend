import React from "react";
import { useNavigate } from "react-router-dom";
import useTokenValidation from "../hooks/useTokenValidation";
import useCurrentUserData from "../hooks/useCurrentUserData";

const Header = ({ logout, isLoggedIn }) => {
  const navigate = useNavigate();
  const { token, username, user_id } = useTokenValidation();
  const { currentUserData } = useCurrentUserData();
  return (
    <header className="navbar-light fixed-top header-static bg-mode">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand text-secondary" href="/">
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
                <a className="nav-link text-secondary" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary" href="/about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary" href="/contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <ul className="nav flex-nowrap align-items-center ms-sm-3 list-unstyled">
            {isLoggedIn ? (
              <li className="nav-item ms-2 dropdown">
                <a
                  className="nav-link btn icon-md p-0"
                  href="#"
                  id="profileDropdown"
                  role="button"
                  data-bs-auto-close="outside"
                  data-bs-display="static"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    className="avatar-img rounded-2"
                    src={
                      currentUserData?.profile.profile_picture_url
                        ? currentUserData.profile.profile_picture_url
                        : "assets/images/avatar/profile.jpg"
                    }
                    alt=""
                  />
                </a>

                <ul
                  className="dropdown-menu dropdown-animation dropdown-menu-end pt-3 small me-md-n3"
                  aria-labelledby="profileDropdown"
                >
                  <li className="px-3">
                    <div className="d-flex align-items-center position-relative">
                      <div className="avatar me-3">
                        <img
                          className="avatar-img rounded-circle"
                          src={
                            currentUserData?.profile.profile_picture_url
                              ? currentUserData.profile.profile_picture_url
                              : "assets/images/avatar/profile.jpg"
                          }
                          alt="avatar"
                        />
                      </div>
                      <div>
                        <a className="h6 stretched-link" href="#">
                          {username}
                        </a>
                        <p className="small m-0">Web Developer</p>
                      </div>
                    </div>
                  </li>
                  <li className="dropdown-divider"></li>
                  <li>
                    <a
                      className="dropdown-item bg-danger-soft-hover"
                      onClick={logout}
                    >
                      <i className="bi bi-power fa-fw me-2"></i>Sign Out
                    </a>
                  </li>
                  <li>
                    {" "}
                    <hr className="dropdown-divider" />
                  </li>
                </ul>
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
