import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import handleToggleInterest from "../utils/handleToggleInterest"; // Import the function

function ServiceCard({ service, isViewed }) {
  const navigate = useNavigate();
  const [isInterested, setIsInterested] = useState(false);
  const current_user_id = Cookies.get("user_id");

  useEffect(() => {
    checkInterestStatus();
  }, []);

  const checkInterestStatus = async () => {
    try {
      const token = Cookies.get("token");
      const api = axios.create({
        baseURL: API_BASE_URL,
      });
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      const checkInterestUrl = `interests/service/${service.id}/check/`;
      const response = await api.get(checkInterestUrl);
      setIsInterested(response.data.is_interested);
    } catch (error) {
      console.error("Error checking interest:", error);
    }
  };

  const handleInterestClick = async () => {
    try {
      // Call the imported function
      const newIsInterested = await handleToggleInterest(service.id);
      setIsInterested(newIsInterested);
    } catch (error) {
      console.error("Error handling interest:", error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="card" key={service.id}>
      <div className="card-header card-header border-0 pb-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="avatar avatar-story me-2">
              <img
                className="avatar-img rounded-circle"
                src={
                  service.user.profile.profile_picture_url
                    ? service.user.profile.profile_picture_url
                    : "assets/images/avatar/profile.jpg"
                }
                alt="avt"
              />
            </div>
            <div>
              <div className="nav nav-divider">
                <h6 className="nav-item card-title mb-0">
                  {service.user.username}
                </h6>
                <span className="nav-item small"> {service.date}</span>
              </div>
              <p className="mb-0 small">{service.title}</p>
              <p className="mb-0 small"></p>
            </div>
          </div>
          <span className="mb-3">
            {service.fee} <i className="bi bi-currency-euro"></i>
          </span>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text">{service.description}</p>
      </div>
      <hr />

      <ul className="nav nav-stack small">
        {isViewed ? (
          <li className="nav-item">
            <a
              className="nav-link"
              onClick={handleGoBack}
              href="#!"
              data-bs-container="body"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
            >
              {" "}
              <i className="bi bi-backspace-fill pe-1"></i>
              Back
            </a>
          </li>
        ) : (
          <li className="nav-item">
            <Link
              className="nav-link"
              to={`/services/${service.id}`}
              data-bs-container="body"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
            >
              {" "}
              <i className="bi bi-arrow-up-right-circle-fill pe-1"></i>
              View
            </Link>
          </li>
        )}

        {current_user_id != service.user.id ? (
          <li className="nav-item">
            <a
              className="nav-link active"
              onClick={handleInterestClick}
              href="#!"
              data-bs-container="body"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
            >
              {" "}
              {isInterested ? (
                <i className="bi bi-hand-thumbs-up-fill pe-1"></i>
              ) : (
                <i className="bi bi-hand-thumbs-up pe-1"></i>
              )}{" "}
              Interested
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

export default ServiceCard;
