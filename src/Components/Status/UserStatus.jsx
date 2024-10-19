import React, { useEffect, useState } from "react";
import "./UserStatus.sass";

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
  const segmentLength = 320 / numSegments;
  const gap = 5;

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
      }, 1500); 

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
      setDisplayedImage(status[currentStatusIndex]); // Update image immediately
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
        onClick={() => setIsPaused(true)}
      >
        <div className="status-bar-container">
          <svg width="400" height="10px">
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
              const strokeColor = i === 0 ? "white" : (isFilled ? "white" : "gray"); // First segment always white

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
                  className={`${(currentStatusIndex >=1 && i >= 1 && isFilled) ? "start-animated" : ""}`} // Apply animation class for segments from index 1 onward
                />
              );
            })}
          </svg>
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
