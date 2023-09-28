import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../config/config";

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

        // Update the state to indicate that the user is logged in
        setIsLoggedIn(true);

        // Store the token in a cookie
        Cookies.set("token", token, { expires: 7 }); // 'expires' defines the cookie's expiration in days
      })
      .catch((error) => {
        // Handle login error
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
