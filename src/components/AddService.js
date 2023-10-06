import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import useTokenValidation from "../hooks/useTokenValidation";
import ServiceCard from "./ServiceCard";

const AddService = () => {
  const { isLoggedIn, token, username, user_id } = useTokenValidation();

  const [successClassName, setSuccessClassName] = useState("");

  const [isContentVisible, setIsContentVisible] = useState(false);
  const [newServiceData, setNewServiceData] = useState(null); // State for the new service data

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };
  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  api.defaults.headers.common["Authorization"] = `Token ${token}`;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fee: "",
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

    // Send a POST request to add the service
    api
      .post(`services/add/`, formData)
      .then((response) => {
        // Handle success
        console.log("Service requested successfully", response.data);

        // Extract the new service data from the response
        const newServiceData = response.data;

        // Set the state with the new service data
        setNewServiceData(newServiceData);

        // Clear the form fields
        setFormData({
          title: "",
          description: "",
          fee: "",
        });

        // Set the success message
        setSuccessMessage("Service requested successfully");

        setSuccessClassName("green-border");

        // Reset the success message after a delay (e.g., 3 seconds)
        setTimeout(() => {
          setSuccessMessage(null);
          setSuccessClassName("");
        }, 3000); // Adjust the delay as needed (e.g., 3000 milliseconds = 3 seconds)
      })
      .catch((error) => {
        // Handle error
        console.error("Error requesting service", error);
        // You can add code to handle errors, e.g., show an error message.
      });
  };

  console.log("successClassName:", successClassName);
  return (
    <div>
      <div className="card">
        <div className="card-header card-header border-0 pb-0">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <h1 className="h6">Add Service</h1>
            </div>
            <span className="mb-3" role="button">
              <a className="nav-link" onClick={toggleContent}>
                {isContentVisible ? (
                  <i className="bi bi-file-minus-fill"></i>
                ) : (
                  <i className="bi bi-file-plus-fill"></i>
                )}
              </a>
            </span>
          </div>
        </div>
        <div
          className={
            isContentVisible ? "collapse show card-body" : "collapse card-body"
          }
        >
          {successMessage && ( // Conditionally render the success message
            <div className="alert alert-success">{successMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fee" className="form-label">
                Fee
              </label>
              <input
                type="text"
                className="form-control"
                id="fee"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Request
            </button>
          </form>
        </div>
      </div>

      {newServiceData ? (
        <ServiceCard
          key={newServiceData.id}
          service={newServiceData}
          successClassName={successClassName}
        />
      ) : null}
    </div>
  );
};

export default AddService;
