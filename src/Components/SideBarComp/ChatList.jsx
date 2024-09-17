import React from "react";
import "./ChatList.sass";
import { randomData } from "../data";

const ChatList = () => {
  return (
    <>
    <div className="user-chat">
     {randomData.map((items) => (
       <div className="chat-container">
        <div className="chat-div-1">
          <img
            src={`${items.image}`}
            alt=""
            className="user-image"
          />
          <div className="chat-detail">
            <h3 className="user-name">{`${items.name.slice(0,6)}`}</h3>
            <span className="user-message">{`${items.chat.slice(0,15)}...`}</span>
          </div>
        </div>
        <div className="chat-div-2">
          <span className="user-date">{`${items.date}`}</span>
        </div>
      </div>))
      }
    </div>
    </>
  );
};

export default ChatList;
