import { createContext, useContext, useState } from "react";
import { randomData } from "../Components/data";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chat, setChat] = useState(null);
  const [data, setData] = useState(randomData);
  const [conv,setConv] = useState();
  const [messageData,setMessageData] = useState();
  
  const handleSelectedChat = (user) => {
    setChat(user);
  };
  const handleData = (newData) => {
    setData(newData);
  };
  const handleConvData = (newData) => {
    setConv(newData);
  };
  const handleMessageData = (mesData) => {
    setMessageData(mesData);
  };

  

  return (
    <ChatContext.Provider
      value={{ chat, handleSelectedChat, data, handleData,conv,handleConvData,messageData,handleMessageData }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const useChat = () => useContext(ChatContext);
