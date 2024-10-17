import React, { useEffect, useState } from "react";
import "./UserStatus.sass";

const UserStatus = ({
  status,
  currentStatusIndex,
  setCurrentStatusIndex,
  handleIndexes,
  userId 
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
    if (status.length > 0) {
      setIsClosed(false);
      setIsPaused(false);
      setCurrentStatusIndex(0);
    }
  }, [status, setCurrentStatusIndex]);

  useEffect(() => {
    let interval;

    if (status.length > 0 && !isClosed && !isPaused) {
      interval = setInterval(() => {
        setCurrentStatusIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;

          handleIndexes(userId, prevIndex+1);

          if (nextIndex >= status.length) {
            onClose();
            return prevIndex;
          }
          
          return nextIndex;
        });
      }, 750);
      
      window.addEventListener("keydown", handleBackArrow);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
      window.removeEventListener("keydown", handleBackArrow);
    };
  }, [status, isPaused, isClosed, setCurrentStatusIndex]);
  
  if (!status.length || isClosed) {
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
              backgroundColor: currentStatusIndex > index ? 'green' : 'gray', 
              transition: currentStatusIndex === index ? 'width 3s ease' : 'none',
            }}
          />
        ))}
      </div>

      <img
        src={status[currentStatusIndex]}
        alt="Status"
        className="status-user-image"
      />

    </div>
  );
};

export default UserStatus;