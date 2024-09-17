import React from "react";
import Header from "./SideBarComp/Header";
import "./ChatSideBar.sass";
import Search from "./SideBarComp/Search";
import ChatList from "./SideBarComp/ChatList";

const ChatSideBar = () => {
  return (
    <>
      <div className="chat-divs">
        <div className="sideBar">
          <Header />
          <Search />
          <ChatList />
        </div>
        <div>Hello</div>
      </div>
    </>
  );
};

export default ChatSideBar;
