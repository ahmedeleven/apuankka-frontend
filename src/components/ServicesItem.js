import React, { useState, useEffect } from "react";
import useTokenValidation from "../hooks/useTokenValidation";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import { useParams, useNavigate } from "react-router-dom";

function ServicesItem() {
  const { isLoggedIn, token, username, user_id } = useTokenValidation();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // This navigates back one step in the history stack
  };

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
              </div>
            </div>
            <div className="card-body">
              <p className="card-text">{service.description}</p>
            </div>
            <hr />
            <div className="card-footer border-0 pt-0">
              <ul className="nav nav-stack small">
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

                <li className="nav-item">
                  <a
                    className="nav-link active"
                    href="#!"
                    data-bs-container="body"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    {" "}
                    <i className="bi bi-hand-thumbs-up-fill pe-1"></i>
                    Interests (56)
                  </a>
                </li>

                <li className="nav-item dropdown ms-sm-auto">
                  <a
                    className="nav-link mb-0"
                    href="#"
                    id="cardShareAction"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-reply-fill flip-horizontal ps-1"></i>
                    Share (3)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )
      ) : (
        <p>Please log in to access this content.</p>
      )}
    </div>
  );
}

export default ServicesItem;