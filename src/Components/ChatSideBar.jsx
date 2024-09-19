import React from "react";
import Header from "./SideBarComp/Header";
import "./ChatSideBar.sass";
import Search from "./SideBarComp/Search";
import ChatList from "./SideBarComp/ChatList";
import UserChat from "./ConvChatComp/UserChat";
import ConvHeader from "./ConvChatComp/ConvHeader";
import ConvInput from "./ConvChatComp/ConvInput";

const ChatSideBar = () => {
  return (
    <>
      <div className="chat-divs">
        <div className="sideBar">
          <Header />
          <Search />
          <ChatList />
        </div>
        <div className="sideBar-1">
           <ConvHeader/>
           <UserChat/>
           <ConvInput/>
        </div>
      </div>
    </>
  );
};

export default ChatSideBar;
