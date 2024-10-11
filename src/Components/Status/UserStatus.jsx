import React, { useEffect, useState } from "react";
import "./UserStatus.sass"
const UserStatus = ({ status }) => {
  console.log(status);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (status && status && status.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % status.length);
      }, 3000); // Switches images every 3 seconds
      return () => clearInterval(interval);
    }
  }, [status]);

  if (!status) return null;

  return (
    <div className="container">
      <img
        src={status[currentImageIndex]}
        alt="Status"
        className="status-user-image"
      />
      <div className="status-bar-container">
        <div
          className="status-bar"
          style={{ width: `${(currentImageIndex + 1) / status.length * 100}%` }}
        />
      </div>
      <h3>{status.name}</h3>
    </div>
  );
};

export default UserStatus;
