import { createContext, useContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chat, setChat] = useState(null);
  const handleSelectedChat = (user) => {
    setChat(user);
  };

  return (
    <ChatContext.Provider value={{ chat, handleSelectedChat }}>
      {children}
    </ChatContext.Provider>
  );
};
export const useChat = () => useContext(ChatContext);
