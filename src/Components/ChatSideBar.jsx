import React, { useEffect } from "react";
import Header from "./SideBarComp/Header";
import "./ChatSideBar.sass";
import ConvHeader from "./ConvChatComp/ConvHeader";
import { useTheme } from "../store/ThemeContext";

const ChatSideBar = () => {
  const { isDark } = useTheme();
  useEffect(() => 
  {
    document.body.style.background = isDark ? "#F5FAFC" : "#000"
  },[isDark])
  return (
    <>
      <div className="chat-divs">
        <div
          className="sideBar"
          style={{
            backgroundColor: isDark ? "#F5FAFC" : "#000",
            color: isDark ? "#000" : "#F5FAFC",
          }}>
          <Header />
        </div>
        <div
          className="sideBar-1"
          style={{
            backgroundColor: isDark ? "#F5FAFC" : "#000",
            color: isDark ? "#000" : "#F5FAFC",
          }}
        >
          <ConvHeader />
        </div>
      </div>
    </>
  );
};

export default ChatSideBar;
