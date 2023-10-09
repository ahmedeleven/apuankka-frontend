import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import handleToggleInterest from "../utils/handleToggleInterest";
import useTokenValidation from "../hooks/useTokenValidation";

function ServiceCard({ service, isViewed, successClassName }) {
  const navigate = useNavigate();
  const [isInterested, setIsInterested] = useState(false);
  const current_user_id = Cookies.get("user_id");
  const cardClassName = `card ${successClassName}`;
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(service.status);
  const { token } = useTokenValidation();

  useEffect(() => {
    checkInterestStatus();
  }, []);

  const checkInterestStatus = async () => {
    try {
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

  const handleStatusChange = (newStatus) => {
    const api = axios.create({
      baseURL: API_BASE_URL,
    });

    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    api
      .put(`services/update/${service.id}/`, { status: newStatus })
      .then((response) => {
        // Update the status only after a successful response
        setCurrentStatus(newStatus);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      })
      .finally(() => {
        // Close the dropdown menu regardless of success or failure
        setStatusDropdownOpen(false);
      });
  };

  function getStatusColorClass(status) {
    switch (status) {
      case "open":
        return "text-success"; // Green color for "Open" status
      case "done":
        return "text-primary"; // Blue color for "Done" status
      case "cancel":
        return "text-danger"; // Red color for "Cancelled" status
      default:
        return ""; // Default color if status doesn't match known values
    }
  }

  return (
    <div className={cardClassName} key={service.id}>
      <div className="card-header card-header border-0 pb-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="avatar avatar-story me-2">
              <img
                className="avatar-img rounded-circle"
                src={
                  service.user?.profile?.profile_picture_url
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
                <i className="bi bi-hand-index-thumb-fill pe-1"></i>
              ) : (
                <i className="bi bi-hand-index-thumb pe-1"></i>
              )}{" "}
              Interested
            </a>
          </li>
        ) : null}

        {current_user_id == service.user.id ? (
          <li className="nav-item dropdown ms-sm-auto">
            <div className="dropdown">
              <button
                className={`btn nav-link mb-0 dropdown-toggle ${getStatusColorClass(
                  service.status
                )}`}
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
              >
                <i className="bi bi-clock-fill pe-1"></i>
                {currentStatus}
              </button>
              {statusDropdownOpen && (
                <ul className="dropdown-menu show">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleStatusChange("open")}
                    >
                      Open
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleStatusChange("done")}
                    >
                      Done
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleStatusChange("cancel")}
                    >
                      Cancelled
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </li>
        ) : (
          <li className="nav-item dropdown ms-sm-auto">
            <span
              className={`nav-link mb-0 ${getStatusColorClass(service.status)}`}
            >
              <i className="bi bi-clock-fill pe-1"></i>
              {service.status}
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}

export default ServiceCard;
