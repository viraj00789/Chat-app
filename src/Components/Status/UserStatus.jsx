import React, { useEffect, useState } from "react";
import "./UserStatus.sass";
import { randomData } from "../data";

const UserStatus = ({
  status,
  currentStatusIndex,
  setCurrentStatusIndex,
  handleIndexes,
  userId,
  isClosed,
  handleClosed,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const numSegments = 5;
  const segmentLength = 385 / numSegments;
  const gap = 3.5;

  useEffect(() => {
    if (status.length > 0) {
      handleClosed(false);
      setIsPaused(false);
    }
  }, [status, setCurrentStatusIndex]);

  const onClose = () => {
    handleClosed(true);
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
        if (currentStatusIndex >= status.length - 1) {
          setCurrentStatusIndex(0);
        } else {
          setCurrentStatusIndex(currentStatusIndex + 1);
        }
        handleIndexes(userId, currentStatusIndex+1);
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

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <h1>{currentStatusIndex}</h1>
     
      
        <div
          className="container"
        
        >
          <div className="status-bar-container">
            <svg width="100%" height="10px">
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
                const isFilled = currentStatusIndex >= i;
                console.log(currentStatusIndex,i);
                const isViewed = i < currentStatusIndex;
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
                    className={`${(isFilled && !isViewed) ? "start-animated" : ""} `}
                  />
                );
              })}
            </svg>
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

          <img
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            onClick={() => setIsPaused(!isPaused)}
            src={status[currentStatusIndex]}
            alt="Status"
            className="status-user-image"
          />
        </div>
      
    </>
  );
};

export default UserStatus;
