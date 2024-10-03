import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../store/ThemeContext";
import { LuSend } from "react-icons/lu";
import { useChat } from "../../store/ChatContext";
import { IoIosArrowBack } from "react-icons/io";
import "./ConvHeader.sass";
import ConvChat from "./ConvChat";
import Smile from "../../assests/Smile.svg";
import { FiMoon } from "react-icons/fi";
import { MdOutlineWbSunny } from "react-icons/md";

const ConvHeader = () => {
  const {
    chat,
    handleData,
    data,
    handleSelectedChat,
    handleConvData,
    active,
    handleToggle,
  } = useChat();
  const [text, setText] = useState("");
  const { isDark,ToggleTheme } = useTheme();
  const [message, setMessage] = useState([]);
  const [dat, setDat] = useState();
  const textareaRef = useRef(null);

  handleSelectedChat(chat || data[0]);
  handleConvData(chat?.chatData || data[0]?.chatData);

  const handleText = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const submitedText = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    if (active === chat?.id) {
      let dates = new Date();
      const time = dates.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      const updatedMessage = [...message, text, text];
      const upadtedDate = [...dat, time, time];

      const updatedChatData = data.map((user) => {
        if (user.id === chat.id) {
          return { ...user, chatData: updatedMessage, chatTime: upadtedDate };
        }
        return user;
      });
      handleData(updatedChatData);
      handleConvData(updatedMessage);
      setMessage(updatedMessage);
      setDat(upadtedDate);
    }
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.shiftKey && e.key === "Enter") {
      setText((prev) => prev);
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitedText(e);
    }
  };

  function focusTextarea() {
    textareaRef.current.focus();
  }

  useEffect(() => {
    setMessage(chat?.chatData || []);
    setDat(chat?.chatTime || []);
    focusTextarea();
  }, [chat]);

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
          <div className="conv-back-arrow" onClick={handleToggle}>
            <IoIosArrowBack size={30} />
          </div>
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

        {isDark ? <FiMoon className="header-icons" size={20} onClick={() => ToggleTheme()} />:
          <MdOutlineWbSunny className="header-icons" size={20} onClick={() => ToggleTheme()} />}
          {/* <img src={SearchHeader} className="header-icons" alt="" /> */}
          {/* <img src={DropDownHeader} className="header-icons" alt="" /> */}
        </div>
      </div>
      <ConvChat conv={message} dat={dat} />

      <div
        className="cov-div"
        style={{ backgroundColor: isDark ? "#ede9e9" : "#0F1C24" }}
      >
        <img className="cov-icons-img" src={Smile} alt="" />
        <form className="input-cov-icon" onSubmit={submitedText}>
          <textarea
            autoFocus
            ref={textareaRef}
            rows={1}
            className="input-cov"
            type="text"
            placeholder="Say Something"
            name="chat"
            value={text}
            onKeyDown={handleKeyDown}
            onChange={handleText}
          />
          <button
            type="submit"
            onClick={submitedText}
            className="cov-icon"
            style={{ backgroundColor: isDark ? "#ede9e9" : "#0F1C24" }}
          >
            <LuSend className="form-send" color="rgb(18, 140, 126)" />
          </button>
        </form>
      </div>
    </>
  );
};

export default ConvHeader;
