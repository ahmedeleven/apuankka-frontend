import React, { useState, useEffect } from "react";
import useTokenValidation from "../hooks/useTokenValidation";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import { Link } from "react-router-dom";
import ServiceCard from "./ServiceCard";

function UserInterestsList() {
  const { isLoggedIn, token, username, user_id } = useTokenValidation();

  const [interests, setInterests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getInterests = () => {
    const api = axios.create({
      baseURL: API_BASE_URL,
    });

    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    api
      .get(`interests/user/${user_id}/`)
      .then((response) => {
        setInterests(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Cannot get interests:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getInterests();
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        isLoading ? (
          <p>Loading...</p>
        ) : (
          interests.map((interest) => (
            <ServiceCard key={interest.service.id} service={interest.service} />
          ))
        )
      ) : (
        <p>Please log in to access this content.</p>
      )}
    </div>
  );
}

export default UserInterestsList;
