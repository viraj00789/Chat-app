

import React, { useState } from "react";
import "./StatusSideBar.sass";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { randomData } from "../data.js";
import UserStatus from "./UserStatus.jsx";

const StatusSideBar = () => {
  const [currentStatus, setCurrentStatus] = useState(null);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [statusComplete, setStatusComplete] = useState(false); //

  const handleChat = (item, index) => {
    setCurrentStatus(item?.imageArray);
    setCurrentStatusIndex(0);  
    setStatusComplete(false); };

  const calculateStrokeDashoffset = (index, total) => {
    const radius = 30; 
    const circumference = 2 * Math.PI * radius; 
    return circumference - (index / total) * circumference; 
  };

  return (
    <>
      <div>
        <div className="status-header">
          <div className="status-back-arrow">
            <Link to="/">
              <IoIosArrowBack color={"#fff"} size={20} />
            </Link>
          </div>
          <h3>Status</h3>
        </div>

        <div className="status-header-subcnt-1">
          <img
            className="status-header-img"
            src="https://randomuser.me/api/portraits/men/3.jpg"
            alt=""
          />
          <div className="status-header-details">
            <h4 className="status-header-detail-name">Viraj</h4>
            <div className="status">
              <span className="status-header-detail-status">Today 10:00</span>
            </div>
          </div>
        </div>

        <div>
          <div>
            <p>Recent Updates</p>
          </div>

          <div className="status-chat">
            {randomData.map((item, index) => (
              <div
                className="status-chat-render"
                key={index}
                onClick={() => handleChat(item, index)}
              >
                <div className="chat-container" title={item.name}>
                  <div className="status-div-1">
                    <div className="status-ring">
                      <svg width="60" height="60">
                        <circle
                          cx="30"
                          cy="30"
                          r="25" 
                          stroke="#e6e6e6"
                          strokeWidth="4"
                          fill="none"
                          />
                        <circle
                          cx="30"
                          cy="30"
                          r="25"
                          stroke="green"
                          strokeWidth="5"
                          fill="none"
                          strokeDasharray="151" 
                          strokeDashoffset={calculateStrokeDashoffset(
                            currentStatusIndex,
                            item.imageArray.length 
                          )}
                          style={{
                            transition: "stroke-dashoffset 0.5s ease-in-out",
                          }} 
                        />
                      </svg>

                      <img
                        src={
                          item.image ||
                          "https://randomuser.me/api/portraits/men/9.jpg"
                        }
                        alt=""
                        className="status-image"
                      />
                    </div>

                    <div className="status-detail">
                      <h3 className="status-name">
                        {item.name.length < 15
                          ? item.name
                          : item.name.slice(0, 15) + "..."}
                      </h3>
                      <span className="status-message">{item.statusTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <UserStatus
        status={currentStatus}
        currentStatusIndex={currentStatusIndex}
        setCurrentStatusIndex={setCurrentStatusIndex}
        setStatusComplete={setStatusComplete}
      />
    </>
  );
};

export default StatusSideBar;
