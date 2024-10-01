  import React, { useEffect, useRef, useState } from "react";
  import "./ConvHeader.sass";
    const ConvChat = ({ conv, dat }) => {
    const [readmore, setReadMore] = useState(
      {}
    );
    const messageRef = useRef(null);

    useEffect(() => {
      messageRef.current?.lastElementChild?.scrollIntoView();
    }, [conv]);

    const toggleReadMore = (index) => {
      setReadMore((prevStates) => ({
        ...prevStates,
        [index] : !prevStates[index]
      }));
    };

    
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
                    <div className="message__actions">
                      {readmore[index] ? items : items.slice(0, 300)}
                      {items.length > 300 && (
                        <span
                          onClick={() => toggleReadMore(index)}
                          className="read-or-hide"
                          style={{ color: "green" }}
                        >
                          {readmore[index] ? "show less" : " read more"}
                        </span>
                      )}
                    </div>
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
