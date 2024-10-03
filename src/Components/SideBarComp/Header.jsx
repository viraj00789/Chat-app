import "./Header.sass";
import { useTheme } from "../../store/ThemeContext";
import { useState } from "react";
import { useChat } from "../../store/ChatContext";
import AddModel from "./AddModel";
import Status from "../../assests/Status.svg";
import Search from "../../assests/Search.svg";
import { AiOutlinePushpin } from "react-icons/ai";
import { IoAddOutline, IoClose } from "react-icons/io5";

const Header = () => {
  const { handleSelectedChat, data, handleActive, active, handleToggle } =
    useChat();
  const { isDark } = useTheme();
  const [filter, setFilter] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [filteredChatList, setFilteredChatList] = useState(data);

  const handleNewData = (data) => {
    setFilteredChatList(data);
  };
  const handleModel = (mod) => {
    setIsModelOpen(mod);
  };
  const handleSearch = () => {
    setFilter("");
    setFilteredChatList(data);
  };
  const handleChat = (user) => {
    console.log(user);
    setFilter("");
    handleActive(user?.id);
    handleSelectedChat(user);
    setFilteredChatList(data);
  };
  const handleChange = (e) => {
    let newFilter = e.target.value;
    if (newFilter.trim() === "") {
      setFilter("");
      setFilteredChatList(data);
      return;
    }
    setFilter(newFilter);
    const filteredList = data.filter(
      (item) =>
        item.name.toLowerCase().includes(newFilter.toLowerCase()) ||
        item.email.toLowerCase().includes(newFilter.toLowerCase())
    );
    setFilteredChatList(filteredList);
  };

  return (
    <>
      <div
        className="message-headers-and-btns"
        style={{ backgroundColor: isDark ? "#F5FAFC" : "#0F1C24" }}
      >
        <div className="mess-head">
          <div className="mess-head-img">
            <img
              className="mess-image"
              src="https://randomuser.me/api/portraits/men/3.jpg"
              alt=""
            />
            <img className="mess-status" src={Status} alt="" />
          </div>
          {/* <div className="dropdown">
            <img className="mess-header-down" src={DownArrow} alt="" />
            {
              <div className="dropdown-content">
                <p className="drop-cont-para" onClick={() => handleModel(true)}>
                  Add User
                </p>
                <div className="drop-cont-para" onClick={ToggleTheme}>
                  {isDark ? <p>Darktheme</p> : <p>LightTheme</p>}
                </div>
              </div>
            }
          </div> */}
        </div>

        <div
          className="search-div"
        >
          <div className="search-dis">
            <img className="search-icon" src={Search} alt="" />
            <input
              className="input-search"
              type="text"
              placeholder="Search Message"
              value={filter}
              onChange={handleChange}
            />
          </div>
          {filter && (
            <div className="search-close-icon">
              <IoClose onClick={handleSearch} />
            </div>
          )}
        {filter && (
          <div className="drop">
            {filteredChatList.map((items, index) => (
              <div key={index}>
                <div className="drop-div-2" onClick={() => handleChat(items)}>
                  <div>
                    <img
                      src={
                        items.image ||
                        "https://randomuser.me/api/portraits/men/9.jpg"
                      }
                      alt=""
                      className="user-image"
                    />
                  </div>
                  <div>
                    <h3 className="user-name">{items.name.slice(0, 10)}</h3>
                  </div>
                </div>
              </div>
            ))}
            {filteredChatList.length === 0 && (
              <h4 style={{ textAlign: "center", color: "#428e85" }}>
                No User Found.
              </h4>
            )}
          </div>
        )}
        </div>

        <div className="header-btn">
          <div className="header-sub-1">Friends</div>
          <div className="header-sub-2">Favourites</div>
        </div>
      </div>
      <div
        className="message-header"
        style={{
          backgroundColor: isDark ? "#F5FAFC" : "#0F1C24",
          color: isDark ? "#0F1C24" : "#DFF6F4",
        }}
      >
        <div className="user-chat">
          {filteredChatList.map((items, index) => (
            <div key={index} onClick={() => handleChat(items)}>
              <div
                className="chat-container"
                onClick={handleToggle}
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
                    <h3 className="user-name">{items.name.slice(0, 10)}</h3>
                    <span className="user-message">
                      {items.email.slice(0, 15)}
                    </span>
                  </div>
                </div>
                <div className="chat-div-2">
                  <p className="user-date">{items.date}</p>
                  <AiOutlinePushpin size={20} />
                </div>
              </div>
            </div>
          ))}
          {filteredChatList.length === 0 && (
            <h4 style={{ textAlign: "center", color: "#428e85" }}>
              No User Found.
            </h4>
          )}
        </div>
          <IoAddOutline
            className="add-user-icon"
            onClick={() => handleModel(true)}
          />
        {isModelOpen && (
          <AddModel handleModel={handleModel} handleNewData={handleNewData} />
        )}
      </div>
    </>
  );
};

export default Header;
