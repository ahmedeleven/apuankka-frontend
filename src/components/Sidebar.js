import React, { useState, useRef, useEffect } from "react";
import useTokenValidation from "../hooks/useTokenValidation";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config/config";
import getUserCounts from "../utils/getUserCounts";
import getGeneralCounts from "../utils/getGeneralCounts";

// Define userProfile as a constant with an initial value of null
const DEFAULT_USER_PROFILE = {
  profile_picture: "assets/images/avatar/profile.jpg",
};

const Sidebar = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const { user_id, username, token } = useTokenValidation();

  const getUserData = () => {
    const api = axios.create({
      baseURL: API_BASE_URL,
    });

    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    api
      .get(`current_user/`)
      .then((response) => {
        setUserData(response.data);

        // Initialize userProfile after userData is fetched
        setUserProfile({
          profile_picture:
            response.data.profile?.profile_picture_url ||
            "assets/images/avatar/profile.jpg",
        });

        setIsLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Cannot get services:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const [userProfile, setUserProfile] = useState(DEFAULT_USER_PROFILE);

  const fileInputRef = useRef(null);

  const handleProfilePictureChange = () => {
    // Clicking on the input programmatically
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("profile_picture", file);

    const api = axios.create({
      baseURL: API_BASE_URL,
    });

    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    // Make a PUT request to update the profile picture
    api
      .put(`profile/${username}/update/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Update the user profile with the new profile picture
        setUserProfile({
          profile_picture:
            response.data.user.profile_picture_url ||
            "assets/images/avatar/profile.jpg",
        });
        //console.log(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  const [userCounts, setUserCounts] = useState({});

  useEffect(() => {
    async function fetchData() {
      const countsData = await getUserCounts(user_id);
      setUserCounts(countsData);
      console.log(countsData);
    }

    fetchData();
  }, [user_id]);

  const [generalCounts, setGeneralCounts] = useState({});

  useEffect(() => {
    async function fetchData() {
      const countsData = await getGeneralCounts();
      setGeneralCounts(countsData);
      console.log(countsData);
    }

    fetchData();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg mx-0">
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasSideNavbar"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close text-reset ms-auto"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body d-block px-2 px-lg-0">
          <div className="card overflow-hidden">
            <div className="h-50px"></div>
            <div className="card-body pt-0">
              <div className="text-center">
                <div className="avatar avatar-lg mt-n5 mb-3">
                  <div>
                    <label className="profile-picture-container">
                      {userProfile.profile_picture ? (
                        <img
                          className="avatar-img rounded border border-white border-3"
                          src={userProfile.profile_picture}
                          alt=""
                          onClick={handleProfilePictureChange}
                        />
                      ) : (
                        <div>Profile Picture Loading...</div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        ref={fileInputRef}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          opacity: 0,
                          cursor: "pointer",
                        }}
                      />
                    </label>
                  </div>
                </div>

                <h5 className="mb-0">
                  {" "}
                  {userData.username ? userData.username : null}{" "}
                </h5>
                <small>
                  {userData.profile?.full_name
                    ? userData.profile.full_name
                    : null}
                </small>
                <p className="mt-3"></p>

                <div className="hstack gap-2 gap-xl-3 justify-content-center">
                  <div>
                    <h6 className="mb-0">{userCounts.serviceCount}</h6>
                    <small>Requests</small>
                  </div>
                  <div className="vr"></div>
                  <div>
                    <h6 className="mb-0">{userCounts.interestCount}</h6>
                    <small>Interests</small>
                  </div>
                  <div className="vr"></div>
                  <div>
                    <h6 className="mb-0">{userCounts.chosenInterestCount}</h6>
                    <small>Chosen</small>
                  </div>
                </div>
              </div>

              <hr />

              <ul className="nav nav-link-secondary flex-column fw-bold gap-2">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    {" "}
                    <img
                      className="me-2 h-20px fa-fw"
                      src="assets/images/icon/home-outline-filled.svg"
                      alt=""
                    />
                    <span>Services ({generalCounts.serviceCount})</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-services">
                    {" "}
                    <img
                      className="me-2 h-20px fa-fw"
                      src="assets/images/icon/person-outline-filled.svg"
                      alt=""
                    />
                    <span>My Services ({userCounts.serviceCount})</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/services/available">
                    {" "}
                    <img
                      className="me-2 h-20px fa-fw"
                      src="assets/images/icon/person-outline-filled.svg"
                      alt=""
                    />
                    <span>
                      Available ({generalCounts.serviceAvailableCount})
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="card-footer text-center py-2">
              <Link className="btn btn-link btn-sm" to="/profile/edit">
                Edit Profile{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>{" "}
    </nav>
  );
};

export default Sidebar;
