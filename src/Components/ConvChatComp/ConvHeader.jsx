import React from "react";
import "./ConvHeader.sass";
import { IoCall } from "react-icons/io5";

const ConvHeader = () => {
  return (
    <div className="cov-header-cont">
      <div className="cov-header-subcnt-1">
        <img
          className="cov-header-img"
          src="https://randomuser.me/api/portraits/women/2.jpg"
          alt=""
        />
        <div className="cov-header-details">
          <p className="cov-header-detail-name">Alice</p>
          <span className="cov-header-detail-status">Online</span>
        </div>
      </div>
      <div className="cov-header-subcnt-2"><IoCall size={25}/></div>
    </div>
  );
};

export default ConvHeader;
