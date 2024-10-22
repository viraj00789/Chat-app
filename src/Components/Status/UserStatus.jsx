import React, { useEffect, useState } from "react";
import "./UserStatus.sass";
import { randomData } from "../data";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const UserStatus = ({
  status,
  currentStatusIndex,
  setCurrentStatusIndex,
  handleIndexes,
  userId,
  isClosed,
  handleClosed,
  handleUserStatuses,
  userStatuses,
  setUserStatuses,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const numSegments = status.length;
  const segmentLength = 275 / (numSegments || 1);
  const gap = 3.5;

  // console.log(userStatuses);

  useEffect(() => {
    if (status.length > 0) {
      handleClosed(false);
      setIsPaused(false);
    }
  }, [status, setCurrentStatusIndex]);






  const onClose = () => {
    handleClosed(true);
    setCurrentStatusIndex((prevIndex) => {
      const newIndex = prevIndex >= status.length - 1 ? 0 : prevIndex + 1;
      handleUserStatuses(userId, newIndex);
      return newIndex;
    });
  };



  const handleBackArrow = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };


  useEffect(() => {
    let interval;
  
    if (status.length > 1 && !isClosed && !isPaused) {
      interval = setInterval(() => {
        setCurrentStatusIndex((prevIndex) => {
          const newIndex = prevIndex >= status.length - 1 ? 0 : prevIndex + 1;
          handleIndexes(userId, newIndex); 
          return newIndex;
        });
      }, 1200);
  
      window.addEventListener("keydown", handleBackArrow);
    }
  
    return () => {
      if (interval) {
        clearInterval(interval);
      }
      window.removeEventListener("keydown", handleBackArrow);
    };
  }, [status, isPaused, isClosed, currentStatusIndex]);

  if (!status.length || isClosed) {
    return null;
  }

  const handlePrev = (e) => {
    e.stopPropagation();
    if (currentStatusIndex > 0) {
      setCurrentStatusIndex(currentStatusIndex - 1);
      handleIndexes(userId, currentStatusIndex - 1);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (currentStatusIndex < status.length - 1) {
      setCurrentStatusIndex(currentStatusIndex + 1);
      handleIndexes(userId, currentStatusIndex + 1);
    }
  };

  return (
    <>
      <div className="overlay" onClick={() => handleClosed(true)}>
        {/* <h1>{userStatuses[userId]?.currentIndex}</h1> */}

        <div className="container">
          <div className="status-upper">
            <div className="status-bar-container">
              <svg>
                {[...Array(numSegments)].map((_, i) => {
                  const offset = (segmentLength + gap) * i;

                  return (
                    <line
                      key={i}
                      x1={offset}
                      y1="5"
                      x2={offset + segmentLength - gap}
                      y2="5"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={`${segmentLength} ${segmentLength}`}
                      className="base-segment"
                      stroke="gray"
                    />
                  );
                })}
                {[...Array(numSegments)].map((_, i) => {
                  const offset = (segmentLength + gap) * i;
                  const isFilled = userStatuses[userId]?.currentIndex >= i;
                  const isViewed = i < userStatuses[userId]?.currentIndex;
                  const strokeColor = isFilled ? "white" : "";

                  return (
                    <line
                      key={i}
                      x1={offset}
                      y1="5"
                      x2={offset + segmentLength - gap}
                      y2="5"
                      stroke={strokeColor}
                      strokeWidth="5"
                      strokeLinecap="round"
                      style={{
                        animationPlayState: isPaused ? "paused" : "running",
                      }}
                      className={`${
                        isFilled && !isViewed ? "start-animated" : ""
                      }`}
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="status-bar-user-details">
            <div className="user-status-render">
              <div className="status-container-1">
                <div className="status-div-1">
                  <img
                    src={randomData[userId - 1]?.image}
                    alt=""
                    className="user-image-details"
                  />
                  <div>
                    <h3 className="user-status-name">
                      {randomData[userId - 1]?.name?.slice(0, 6) + ""}
                    </h3>
                  </div>
                </div>
                <div>
                  <p className="user-status-date">
                    {randomData[userId - 1]?.date}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="status-navigation">
            <button onClick={handlePrev}>
              <FaArrowLeft />
            </button>
            <img
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              onClick={() => setIsPaused(!isPaused)}
              src={userStatuses[userId]?.images[currentStatusIndex]}
              alt="Status"
              className="status-user-image"
            />
            <button onClick={handleNext}>
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserStatus;
