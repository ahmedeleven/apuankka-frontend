import React, { useState } from "react";
import handleToggleChosen from "../utils/handleToggleChosen";

function InterestCard({ interest }) {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isChosen, setIsChosen] = useState(interest.chosen); // Initialize isChosen with the value from interest

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };

  const handleToggle = () => {
    // Dynamically toggle between true and false based on the current isChosen state

    // Call handleToggleChosen with the new value
    handleToggleChosen(interest.service_id, interest.user.id, isChosen)
      .then((updatedIsChosen) => {
        setIsChosen(updatedIsChosen); // Update the state with the new value
      })
      .catch((error) => {
        console.error("Error in handleToggleChosen:", error);
      });
  };

  return (
    <div>
      <div className="d-flex position-relative">
        <div className="avatar avatar-xs avatar-interest">
          <img
            className="avatar-img rounded-circle"
            src={
              interest.user.profile?.profile_picture_url
                ? interest.user.profile.profile_picture_url
                : "../../assets/images/avatar/profile.jpg"
            }
            alt=""
          />
        </div>
        <div className="ms-2 card card-interest">
          <div className="rounded-start-top-0 p-3 rounded">
            <div className="d-flex justify-content-between ">
              <div className="d-flex align-items-center">
                <h6 className="mb-1">{interest.user.username}</h6>
              </div>
              <div className="d-flex align-items-center">
                <p className="ml-auto mt-2">Chosen</p>
                <span className="fs-3 ms-2" onClick={handleToggle}>
                  {isChosen ? (
                    <i className="bi bi-toggle-on"></i>
                  ) : (
                    <i className="bi bi-toggle-off"></i>
                  )}
                </span>
                <small className="ms-2" onClick={toggleContent}>
                  {isContentVisible ? (
                    <i className="bi bi-chevron-up"></i>
                  ) : (
                    <i className="bi bi-chevron-down"></i>
                  )}
                </small>
              </div>
            </div>
            <div className={isContentVisible ? "collapse show" : "collapse"}>
              <p className="mb-0">
                <i className="bi bi-chat-left-text-fill"></i>
                <span className="ms-2">
                  {interest.user.profile?.bio
                    ? interest.user.profile.bio
                    : null}
                </span>
              </p>

              <p className="mb-0">
                <i className="bi bi-file-person-fill"></i>
                <span className="ms-2">
                  {interest.user.profile?.full_name
                    ? interest.user.profile.full_name
                    : null}
                </span>
              </p>

              <p className="mb-0">
                <i className="bi bi-telephone-fill"></i>
                <span className="ms-2">
                  {interest.user.profile?.phone_number
                    ? interest.user.profile.phone_number
                    : null}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterestCard;
