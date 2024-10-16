import React, { useState } from "react";
import "./StatusSideBar.sass";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { randomData } from "../data.js";
import UserStatus from "./UserStatus.jsx";

const StatusSideBar = () => {
  const [currentStatus, setCurrentStatus] = useState([]);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [progressPerUser, setProgressPerUser] = useState({});
  const [wobble, setWobble] = useState(0);

  const handleChat = (item, index) => {
    setCurrentStatus(item?.imageArray || []);
    setCurrentStatusIndex(0);

    if (!(index in progressPerUser)) {
      updateProgress(index, 0);
    }
    setWobble(1);
  };

  const updateProgress = (userIndex, progress) => {
    setProgressPerUser((prev) => ({
      ...prev,
      [userIndex]: progress,
    }));
  };

  const calculateStrokeDashArray = (storyCount,currentStatusIndex) => {
    const radius = 26;
    const circumference = 2 * Math.PI * radius;
    const dashLength = circumference / storyCount;
    const gapLength = dashLength * 0.1;
    return `${dashLength - gapLength} ${gapLength}`;
  };

  const calculateStrokeDashOffset = (currentProgress, totalStories) => {
    const radius = 26;
    const circumference = 2 * Math.PI * radius;
    return circumference - (circumference * currentProgress) / totalStories;
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
              const storyCount = item.imageArray?.length || 1;
              const dashArray = calculateStrokeDashArray(storyCount,currentStatusIndex);
              const currentProgress = progressPerUser[index] || 0;
              const dashOffset = calculateStrokeDashOffset(
                currentStatusIndex,
                storyCount
              );
              const strokeColor =
                currentStatusIndex >= storyCount ? "green" : "grey";
              console.log(currentStatusIndex, storyCount, strokeColor);

              return (
                <div
                  className="status-chat-render"
                  key={index}
                  onClick={() => handleChat(item, index)}
                >
                  <div className="chat-container" title={item.name}>
                    <div className="status-div-1">
                      <div className="status-ring">
                        <svg width="60" height="60">
                          <circle
                            cx="30"
                            cy="30"
                            r="26"
                            stroke={strokeColor}
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={dashArray}
                            // strokeDashoffset={dashOffset}
                            // className="second-circle"
                            // wobble={wobble}
                            // onAnimationEnd={() => setWobble(0)}
                          />
                        </svg>
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
      <UserStatus
        status={currentStatus}
        currentStatusIndex={currentStatusIndex}
        setCurrentStatusIndex={setCurrentStatusIndex}
        updateProgress={updateProgress}
        totalStories={currentStatus.length}
      />
    </>
  );
};

export default StatusSideBar;
