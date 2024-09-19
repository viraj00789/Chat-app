import { MdAddCircle } from "react-icons/md";
import "./Header.sass";
import { useTheme } from "../../store/ThemeContext";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { randomData } from "../data";
import { useChat } from "../../store/ChatContext";
import AddModel from "./AddModel";

const Header = () => {
  let data;
  const { isDark, ToggleTheme } = useTheme();
  const [filter, setFilter] = useState("");
  const [chatList,setChatList] = useState(randomData);
  const { handleSelectedChat } = useChat();

  const handleChange = (e) => {
    let newFilter = e.target.value;
    setFilter(newFilter);
    setChatList(randomData.filter((item) =>item.name.toLowerCase().includes(newFilter.toLowerCase())))
    console.log(data);
  };

  const handleChat = (user) => {
    handleSelectedChat(user);
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
          <MdAddCircle size={30} color="#9568dd" />
          <AddModel/>
        </div>
        <button className="message-toggle" onClick={ToggleTheme}>
          {isDark ? "Dark" : "Light"}
        </button>
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
      <div className="divider"></div>
      <div className="user-chat">
        {chatList.map((items, index) => (
          <div key={index} onClick={() => handleChat(items)}>
            <div className="chat-container">
              <div className="chat-div-1">
                <img src={`${items.image}`} alt="" className="user-image" />
                <div className="chat-detail">
                  <h3 className="user-name">{`${items.name.slice(0, 6)}`}</h3>
                  <span className="user-message">{`${items.chat.slice(
                    0,
                    15
                  )}...`}</span>
                </div>
              </div>
              <div className="chat-div-2">
                <span className="user-date">{`${items.date}`}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Header;
