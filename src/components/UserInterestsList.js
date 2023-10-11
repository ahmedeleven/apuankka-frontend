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
  const [page, setPage] = useState(1); // Initialize the page number
  const [hasMorePages, setHasMorePages] = useState(true); // New state to track if there are more pages

  const getInterests = () => {
    const api = axios.create({
      baseURL: API_BASE_URL,
    });

    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    api
      .get(`interests/user/${user_id}/?page=${page}`)
      .then((response) => {
        if (response.data.length < 10) {
          setHasMorePages(false);
        }
        setInterests([...interests, ...response.data]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Cannot get interests:", error);
        setIsLoading(false);
      });
  };

  // Function to load more items
  const loadMore = () => {
    setPage(page + 1); // Increment the page number
    console.log(hasMorePages);
  };

  useEffect(() => {
    getInterests();
  }, [page]);

  return (
    <div>
      {isLoggedIn ? (
        isLoading ? (
          <div className="load-icon">
            <div className="spinner-grow spinner-grow-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="col-md-8 col-lg-12 vstack gap-4">
            {interests.map((interest) => (
              <ServiceCard
                key={interest.service.id}
                service={interest.service}
              />
            ))}
            <a
              onClick={loadMore}
              role="button"
              className={`btn btn-loader btn-primary-soft ${
                hasMorePages ? "" : "disabled"
              }`}
            >
              <span className="load-text">Load more</span>
            </a>
          </div>
        )
      ) : (
        <p>Please log in to access this content.</p>
      )}
    </div>
  );
}

export default UserInterestsList;
