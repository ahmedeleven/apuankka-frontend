import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function InterestCard({ interest }) {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
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
            <div className="d-flex justify-content-between">
              <h6 className="mb-1">{interest.user.username}</h6>
              <small className="ms-2" onClick={toggleContent}>
                {isContentVisible ? (
                  <i className="bi bi-chevron-up"></i>
                ) : (
                  <i className="bi bi-chevron-down"></i>
                )}
              </small>
            </div>
            <div className={isContentVisible ? "collapse show" : "collapse"}>
              <p className=" mb-0">
                <i className="bi bi-chat-left-text-fill"></i>
                <span className="ms-2">
                  {interest.user.profile?.bio
                    ? interest.user.profile.bio
                    : null}
                </span>
              </p>

              <p className=" mb-0">
                <i className="bi bi-file-person-fill"></i>
                <span className="ms-2">
                  {interest.user.profile?.full_name
                    ? interest.user.profile.full_name
                    : null}
                </span>
              </p>

              <p className=" mb-0">
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
