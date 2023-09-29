import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../config/config";
import { useNavigate } from "react-router-dom";

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
      <h2>Sign Up</h2>
      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {username}
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password}
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {email}
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleRegister}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
