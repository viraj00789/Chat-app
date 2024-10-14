import React, { useEffect, useState } from "react";
import "./UserStatus.sass";

const UserStatus = ({ status }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  console.log();
  const onClose = () => {
    setIsClosed(true);
    setCurrentImageIndex(0);
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
      setCurrentImageIndex(0);
    }
  }, [status]);

  useEffect(() => {
    let interval;

    if (status && status.length > 0 && !isClosed && !isPaused) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          if (prevIndex + 1 === status.length) {
            onClose();
            return prevIndex;
          }
          return prevIndex + 1;
        });
      }, 1000);
    }

    window.addEventListener("keydown", handleBackArrow);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      window.removeEventListener("keydown", handleBackArrow);
    };
  }, [status, isPaused, isClosed]);

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
      <div
        className="progess-bar"
        style={{
          width: `${((currentImageIndex + 1) / status.length) * 100}%`,
          transition: "width 1s linear",
        }}
      ></div>
      <div className="status-bar-container">
        {status.map((items) => (
          <div
            className="status-bar"

          ></div>
        ))}
      </div>

      <img
        src={status[currentImageIndex]}
        alt="Status"
        className="status-user-image"
      />
    </div>
  );
};

export default UserStatus;
