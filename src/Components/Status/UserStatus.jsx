import React, { useEffect, useState } from "react";
import "./UserStatus.sass";

const UserStatus = ({ status }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const onClose = () => {
    setIsClosed(true);
    setCurrentImageIndex(0);
  };

  useEffect(() => {
    if (status && status.length > 0 && !isClosed) {
      const interval = !isPaused
        ? setInterval(() => {
            setCurrentImageIndex((prevIndex) => {
              if (prevIndex + 1 === status.length) {
                onClose(); // Close when reaching the last image
                return prevIndex; // Keep current index as is
              }
              return prevIndex + 1;
            });
          }, 3000)
        : null;

      const handleBackArrow = (event) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleBackArrow);

      return () => {
        if (interval) clearInterval(interval);
        window.removeEventListener("keydown", handleBackArrow);
      };
    }
  }, [status, isPaused, isClosed]); 

  if (!status || isClosed) return null;

  return (
    <div
      className="container"
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="status-bar-container">
        <div
          className="status-bar"
          style={{
            width: `${((currentImageIndex + 1) / status.length) * 100}%`,
          }}
        />
      </div>
      <img
        src={status[currentImageIndex]}
        alt="Status"
        className="status-user-image"
      />
      <h3>{status.name}</h3>
    </div>
  );
};

export default UserStatus;
