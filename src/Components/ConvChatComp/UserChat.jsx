import React from "react";
import "./UserChat.sass";

const UserChat = () => {
  return (
    <>
      <div className="message">
        <div className="message__outer">
          {/* <div className="message__avatar"><FaCoffee size={35}/></div> */}
          <div className="message__inner">
            <div className="message__bubble">Hello</div>
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
    </>
  );
};

export default UserChat;
