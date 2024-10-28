import "./Header.sass";
import { useTheme } from "../../store/ThemeContext";
import { useState } from "react";
import { useChat } from "../../store/ChatContext";
import AddModel from "./AddModel";
import Search from "../../assests/Search.svg";
import { MdOutlineStar } from "react-icons/md";
import { IoAddOutline, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BiBullseye } from "react-icons/bi";

const Header = () => {
  const { handleSelectedChat, data, handleActive, active, handleToggle } =
    useChat();
  const { isDark } = useTheme();
  const [filter, setFilter] = useState("");
  const [filteredChatList, setFilteredChatList] = useState(data);
  const [fav, setFav] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [prevFav, setPrevFav] = useState([]);
  const [switchTab, setSwitchTab] = useState(true);
  const [isModelOpen, setIsModelOpen] = useState(false);

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
  const handleFavSearch = () => {
    setFav("");
    setFavourites(prevFav)
  };


  const handleChat = (user) => {
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

  const handleChangeFav = (e) => {
    let newFilter = e.target.value;
    if (newFilter.trim() === "") {
      setFav("");
      setFavourites(prevFav);
      return;
    }
    setFav(newFilter);
    const filteredList = favourites.filter(
      (item) =>
        item.name.toLowerCase().includes(newFilter.toLowerCase()) ||
        item.email.toLowerCase().includes(newFilter.toLowerCase())
    );
    setFavourites(filteredList);
  };

  const handleSwitch = (sw) => {
    setSwitchTab(sw);
  };

  const addFav = (e, chat) => {
    e.stopPropagation();
    if (favourites.some((fav) => fav.id === chat.id)) {
      setFavourites(favourites.filter((fav) => fav.id !== chat.id));
      setPrevFav(favourites.filter((fav) => fav.id !== chat.id));
    } else {
      setFavourites([...favourites, chat]);
      setPrevFav([...favourites, chat]);
    }
  };

  const handlelength = () => {
    return favourites.length;
  };

  return (
    <>
      <div
        className={`message-headers-and-btns ${isDark ? "active" : "inactive"}`}
      >
        <div className="mess-head">
          <div className="mess-head-img">
            <img
              className="mess-image"
              src="https://randomuser.me/api/portraits/men/3.jpg"
              alt=""
            />
            <Link to="/status">
            <BiBullseye title="Status" className="mess-status"/>
            </Link>
          </div>
        </div>

        <div className={`search-div ${isDark ? "active" :"inactive"}`}>
          <div className="search-dis">
            <img className={`search-icon ${isDark ? "active" : "inactive"}`} src={Search} alt="" />
            {switchTab ? (
              <input
                className={`input-search ${isDark ? "active" : "inactive"}`}
                type="text"
                placeholder="Search people"
                value={filter}
                onChange={handleChange}
              />
            ) : (
              <input
                className={`input-search ${isDark ? "active" : "inactive"} `}
                type="text"
                placeholder="Search people"
                value={fav}
                onChange={handleChangeFav}
              />
            )}
          </div>
          
          {switchTab ? (filter && (
            <div className="search-close-icon">
              <IoClose onClick={handleSearch} />
            </div>
          )) :(fav && (
            <div className="search-close-icon">
              <IoClose onClick={handleFavSearch} />
            </div>
          ))  }
        </div>

        <div className="header-btn">
          <div
            className={`header-sub-1 ${switchTab ? "active" : "inactive"}`}
            onClick={() => handleSwitch(true)}
          >
            Friends
          </div>
          <div
            className={`header-sub-2 ${switchTab ? "active" : "inactive"}`}
            onClick={() => handleSwitch(false)}
          >
            Favourites ({handlelength()})
          </div>
        </div>
      </div>

      <div
        className={`message-header ${isDark ? "active" : "inactive"}`}
      >
        <div className="user-chat">
          {switchTab
            ? filteredChatList.map((items, index) => (
                <div
                  className="user-chat-render"
                  key={index}
                  onClick={() => handleChat(items)}
                >
                  <div
                    className="chat-container"
                    style={{
                      backgroundColor: active === items.id ? "#128C7E" : "",
                      color: active === items.id ? "#fff" : "",
                    }}
                    title={items.name}
                  >
                    <div className="chat-div-1" onClick={handleToggle}>
                      <img
                        src={
                          items.image ||
                          "https://randomuser.me/api/portraits/men/9.jpg"
                        }
                        alt=""
                        className="user-image"
                      />
                      <div className="chat-detail">
                        <h3 className="user-name">
                          {items.name.length < 15
                            ? items.name
                            : items.name.slice(0, 15) + "..."}
                        </h3>
                        <span className="user-message">
                          {items.email.slice(0, 15)}
                        </span>
                      </div>
                    </div>
                    <div className="spacer" onClick={handleToggle}></div>
                    <div className="chat-div-2">
                      <p className="user-date" onClick={handleToggle}>
                        {items.date}
                      </p>
                      <MdOutlineStar
                        size={20}
                        className="user-date"
                        onClick={(e) => addFav(e, items)}
                        style={{
                          color: favourites.some((fav) => fav.id === items.id)
                            ? "gold"
                            : "rgb(225 223 223)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            : favourites?.map((items, index) => (
                <div
                  className="user-chat-render"
                  key={index}
                  onClick={() => handleChat(items)}
                >
                  <div
                    className={`chat-container "}`}
                    style={{
                      backgroundColor: active === items.id ? "#128C7E" : "",
                      color: active === items.id ? "#fff" : "",
                    }}
                    title={items.name}
                  >
                    <div className="chat-div-1" onClick={handleToggle}>
                      <img
                        src={
                          items.image ||
                          "https://randomuser.me/api/portraits/men/9.jpg"
                        }
                        alt=""
                        className="user-image"
                      />
                      <div className="chat-detail">
                        <h3 className="user-name">
                          {items.name.length < 15
                            ? items.name
                            : items.name.slice(0, 15) + "..."}
                        </h3>
                        <span className="user-message">
                          {items.email.slice(0, 15)}
                        </span>
                      </div>
                    </div>
                    <div className="spacer" onClick={handleToggle}></div>
                    <div className="chat-div-2">
                      <p className="user-date">{items.date}</p>
                      <MdOutlineStar
                        size={20}
                        className="user-date"
                        onClick={(e) => addFav(e, items)}
                        style={{
                          color: favourites.some((fav) => fav.id === items.id)
                            ? "gold"
                            : "#808080",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          {filteredChatList?.length === 0 && switchTab && (
            <h4 style={{ textAlign: "center", color: "#428e85" }}>
              No User Found.
            </h4>
          )}
          {favourites?.length === 0 && !switchTab && (
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
