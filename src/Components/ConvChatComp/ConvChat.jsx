import React from "react";
import "./ConvHeader.sass";

const ConvChat = ({ conv }) => {
  return (
    <div className="mess-div">
      {conv?.map((items) => (
        <div className="message-divs">
          <div className="message">
            <div className="message__outer">
              {/* <div className="message__avatar"><FaCoffee size={35}/></div> */}
              <div className="message__inner">
                <div className="message__bubble">{items}</div>
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
        </div>
      ))}
    </div>
  );
};

export default ConvChat;
