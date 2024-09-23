import { MdAddCircle } from "react-icons/md";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";

import "./Header.sass";
import { useTheme } from "../../store/ThemeContext";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useChat } from "../../store/ChatContext";
import AddModel from "./AddModel";

const Header = () => {
  const { isDark, ToggleTheme } = useTheme();
  const [filter, setFilter] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const { handleSelectedChat,data} = useChat();
  const [filteredChatList, setFilteredChatList] = useState(data);



  const handleNewData = (data) =>   {
     setFilteredChatList(data);
  } 

  const handleChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    const filteredList = data.filter((item) =>
      item.name.toLowerCase().includes(newFilter.toLowerCase())
    );
    setFilteredChatList(filteredList);
  };

  const handleChat = (user) => {    
    handleSelectedChat(user);
  };

  const handleModel = (mod) => {
    setIsModelOpen(mod);
  };

  return (
    <>
      <div
        className="message-header"
        style={{ backgroundColor: isDark ? "#fff" : "#000" }}
      >
        <h1
          className="message-heading"
          style={{ color: isDark ? "#000" : "#fff" }}
        >
          Messages
        </h1>
        <div>
          {" "}
          <MdAddCircle
            size={30}
            color="#9568dd"
            onClick={() => handleModel(true)}
          />
        </div>
        <div className="message-toggle" onClick={ToggleTheme}>
          {isDark ? <FaMoon size={20} color="#8d21a6"/>  : <FaSun size={20} color="#8d21a6"/>}
        </div>
      </div>
      <div className="search-div">
        <FaSearch className="search-icon" size={50} />
        <input
          className="input-search"
          type="text"
          placeholder="Search Message"
          value={filter}
          onChange={handleChange}
        />
      </div>

      <div className="user-chat">
        {filteredChatList.map((items, index) => (
          <div key={index} onClick={() => handleChat(items)}>
            <div className="chat-container">
              <div className="chat-div-1">
                <img
                  src={
                    items.image ||
                    "https://randomuser.me/api/portraits/men/9.jpg"
                  }
                  alt=""
                  className="user-image"
                />
                <div className="chat-detail">
                  <h3 className="user-name">{items.name.slice(0, 6)}</h3>
                  <span className="user-message">
                    {items.chat.slice(0, 15)}...
                  </span>
                </div>
              </div>
              <div className="chat-div-2">
                <span className="user-date">{items.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModelOpen && (
        <AddModel handleModel={handleModel} handleNewData={handleNewData}/>
      )}
    </>
  );
};

export default Header;
