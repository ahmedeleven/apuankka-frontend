import React, { useState, useEffect } from "react";
import useTokenValidation from "../hooks/useTokenValidation";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import { useParams } from "react-router-dom";

function ServicesItem() {
  const { isLoggedIn, token, username, user_id } = useTokenValidation();

  const [service, setService] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { service_id } = useParams();

  const getService = () => {
    const api = axios.create({
      baseURL: API_BASE_URL,
    });

    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    api
      .get(`services/${service_id}/`)
      .then((response) => {
        setService(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Cannot get services:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getService();
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="card text-center mb-3" key={service.id}>
            <div className="card-header">{service.title}</div>
            <div className="card-body">
              <p className="card-text">{service.description}</p>
            </div>
            <div className="card-footer text-muted">Date: {service.date}</div>
          </div>
        )
      ) : (
        <p>Please log in to access this content.</p>
      )}
    </div>
  );
}

export default ServicesItem;
