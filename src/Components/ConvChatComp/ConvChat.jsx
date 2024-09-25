import React, { useEffect, useRef } from "react";
import "./ConvHeader.sass";
const ConvChat = ({ conv }) => {
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current?.lastElementChild?.scrollIntoView();
  }, [conv]);

  return (
    <>
      <div
        className="mess-div"
        ref={messageRef}
      >
        {conv?.map((items, index) => (
          <div className="message-divs">
            <div className="message">
              <div className="message__inner" style={{flexDirection : index % 2 === 0 ?"row-reverse" : "row"}}>
                <div className="message__bubble">{items}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ConvChat;
