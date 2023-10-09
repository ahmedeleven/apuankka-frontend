import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../config/config";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Define login credentials (username and password)
    const credentials = {
      username: username,
      password: password,
    };

    const api = axios.create({
      baseURL: API_BASE_URL,
    });
    // Make a POST request to backend's login endpoint
    api
      .post("login/", credentials)
      .then((response) => {
        // If the login is successful, backend should return a token.
        const token = response.data.token;
        const user_id = response.data.user_id;

        // Update the state to indicate that the user is logged in
        setIsLoggedIn(true);

        // Store the token in a cookie
        Cookies.set("token", token, { expires: 7 }); // 'expires' defines the cookie's expiration in days
        Cookies.set("username", username, { expires: 7 });
        Cookies.set("user_id", user_id, { expires: 7 });
      })
      .catch((error) => {
        // Handle login error
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header">
              <h1 className="h4 text-secondary font-weight-bold">
                <strong>Login</strong>
              </h1>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3 input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    id="form-username"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="mb-3 input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    id="form-password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-3 form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form-remember-me"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="form-remember-me"
                  >
                    Remember me
                  </label>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-block mb-3"
                  onClick={handleLogin}
                >
                  Login
                </button>

                <div className="text-center">
                  <p>
                    Not a member? <Link to="/register">Register</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
