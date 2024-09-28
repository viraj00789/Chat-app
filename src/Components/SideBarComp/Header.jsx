import "./Header.sass";
import { useTheme } from "../../store/ThemeContext";
import { useState } from "react";
import { useChat } from "../../store/ChatContext";
import AddModel from "./AddModel";
import DownArrow from "../../assests/DownArrow.svg";
import Status from "../../assests/Status.svg";
import Search from "../../assests/Search.svg";
import { AiOutlinePushpin } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";

const Header = () => {
  const { isDark, ToggleTheme } = useTheme();
  const [filter, setFilter] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const { handleSelectedChat, data, handleActive, active } = useChat();
  const [filteredChatList, setFilteredChatList] = useState(data);

  const handleNewData = (data) => {
    setFilteredChatList(data);
  };

  const handleModel = (mod) => {
    setIsModelOpen(mod);
  };

  const handleChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    const filteredList = data.filter((item) =>
      item.name.toLowerCase().includes(newFilter.toLowerCase())
    );
    setFilteredChatList(filteredList);
  };

  const handleChat = (user) => {
    console.log(user);
    handleActive(user?.id);
    handleSelectedChat(user);
  };

  return (
    <>
   
      <div
        className="message-header"
        style={{
          backgroundColor: isDark ? "#F5FAFC" : "#0F1C24",
          color: isDark ? "#0F1C24" : "#DFF6F4",
        }}
      >
        <div
          className="message-headers-and-btns"
          style={{ backgroundColor: isDark ? "#F5FAFC" : "#0F1C24" }}
        >
          <div className="mess-head">
            <img
              className="mess-image"
              src="https://randomuser.me/api/portraits/men/3.jpg"
              alt=""
            />
            <img className="mess-status" src={Status} alt="" />
          </div>
          <div className="dropdown">
            <img className="mess-header-down" src={DownArrow} alt="" />
            {
              <div className="dropdown-content">
                <p onClick={() => handleModel(true)}>Add User</p>
                <div className="" onClick={ToggleTheme}>
                  {isDark ? <p>Darktheme</p> : <p>LightTheme</p>}
                </div>
              </div>
            }
          </div>

          <div className="search-div">
            <img className="search-icon" src={Search} alt="" />
            <input
              className="input-search"
              type="text"
              placeholder="Search Message"
              value={filter}
              onChange={handleChange}
            />
          </div>
          <div className="header-btn">
            <div className="header-sub-1">Favourites</div>
            <div className="header-sub-2">Friends</div>
            <div className="header-sub-2">Groups</div>
          </div>
        </div>

        <div className="user-chat">
          {filteredChatList.map((items, index) => (
            <div key={index} onClick={() => handleChat(items)}>
              <div
                className="chat-container"
                style={{
                  backgroundColor: active === items.id ? "#128C7E" : "",
                  color: active === items.id ? "#fff" : "",
                }}
              >
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
                      {items.email.slice(0, 15)}
                    </span>
                  </div>
                </div>
                <div className="chat-div-2">
                  <p className="user-date">{items.date}</p>
                  <AiOutlinePushpin size={25} />
                </div>
              </div>
            </div>
          ))}
        </div>
        {isModelOpen && (
          <AddModel handleModel={handleModel} handleNewData={handleNewData} />
        )}
      </div>
      <div className="addMessage">
    <BiMessageDetail size={24} color="white"/>

    </div>
    </>
  );
};

export default Header;
