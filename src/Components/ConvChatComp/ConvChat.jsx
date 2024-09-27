import React, { useEffect, useRef } from "react";
import "./ConvHeader.sass";
const ConvChat = ({ conv }) => {
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current?.lastElementChild?.scrollIntoView();
  }, [conv]);

  return (
    <>
      <div className="mess-div" ref={messageRef}>
        {conv?.map((items, index) => (
          <div className="message-divs" key={index}>
            <div className="message">
              <div
                className="message__inner"
                style={{
                  flexDirection: index % 2 === 0 ? "row-reverse" : "row",
                }}
              >
                <div
                  className="message__bubble"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#D7F8F4" : "#fff",
                  }}
                >
                  <div>{items}</div>
                  <div className="message_time">10:00</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ConvChat;
