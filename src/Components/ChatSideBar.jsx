import React, { useEffect } from "react";
import Header from "./SideBarComp/Header";
import "./ChatSideBar.sass";
import ConvHeader from "./ConvChatComp/ConvHeader";
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
          className={`sideBar ${toggle ? `open` : `closed`}`} 
          style={{
            backgroundColor: isDark ? "#F5FAFC" : "#0F1C24",
            color: isDark ? "#0F1C24" : "#F5FAFC",
              }}
        >
          <Header />
        </div>
        <div
          className={`sideBar-1 ${toggle ? `open` : `closed`}`}
          style={{
            backgroundColor: isDark ? "#F5FAFC" : "#0F1C24",
            color: isDark ? "#0F1C24" : "#F5FAFC",
          }}
        >
          <ConvHeader />
        </div>
      </div>
    </>
  );
};

export default ChatSideBar;
