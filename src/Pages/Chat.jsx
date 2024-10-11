import React, { useEffect } from "react";
import Header from "../Components/SideBarComp/Header";
import "./Chat.sass";
import ConvHeader from "../Components/ConvChatComp/ConvHeader";
import { useTheme } from "../store/ThemeContext";
import { useChat } from "../store/ChatContext";

const ChatSideBar = () => {
  const { isDark } = useTheme();
  const { toggle } = useChat();

  useEffect(() => {
    document.body.style.background = isDark ? "#F5FAFC" : "#0F1C24";
  }, [isDark]);

  return (
    <>
      <div className="chat-divs">
        <div
          className={`sideBar ${toggle ? `open` : `closed`} ${
            isDark ? "active" : "inactive"
          }`}
        >
          <Header />
        </div>
        <div
          className={`sideBar-1 ${toggle ? `open` : `closed`} ${
            isDark ? "active" : "inactive"
          }`}
        >
          <ConvHeader />
        </div>
      </div>
    </>
  );
};

export default ChatSideBar;
