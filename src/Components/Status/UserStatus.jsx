import React, { useEffect, useState } from "react";
import "./UserStatus.sass";
import { randomData } from "../data";
import { MdOutlineStar } from "react-icons/md";

const UserStatus = ({
  status,
  currentStatusIndex,
  setCurrentStatusIndex,
  handleIndexes,
  userId,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [displayedImage, setDisplayedImage] = useState(status[1]);
  const numSegments = 5;
  const segmentLength = 300 / numSegments;
  const gap = 3.5;
  console.log(randomData[0])

  const onClose = () => {
    setIsClosed(true);
    setCurrentStatusIndex(0);
  };

  const handleBackArrow = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (status.length > 0) {
      setIsClosed(false);
      setIsPaused(false);
      setCurrentStatusIndex(0);
      setDisplayedImage(status[1]);
    }
  }, [status, setCurrentStatusIndex]);

  useEffect(() => {
    let interval;

    if (status.length > 0 && !isClosed && !isPaused) {
      interval = setInterval(() => {
        setCurrentStatusIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;

          handleIndexes(userId, nextIndex);

          if (nextIndex >= status.length) {
            onClose();
            return prevIndex;
          }
          return nextIndex;
        });
      }, 1600);

      window.addEventListener("keydown", handleBackArrow);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      window.removeEventListener("keydown", handleBackArrow);
    };
  }, [status, isPaused, isClosed, setCurrentStatusIndex]);

  useEffect(() => {
    if (status.length > 0) {
      setDisplayedImage(status[currentStatusIndex]);
    }
  }, [currentStatusIndex, status]);

  if (!status.length || isClosed) {
    return null;
  }

  return (
    <>
      <div className="overlay" onClick={onClose}></div>

      <div
        className="container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onClick={() => setIsPaused(!isPaused)}
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
              const strokeColor = i === 0 ? "white" : (isFilled ? "white" : "gray");

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
                  className={`${(currentStatusIndex >= 1 && i >= 1 && isFilled) ? "start-animated" : ""}`}
                />
              );
            })}
          </svg>
        </div>

        <div className="status-bar-user-details">
          <div className="user-status-render">
            <div
              className="status-container-1"
            >
              <div className="status-div-1">
                <img
                  src={randomData[userId-1]?.image}
                  alt=""
                  className="user-image-details"
                />
                <div>
                  <h3 className="user-status-name">
                    {randomData[userId-1]?.name?.slice(0, 6) + ""}
                  </h3>
                </div>
              </div>
              <div>
                <p className="user-status-date">
                  {randomData[userId-1]?.date}
                </p>
              </div>
            </div>
          </div>
        </div>

        <img
          src={displayedImage}
          alt="Status"
          className="status-user-image"
        />
      </div>
    </>
  );
};

export default UserStatus;
