import React, { useEffect, useState } from "react";
import "./ConvHeader.sass";
import { useTheme } from "../../store/ThemeContext";
import { LuSend } from "react-icons/lu";
import { useChat } from "../../store/ChatContext";
import ConvChat from "./ConvChat";
import CallHeader from "../../assests/CallHeader.svg";
import VideoCaLL from "../../assests/VideoCall.svg";
import SearchHeader from "../../assests/SearchHeader.svg";
import DropDownHeader from "../../assests/DropDownHeader.svg";
import Smile from "../../assests/Smile.svg";
import Plus from "../../assests/Plus.svg";

const ConvHeader = () => {
  const { chat, conv, data, handleSelectedChat, handleConvData, active } =
    useChat();
  const [text, setText] = useState("");
  const { isDark } = useTheme();

  if (chat) {
    handleSelectedChat(chat);
    handleConvData(chat?.chatData);
  } else {
    handleSelectedChat(data[0]);
    handleConvData(data[0]?.chatData);
  }
  const [message, setMessage] = useState([]);

  const handleText = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const submitedText = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    if (active === chat?.id) {
      let textItem = text;
      const updatedMessage = [...message, text, textItem];
      conv.push(text);
      handleConvData(updatedMessage);
      setMessage(updatedMessage);
    }
    setText("");
  };

  useEffect(() => {
    setMessage(chat?.chatData);
  }, [chat?.chatData]);

  return (
    <>
      <div
        className="cov-header-cont"
        style={{
          backgroundColor: isDark ? "#F7F7FC" : "#0F1C24",
          color: isDark ? "#0F1C24" : "#DFF6F4",
        }}
      >
        <div
          className="cov-header-subcnt-1"
          style={{ color: isDark ? "#000" : "#F7F7FC" }}
        >
          <img className="cov-header-img" src={chat?.image} alt="" />
          <div className="cov-header-details">
            <h4 className="cov-header-detail-name">{chat?.name}</h4>
            <div className="cov">
            <div className="green-icon"></div>
            <span className="cov-header-detail-status">Online</span>
            </div>
          </div>
        </div>
        <div className="cov-header-subcnt-2">
          <img src={CallHeader} className="header-icons" alt="" />
          <img src={VideoCaLL} className="header-icons" alt="" />
          <img src={SearchHeader} className="header-icons" alt="" />
          <img src={DropDownHeader} className="header-icons" alt="" />
        </div>
      </div>
      <ConvChat conv={message} />

      <div
        className="cov-div"
        style={{ backgroundColor: isDark ? "#ede9e9" : "#0F1C24" }}
      >
        <div className="cov-icons">
          <img className="cov-icons-img" src={Smile} alt="" />
          <img className="cov-icons-img" src={Plus} alt="" />
        </div>
        <form className="input-cov-icon" onSubmit={submitedText}>
          <input
            className="input-cov"
            type="text"
            placeholder="Say Something"
            name="chat"
            value={text}
            onChange={handleText}
          />
          
          <button type="submit" className="cov-icon" style={{ backgroundColor: isDark ? "#ede9e9" : "#0F1C24" }}>
          <LuSend className="form-send" color="rgb(18, 140, 126)" />
          </button>
        </form>
      </div>
    </>
  );
};

export default ConvHeader;
