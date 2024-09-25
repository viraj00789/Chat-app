import React, { useEffect } from "react";
import Header from "./SideBarComp/Header";
import "./ChatSideBar.sass";
import ConvHeader from "./ConvChatComp/ConvHeader";
import { useTheme } from "../store/ThemeContext";

const ChatSideBar = () => {
  const { isDark } = useTheme();
  useEffect(() => 
  {
    document.body.style.background = isDark ? "#fff" : "#000"
  },[isDark])
  return (
    <>
      <div className="chat-divs">
        <div
          className="sideBar"
          style={{
            backgroundColor: isDark ? "#fff" : "#000",
            color: isDark ? "#000" : "#fff",
          }}        >
          <Header />
        </div>
        <div
          className="sideBar-1"
          style={{
            backgroundColor: isDark ? "#fff" : "#000",
            color: isDark ? "#000" : "#fff",
            borderLeft: `1px solid ${isDark ? "#000" : "#f3f3f3"}`,
          }}
        >
          <ConvHeader />
        </div>
      </div>
    </>
  );
};

export default ChatSideBar;
