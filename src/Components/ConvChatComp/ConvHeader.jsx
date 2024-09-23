import React, { useState } from "react";
import "./ConvHeader.sass";
import { IoCall } from "react-icons/io5";
import { useTheme } from "../../store/ThemeContext";
import { MdOutlineFilePresent } from "react-icons/md";
import { BsSendFill } from "react-icons/bs";
import { useChat } from "../../store/ChatContext";
import ConvChat from "./ConvChat";

const ConvHeader = () => {
  const { chat, data, handleSelectedChat, conv, handleConvData } = useChat();
  const [text, setText] = useState("");
  const { isDark } = useTheme();

  if (chat) {
    handleSelectedChat(chat);
    handleConvData(chat?.chatData);
  } else {
    handleSelectedChat(data[0]);
    handleConvData(chat?.chatData);
  }
  console.log(conv);

  const mesData = chat?.chatData;
  const [message, setMessage] = useState();

  const handleText = (e) => {
    const { value } = e.target;
    setText(value);
    console.log(text);
  };
  const submitedText = (e) => {
    e.preventDefault();
    const updatedMessage = [...conv,text];
    setMessage(updatedMessage);
    handleConvData(handleConvData);
  };

  console.log(mesData, message);
  return (
    <>
      <div
        className="cov-header-cont"
        style={{ backgroundColor: isDark ? "#fff" : "#000" }}
      >
        <div
          className="cov-header-subcnt-1"
          style={{ color: isDark ? "#000" : "#fff" }}
        >
          <img className="cov-header-img" src={chat?.image} alt="" />
          <div className="cov-header-details">
            <p className="cov-header-detail-name">{chat?.name}</p>
            <span className="cov-header-detail-status">Online</span>
          </div>
        </div>
        <div className="cov-header-subcnt-2">
          <IoCall size={20} />
        </div>
      </div>

      <ConvChat conv = {conv}/>

      <div className="cov-div">
        <MdOutlineFilePresent
          className="cov-icon-1"
          color="#9568dd"
          size={28}
        />
        {/* <div > */}
        <form className="input-cov-icon" onSubmit={submitedText}>
          <input
            className="input-cov"
            type="text"
            placeholder="Enter Message"
            name="chat"
            value={text}
            onChange={handleText}
          />
          <BsSendFill
            type="submit"
            className="cov-icon"
            color="#9568dd"
            size={20}
          />
        </form>
        {/* </div> */}
      </div>
    </>
  );
};

export default ConvHeader;
