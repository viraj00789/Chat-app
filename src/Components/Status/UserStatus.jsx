import React, { useEffect, useState } from "react";
import "./UserStatus.sass";

const UserStatus = ({ status,setStatusComplete,currentStatusIndex ,setCurrentStatusIndex}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const onClose = () => {
    setIsClosed(true);
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
    }
  }, [status]);

  useEffect(() => {
    let interval;

    if (status && status.length > 0 && !isClosed && !isPaused) {
      interval = setInterval(() => {
        setCurrentStatusIndex((prevIndex) => {
          if (prevIndex + 1 === status.length) {
            onClose();
            setStatusComplete(true); // Mark status as complete
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
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div
        className="progess-bar"
        style={{
          width: `${((currentStatusIndex + 1) / status.length) * 100}%`,
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
        src={status[currentStatusIndex]}
        alt="Status"
        className="status-user-image"
      />
    </div>
  );
};

export default UserStatus;
