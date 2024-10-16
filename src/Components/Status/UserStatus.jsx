import React, { useEffect, useState } from "react";
import "./UserStatus.sass";

const UserStatus = ({
  status,
  currentStatusIndex,
  setCurrentStatusIndex,
  updateProgress,
  totalStories,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

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
    if (status) {
      setIsClosed(false);
      setIsPaused(false);
      setCurrentStatusIndex(0);
    }
  }, [status, setCurrentStatusIndex]);

  useEffect(() => {
    let interval;

    if (status && status.length > 0 && !isClosed && !isPaused) {
      interval = setInterval(() => {
        setCurrentStatusIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;

          if (nextIndex === status.length) {
            onClose();
            return prevIndex;
          }

          // Update progress for current status
          updateProgress(status[0]?.userIndex, (nextIndex + 1) / totalStories);
          return nextIndex;
        });
      }, 1000); // Adjust timing as needed

      window.addEventListener("keydown", handleBackArrow);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      window.removeEventListener("keydown", handleBackArrow);
    };
  }, [status, isPaused, isClosed, setCurrentStatusIndex, updateProgress, totalStories]);

  if (!status || isClosed) {
    return null;
  }

  return (
    <div
      className="container"
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)} 
      onTouchEnd={() => setIsPaused(false)} 
    >
      <div className="status-bar-container">
        {status.map((_, index) => (
          <div
            key={index}
            className={`status-bar ${currentStatusIndex === index ? 'active' : ''}`} 
            style={{
              width: `100%`,
              backgroundColor: currentStatusIndex >= index ? 'green' : 'gray', 
              transition: currentStatusIndex === index ? 'width 2s ease-in-out' : 'none',
            }}
          />
        ))}
      </div>

      <img
        src={status[currentStatusIndex]}
        alt="Status"
        className="status-user-image"
      />
      <h3>{`Story ${currentStatusIndex + 1} of ${status.length}`}</h3>
    </div>
  );
};

export default UserStatus;