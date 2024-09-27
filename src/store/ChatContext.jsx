import { createContext, useContext, useState } from "react";
import { randomData } from "../Components/data";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chat, setChat] = useState(null);
  const [data, setData] = useState(randomData);
  const [conv,setConv] = useState();
  const [active,setActive] = useState(data[0]?.id);

  
  const handleSelectedChat = (user) => {
    setChat(user);
  };
  const handleData = (newData) => {
    setData(newData);
  };
  const handleConvData = (newData) => {
    setConv(newData);
  };
 
  const handleActive = (id) => 
  {
    setActive(id)
  }

  

  return (
    <ChatContext.Provider
      value={{ chat, handleSelectedChat, data, handleData,conv,handleConvData,active,handleActive }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const useChat = () => useContext(ChatContext);
