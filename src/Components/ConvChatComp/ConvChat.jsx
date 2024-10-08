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
                      flexDirection:items.length > 300 ? "column" :"row"
                    }}
                    
                  >

                    <div className="message__actions">
                      {readmore[index] ? items : items.slice(0, 300)}
                      {items.length > 300 && (
                        <p
                          onClick={() => toggleReadMore(index)}
                          className="read-or-hide"
                          style={{ color: "green",padding:"0px",margin:"0px"}}
                        >
                          {readmore[index] ? "show less" : " read more"}
                        </p>
                      )}
                    </div>
                    <div className="message_time">
                      <span>{dat[index]}</span>
                    </div>
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
