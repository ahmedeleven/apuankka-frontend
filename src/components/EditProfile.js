import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import useTokenValidation from "../hooks/useTokenValidation";

const EditProfile = () => {
  const { isLoggedIn, token, username, user_id } = useTokenValidation();
  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  api.defaults.headers.common["Authorization"] = `Token ${token}`;

  const [formData, setFormData] = useState({
    phone_number: "",
    full_name: "",
    bio: "",
  });

  const [successMessage, setSuccessMessage] = useState(null); // State for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to update the user's profile
    api
      .put(`profile/${username}/update/`, formData)
      .then((response) => {
        // Handle success
        console.log("Profile updated successfully");
        setSuccessMessage("Profile updated successfully"); // Set success message

        // Reset the success message after a delay
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000); // Adjust the delay
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating profile", error);
      });
  };

  useEffect(() => {
    // Fetch the user's existing profile data and populate the form
    api
      .get(`profile/`)
      .then((response) => {
        const { phone_number, full_name, bio } = response.data;
        setFormData({
          phone_number: phone_number || "",
          full_name: full_name || "",
          bio: bio || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching user profile data", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card shadow">
            <div className="card-header">
              <h2>Edit Profile</h2>
              {successMessage && ( // Conditionally render the success message
                <div className="alert alert-success">{successMessage}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="phone_number" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="full_name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="bio" className="form-label">
                    Bio
                  </label>
                  <textarea
                    className="form-control"
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
