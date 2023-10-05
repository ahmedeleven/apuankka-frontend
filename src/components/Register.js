import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../config/config";
import { useNavigate, Link } from "react-router-dom";

const Register = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const token = Cookies.get("token");

  if (token) {
    navigate("/");
  }

  const handleRegister = () => {
    const credentials = {
      username: username,
      password: password,
      email: email,
    };

    const api = axios.create({
      baseURL: API_BASE_URL,
    });

    api
      .post("register/", credentials)
      .then((response) => {
        const token = response.data.token;
        const user_id = response.data.user_id;

        // Update the state to indicate that the user is logged in
        setIsLoggedIn(true);

        Cookies.set("token", token, { expires: 7 }); // 'expires' defines the cookie's expiration in days
        Cookies.set("username", username, { expires: 7 }); // 'expires' defines the cookie's expiration in days
        Cookies.set("user_id", user_id, { expires: 7 }); // 'expires' defines the cookie's expiration in days
        navigate("/");
      })
      .catch((error) => {
        // Handle register error
        console.error("Cannot register:", error.response.data);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header">
              <h1 className="h4 text-secondary font-weight-bold">
                <strong>Sign Up</strong>
              </h1>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3 input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person"></i> {/* User icon */}
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
                    <i className="bi bi-lock"></i> {/* Lock icon */}
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

                <div className="mb-3 input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i> {/* Email icon */}
                  </span>
                  <input
                    type="text"
                    id="form-email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-block mb-3"
                  onClick={handleRegister}
                >
                  Sign Up
                </button>

                <div className="text-center">
                  <p>
                    Already a member? <Link to="/">Login</Link>
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

export default Register;
