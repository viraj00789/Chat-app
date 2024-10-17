import React, { useState } from "react";
import "./StatusSideBar.sass";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { randomData } from "../data.js";
import UserStatus from "./UserStatus.jsx";

const StatusSideBar = () => {
  const radius = 26;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const gap = 2;
  const segmentLength = circumference / 5 - gap;
  
  const [userStatuses, setUserStatuses] = useState({}); 
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  console.log(userStatuses);

  const handleChat = (item, index) => {
    setCurrentUserId(item.id); 
    setCurrentStatusIndex(0);
    
    setUserStatuses((prev) => ({
      ...prev,
      [item.id]: {
        images: item.imageArray || [],
        currentIndex: 0,
      },
    }));
  };

  const handleIndexes = (userId, newIndex) => {
    setUserStatuses((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        currentIndex: newIndex,
      },
    }));
  };

  return (
    <>
      <div>
        <div className="status-header">
          <div className="status-back-arrow">
            <Link to="/">
              <IoIosArrowBack color={"#fff"} size={20} />
            </Link>
          </div>
          <h3>Status</h3>
        </div>
        <div className="status-header-subcnt-1">
          <img
            className="status-header-img"
            src="https://randomuser.me/api/portraits/men/3.jpg"
            alt=""
          />
          <div className="status-header-details">
            <h4 className="status-header-detail-name">Viraj</h4>
            <div className="status">
              <span className="status-header-detail-status">Today 10:00</span>
            </div>
          </div>
        </div>
        <div>
          <div>
            <p>Recent Updates</p>
          </div>
          <div className="status-chat">
            {randomData.map((item, index) => {
              const userStatus = userStatuses[item.id] || { images: [], currentIndex: 0 };
              return (
                <div
                  className="status-chat-render"
                  key={index}
                  onClick={() => handleChat(item, index)}
                >
                  <div className="chat-container" title={item.name}>
                    <div className="status-div-1">
                      <div className="status-ring">
                        <div className="status-ring-container">
                          <svg width="60" height="60" viewBox="0 0 60 60">
                            {[...Array(5)].map((_, i) => {
                              const offset = (circumference / 5) * i + gap;
                              const strokeColor =
                                userStatus.currentIndex > i ? "lightgray" : "green";

                              return (
                                <circle
                                  key={i}
                                  cx="30"
                                  cy="30"
                                  r={radius}
                                  stroke={strokeColor}
                                  strokeWidth={strokeWidth}
                                  fill="none"
                                  strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                                  strokeDashoffset={circumference - offset}
                                  transform={`rotate(-90 30 30)`}
                                  className="segment"
                                />
                              );
                            })}
                          </svg>
                        </div>
                        <img
                          src={
                            item.image ||
                            "https://randomuser.me/api/portraits/men/9.jpg"
                          }
                          alt=""
                          className="status-image"
                        />
                      </div>
                      <div className="status-detail">
                        <h3 className="status-name">
                          {item.name.length < 15
                            ? item.name
                            : `${item.name.slice(0, 15)}...`}
                        </h3>
                        <span className="status-message">
                          {item.statusTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {currentUserId && (
        <UserStatus
          setCurrentStatusIndex={setCurrentStatusIndex}
          status={userStatuses[currentUserId]?.images || []}
          currentStatusIndex={currentStatusIndex}
          handleIndexes={handleIndexes}
          userId={currentUserId} 
        />
      )}
    </>
  );
};

export default StatusSideBar;
