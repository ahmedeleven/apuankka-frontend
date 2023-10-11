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
  const [page, setPage] = useState(1); // Initialize the page number
  const [hasMorePages, setHasMorePages] = useState(true); // New state to track if there are more pages

  const getServices = () => {
    const api = axios.create({
      baseURL: API_BASE_URL,
    });

    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    api
      .get(`services/?page=${page}`) // Include the current page in the API request
      .then((response) => {
        if (response.data.length < 10) {
          setHasMorePages(false);
        }
        setServices([...services, ...response.data]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Cannot get services:", error);
        setIsLoading(false);
      });
  };

  // Function to load more items
  const loadMore = () => {
    setPage(page + 1); // Increment the page number
    console.log(hasMorePages);
  };

  useEffect(() => {
    getServices();
  }, [page]);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <AddService />
          {isLoading ? (
            <div className="load-icon">
              <div className="spinner-grow spinner-grow-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="col-md-8 col-lg-12 vstack gap-4">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
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
          )}
        </div>
      ) : (
        <p>Please log in to access this content.</p>
      )}
    </div>
  );
}

export default ServicesList;
