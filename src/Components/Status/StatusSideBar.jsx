import React, { useState } from 'react';
import './StatusSideBar.sass';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { randomData } from '../data.js';
import UserStatus from './UserStatus.jsx';

const StatusSideBar = () => {
  const [currentStatus, setCurrentStatus] = useState(null);

  const handleChat = (item) => {
    setCurrentStatus(item?.imageArray);
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
          <h2>Status</h2>
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
              <div className="status-chat-render" key={index} onClick={() => handleChat(item)}>
                <div className="chat-container" title={item.name}>
                  <div className="status-div-1">
                    <img
                      src={item.image || "https://randomuser.me/api/portraits/men/9.jpg"}
                      alt=""
                      className="status-image"
                    />
                    <div className="status-detail">
                      <h3 className="status-name">
                        {item.name.length < 15 ? item.name : item.name.slice(0, 15) + "..."}
                      </h3>
                      <span className="status-message">
                        {item.statusTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <UserStatus status={currentStatus} data={randomData} />
    </>
  );
};

export default StatusSideBar;