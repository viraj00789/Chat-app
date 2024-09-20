import React from "react";
import "./ConvHeader.sass";
import { IoCall } from "react-icons/io5";
import { useTheme } from "../../store/ThemeContext";
import { MdOutlineFilePresent } from "react-icons/md";
import { BsSendFill } from "react-icons/bs";
import { useChat } from "../../store/ChatContext";

const ConvHeader = () => {
  const { isDark } = useTheme();
  const { chat } = useChat();

  console.log(chat);
  console.log("innn");
  if (!chat) return <h1>Please Select Chat</h1>;
  return (
    <>
      <div
        className="cov-header-cont"
        style={{ backgroundColor: isDark ? "#fff" : "#000" }}
      >
        <div
          className="cov-header-subcnt-1"
          style={{ color: isDark ? "#000" : "#fff" }}
        >
          <img className="cov-header-img" src={chat?.image} alt="" />
          <div className="cov-header-details">
            <p className="cov-header-detail-name">{chat?.name}</p>
            <span className="cov-header-detail-status">Online</span>
          </div>
        </div>
        <div className="cov-header-subcnt-2">
          <IoCall size={20} />
        </div>
      </div>

    <div className="message-divs">
      <div className="message">
        <div className="message__outer">
          {/* <div className="message__avatar"><FaCoffee size={35}/></div> */}
          <div className="message__inner">
            <div className="message__bubble">{chat?.chat}</div>
          </div>
          <div className="message__status">
            <img
              className="user-chat-image"
              src="https://randomuser.me/api/portraits/women/2.jpg"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="cov-div">
        <MdOutlineFilePresent
          className="cov-icon-1"
          color="#9568dd"
          size={28}
        />
        <div className="input-cov-icon">
          <input
            className="input-cov"
            type="text"
            placeholder="Enter Message"
          />
          <BsSendFill className="cov-icon" color="#9568dd" size={20} />
        </div>
      </div>
      </div>
    </>
  );
};

export default ConvHeader;
