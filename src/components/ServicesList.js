import React, { useState, useEffect } from "react";
import useTokenValidation from "../hooks/useTokenValidation";
import axios from "axios";
import { API_BASE_URL } from "../config/config";

function ServicesList() {
  const { isLoggedIn, token } = useTokenValidation();

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

        //console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Cannot get services:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // Call the getServices function when the component mounts
    getServices();
  }, []); // The empty dependency array ensures this effect runs once on mount

  console.log("Services:", services);
  return (
    <div>
      {isLoggedIn ? (
        // Content for authenticated users
        isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {services.map((service) => (
              <li key={service.id}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p>Date: {service.date}</p>
                <p>Modified: {service.modified}</p>
              </li>
            ))}
          </ul>
        )
      ) : (
        // Content for non-authenticated users
        <p>Please log in to access this content.</p>
      )}
    </div>
  );
}

export default ServicesList;
