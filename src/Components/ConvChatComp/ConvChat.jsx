import React, { useEffect, useRef } from "react";
import "./ConvHeader.sass";
import { useChat } from "../../store/ChatContext";
const ConvChat = ({ conv ,dat}) => {
  const {data} = useChat();
  const messageRef = useRef(null);
  console.log(data,conv);
 

  useEffect(() => {
    messageRef.current?.lastElementChild?.scrollIntoView();
  }, [conv]);


  const handleChange = (items) => 
  {
     if(items.length > 200) return `${items.slice(0,200)}...`;
     return items
  }

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
                  <div className="message__actions">{handleChange(items)}</div>
                  <div className="message_time">{dat[index]}</div>
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
