import React, { useState, useEffect } from "react";
import useTokenValidation from "../hooks/useTokenValidation";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import { Link } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import AddService from "./AddService";

function ServicesList() {
  const { isLoggedIn, token, username, user_id } = useTokenValidation();

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getServices = () => {
    const api = axios.create({
      baseURL: API_BASE_URL,
    });

    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    api
      .get("services/")
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
        <div>
          <AddService />
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))
          )}
        </div>
      ) : (
        <p>Please log in to access this content.</p>
      )}
    </div>
  );
}

export default ServicesList;
