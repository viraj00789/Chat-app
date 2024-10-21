import React, { useState } from "react";
import "./StatusSideBar.sass";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { randomData } from "../data.js";
import UserStatus from "./UserStatus.jsx";
import { useTheme } from "../../store/ThemeContext.jsx";

const StatusSideBar = () => {
  const radius = 26;
  const strokeWidth = 2.5;
  const circumference = 2 * Math.PI * radius;
  const gap = 2;
  const segmentLength = circumference / 5 - gap;

  const [userStatuses, setUserStatuses] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [viewed, setViewed] = useState(randomData);
  const [prevViewed, setPrevViewed] = useState([]);
  const {isDark} =  useTheme();
  const [isClosed,setIsClosed]= useState(false);

  const handleClosed = (cl) => 
  {
     setIsClosed(cl)
  }

  const handleChat = (item) => {
    setCurrentUserId(item.id);
    handleClosed(false);
    setUserStatuses((prev) => ({
      ...prev,
      [item.id]: {
        images: item.imageArray || [],
        currentIndex: 0,
      },
    }));
    };

  const handleIndexes = (userId, newIndex) => {
    setUserStatuses((prev) => {
      const updatedUserStatuses = {
        ...prev,
        [userId]: {
          ...prev[userId],
          currentIndex: newIndex,
        },
      };

      if (
        newIndex === updatedUserStatuses[userId].images.length &&
        !prevViewed.some((view) => view.id === userId)
      ) {
        const userToMove = viewed.find((user) => user.id === userId);
        if (userToMove) {
          setPrevViewed([...prevViewed, userToMove]);
          setViewed(viewed.filter((view) => view.id !== userId));
        }
      }

      return updatedUserStatuses;
    });
  };



  return (
    <>
      <div className={`${isDark ? "active" : "inactive"}`}>
        <div className={`status-header ${isDark ? "active" : "inactive"}`}>
          <div className={`status-back-arrow ${isDark ? "active" : "inactive"}`}>
            <Link to="/">
              <IoIosArrowBack color={"#808080"} size={25} />
            </Link>
          </div>
          <h3>Status</h3>
        </div>
        <div className={`status-header-subcnt-1 ${isDark ? "active" : "inactive"}`}>
          <img
            className="status-header-img"
            src="https://randomuser.me/api/portraits/men/3.jpg"
            alt="User Avatar"
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
            <p style={{fontWeight:"500",borderBottom:"1px solid #808080",paddingBottom:"20px"}} >Recent Updates</p>
          </div>
          <div className={`status-chat  ${isDark ? "active" : "inactive"}` }>
            {viewed.map((item, index) => {
              const userStatus = userStatuses[item.id] || {
                currentIndex: 0,
              };
              return (
                <div
                  className="status-chat-render"
                  key={index}
                  onClick={() => handleChat(item)}
                >
                  <div className="chat-container" title={item.name}>
                    <div className="status-div-1">
                      <div className="status-ring">
                        <div className="status-ring-container">
                          <svg width="60" height="60" viewBox="0 0 60 60">
                            {[...Array(5)].map((_, i) => {
                              const offset = (circumference / 5) * i + gap;
                              const strokeColor =
                                userStatus.currentIndex > i
                                  ? "lightgray"
                                  : "green";

                              return (
                                <circle
                                  key={i}
                                  cx="30"
                                  cy="30"
                                  r={radius}
                                  stroke={strokeColor}
                                  strokeWidth={strokeWidth}
                                  fill="none"
                                  strokeLinecap="rounded"
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
                          alt="User"
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
          {prevViewed.length > 0 && (
            <>
              <p style={{fontWeight:"500"}}>Recently Viewed</p>
              <div className="status-chat-1">
                {prevViewed.map((item, index) => (
                  <div
                    className="status-chat-render"
                    key={index}
                    onClick={() => handleChat(item)}
                  >
                    <div className="chat-container" title={item.name}>
                      <div className="status-div-1">
                        <div className="status-ring">
                          <div className="status-ring-container">
                            <svg width="60" height="60" viewBox="0 0 60 60">
                              {[...Array(5)].map((_, i) => {
                                const offset = (circumference / 5) * i + gap;
                                const strokeColor =
                                  userStatuses[item.id]?.currentIndex > i
                                    ? "lightgray"
                                    : "green";

                                return (
                                  <circle
                                    key={i}
                                    cx="30"
                                    cy="30"
                                    r={radius}
                                    stroke={strokeColor}
                                    strokeWidth={strokeWidth}
                                    fill="none"
                                    strokeDasharray={`${segmentLength} ${
                                      circumference - segmentLength
                                    }`}
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
                            alt="User"
                            className="status-image"
                          />
                        </div>
                        <div className="status-detail">
                          <h3 className="status-name">
                            {item?.name?.length < 15
                              ? item?.name
                              : `${item?.name?.slice(0, 15)}...`}
                          </h3>
                          <span className="status-message">
                            {item?.statusTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
        <UserStatus
          setCurrentStatusIndex={setCurrentStatusIndex}
          status={userStatuses[currentUserId]?.images || []}
          currentStatusIndex={currentStatusIndex}
          handleIndexes={handleIndexes}
          userId={currentUserId}
          isClosed={isClosed}
          handleClosed={handleClosed}
        />
    </>
  );
};

export default StatusSideBar;
