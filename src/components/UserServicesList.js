import React, { useState, useEffect } from "react";
import useTokenValidation from "../hooks/useTokenValidation";
import axios from "axios";
import { API_BASE_URL } from "../config/config";

function UserServicesList() {
  const { isLoggedIn, token, username, user_id } = useTokenValidation();

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getServices = () => {
    const api = axios.create({
      baseURL: API_BASE_URL,
    });

    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    api
      .get(`services/user/${user_id}/`)
      .then((response) => {
        setServices(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Cannot get services:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        isLoading ? (
          <p>Loading...</p>
        ) : (
          services.map((service) => (
            <div className="card text-center mb-3" key={service.id}>
              <div className="card-header">{service.title}</div>
              <div className="card-body">
                <p className="card-text">{service.description}</p>
              </div>
              <div className="card-footer text-muted">Date: {service.date}</div>
            </div>
          ))
        )
      ) : (
        <p>Please log in to access this content.</p>
      )}
    </div>
  );
}

export default UserServicesList;
