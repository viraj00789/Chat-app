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
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

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
  const { isDark, ToggleTheme } = useTheme();
  const [message, setMessage] = useState([]);
  const [dat, setDat] = useState();
  const pickerRef = useRef();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  //Audio Sts
  const { recorderControls } = useAudioRecorder();
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    console.log(url);

    let dates = new Date();
    const time = dates.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const upadatedAudioData = [...message, url, url];
    const upadtedDate = [...dat, time, time];


    const updatedChatAudioData = data.map((user) => {
      if (user.id === chat.id) {
        return { ...user, chatData: upadatedAudioData,chatTime: upadtedDate};
      }
      return user;
    });
    handleData(updatedChatAudioData);
    handleConvData(upadatedAudioData);
    setMessage(upadatedAudioData);
  };

  const handleMouseOver = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setShowEmojiPicker(false);
    }
  };

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
  const onEmojiClick = (e) => {
    setText((prev) => prev + e?.emoji);
  };

  const handleKeyDown = (e) => {
    if (e.shiftKey && e.key === "Enter") {
      setText((prev) => prev);
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitedText(e);
    }
  };

  useEffect(() => {
    handleSelectedChat(chat || data[0]);
    handleConvData(chat?.chatData || data[0]?.chatData);
    setMessage(chat?.chatData || []);
    setDat(chat?.chatTime || []);
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [chat, showEmojiPicker]);

  return (
    <>
      <div className={`cov-header-cont ${isDark ? "active" : "inactive"}`}>
        <div
          className={`cov-header-subcnt-1 ${isDark ? "active" : "inactive"}`}
        >
          <div className="conv-back-arrow" onClick={handleToggle}>
            <IoIosArrowBack size={30} />
          </div>
          <img className="cov-header-img" src={chat?.image} alt="" />
          <div className="cov-header-details">
            <h4 className="cov-header-detail-name">
              {chat?.name.length < 15
                ? chat?.name
                : chat?.name.slice(0, 15) + "..."}
            </h4>
            <div className="cov">
              <div className="green-icon"></div>
              <span className="cov-header-detail-status">Online</span>
            </div>
          </div>
        </div>
        <div className="cov-header-subcnt-2">
          {isDark ? (
            <FiMoon
              className="header-icons"
              size={20}
              onClick={() => ToggleTheme()}
            />
          ) : (
            <MdOutlineWbSunny
              className="header-icons"
              size={20}
              onClick={() => ToggleTheme()}
            />
          )}
        </div>
      </div>
      <ConvChat conv={message} dat={dat} />

      <div className="model-overlay-emoji"></div>
      <div className={`cov-div ${isDark ? "active" : "inactive"}`}>
        {showEmojiPicker && (
          <button className="cov-icons-img" ref={pickerRef}>
            <div className="cov-emoji-picker">
              <EmojiPicker
                onEmojiClick={onEmojiClick}
                searchDisabled="true"
                skinTonesDisabled="true"
                lazyLoadEmojis="false"
                emojiStyle="apple"
                allowExpandReactions="true"
                style={{
                  position: "absolute",
                  width: "300px",
                  height: "300px",
                }}
                handleKeyDown={handleKeyDown}
              />
            </div>
          </button>
        )}
        <form className="input-cov-icon" onSubmit={submitedText}>
          <div className={`input-cov-div ${isDark ? "active" : "inactive"}`}>
            <BsEmojiSmile
              className={`cov-icon-emoji ${isDark ? "active" : "inactive"}`}
              src={Smile}
              onClick={handleMouseOver}
              alt=""
            />
            <textarea
              autoFocus={true}
              rows={1}
              className={`input-cov ${isDark ? "active" : "inactive"}`}
              type="text"
              placeholder="Say Something"
              name="chat"
              value={text}
              onKeyDown={handleKeyDown}
              onChange={handleText}
            />
          </div>
          <button
            type="button"
            title="Hold to record"
            className={`cov-icon ${isDark ? "active" : "inactive"}`}
          >
            <AudioRecorder
              onRecordingComplete={(blob) => addAudioElement(blob)}
              recorderControls={recorderControls}
              showVisualizer={true}
              downloadOnSavePress={false}
              downloadFileExtension={true}
              classes={{
                AudioRecorderStatusClass: `audio-rec ${isDark ? "active" : "inactive"}`,
                AudioRecorderStartSaveClass: "audio-controls",
                AudioRecorderPauseResumeClass: "audio-controls",
                AudioRecorderDiscardClass: "audio-controls",
              }}
            />
          </button>

          <button
            type="submit"
            onClick={submitedText}
            className={`cov-icon ${isDark ? "active" : "inactive"}`}
          >
            <LuSend className="form-send" />
          </button>
        </form>
      </div>
    </>
  );
};

export default ConvHeader;
