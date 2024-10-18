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
  const [progress, setProgress] = useState(0);

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
      setProgress(0);
    }
  }, [status, setCurrentStatusIndex]);

  useEffect(() => {
    let interval;
    let progressInterval;

    if (status.length > 0 && !isClosed && !isPaused) {
      interval = setInterval(() => {
        setCurrentStatusIndex((prevIndex) => {
          const nextIndex = prevIndex+1;

          handleIndexes(userId, prevIndex + 1);

          if (nextIndex >= status.length) {
            onClose();
            return prevIndex;
          }
          return nextIndex;
        });
      }, 1500);
      const totalTime = status.length * 1500;
      const progressIncrement = (100 / totalTime) * 100;

      progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          const nextProgress = prevProgress + progressIncrement;

          if (nextProgress >= 100) return 100;
          return nextProgress;
        });
      }, 100);

      window.addEventListener("keydown", handleBackArrow);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      window.removeEventListener("keydown", handleBackArrow);
    };
  }, [status, isPaused, isClosed, setCurrentStatusIndex]);

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
      >
        <div className="status-bar-container">
          <div className="status-bar-wrapper">
            <div
              className="status-bar"
              style={{
                width: "100%",
                backgroundColor: "gray",
                height: "100%",
                position: "absolute", 
              }}
            />

            <div className="status-bar-segments">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="segment"
                  style={{
                    position: "absolute",
                    left: `${i * 20}%`,
                    width: "2px",
                    height: "100%",
                    zIndex: 2,
                    backgroundColor: "#666666",
                  }}
                />
              ))}
            </div>

            <div
              className="status-bar-green"
              style={{
                width: `${progress}%`,
                backgroundColor: "green",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                transition: "width 0.1s linear",
              }}
            />
          </div>
        </div>

        <img
          src={status[currentStatusIndex]}
          alt="Status"
          className="status-user-image"
        />
      </div>
    </>
  );
};

export default UserStatus;
