import React, { useEffect, useRef, useState } from "react";
import "./ConvHeader.sass";
import "./ConvChat.sass";
import { useTheme } from "../../store/ThemeContext";
import WaveFormSurfer from "../CommonComp/WaveFromSurfer";

const ConvChat = ({ conv, dat }) => {
  const [readmore, setReadMore] = useState({});
  const [currentAudioIndex, setCurrentAudioIndex] = useState(null);
  const messageRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    messageRef.current?.lastElementChild?.scrollIntoView();
  }, [conv]);

  const toggleReadMore = (index) => {
    setReadMore((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }));
  };

  const handleAudioEnd = (index) => {
    console.log(index, currentAudioIndex);
    const nextIndex = index + 1;
    if (nextIndex < conv.length && conv[nextIndex].startsWith("blob")) {
      setCurrentAudioIndex(nextIndex);
    } else {
      setCurrentAudioIndex(null);
    }
  };

  const AudioOrText = (items, index) => {
    const isAudio = items.startsWith("blob");

    if (!isAudio) {
      return (
        <div
          className="message__bubble"
          style={{
            backgroundColor: isDark
              ? index % 2 === 0
                ? "#D7F8F4"
                : "#fff"
              : index % 2 === 0
              ? "#005C4B"
              : "#202C33",
            color: isDark ? "#000" : "#fff",
            flexDirection: items.length > 300 ? "column" : "row",
          }}
        >
          <div className="message__actions">
            {readmore[index] ? items : items.slice(0, 300)}
            {items.length > 300 && (
              <p onClick={() => toggleReadMore(index)} className="read-or-hide">
                {readmore[index] ? "show less" : " read more"}
              </p>
            )}
          </div>
          <span
            className="message_time"
            style={{ color: isDark ? "#000" : "#fff" }}
          >
            {dat[index]}
          </span>
        </div>
      );
    } else {
      return (
        <div
          style={{
            backgroundColor: isDark
              ? index % 2 === 0
                ? "#D7F8F4"
                : "#fff"
              : index % 2 === 0
              ? "#005C4B"
              : "#202C33",
            color: isDark ? "#000" : "#fff",
            borderRadius:"10px"
          }}
        >
          <WaveFormSurfer
            audio={items}
            times={dat[index]}
            index={index}
            autoPlay={index === currentAudioIndex}
            onAudioEnd={() => handleAudioEnd(index)}
          />
        </div>
      );
    }
  };

  return (
    <div
      className={`mess-div ${isDark ? "active" : "inactive"}`}
      ref={messageRef}
    >
      {conv?.map((items, index) => (
        <div className="message-divs" key={index}>
          <div className="message">
            <div
              className="message__inner"
              style={{
                flexDirection: index % 2 === 0 ? "row-reverse" : "row",
              }}
            >
              {AudioOrText(items, index)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConvChat;
