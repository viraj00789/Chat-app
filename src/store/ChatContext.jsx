import { createContext, useContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chat, setChat] = useState(null);
  const [user,setUser] = useState();
  const handleSelectedChat = (user) => {
    setChat(user);
  };

  const handleChat = (adduser) =>
  {
    setUser(adduser)
  }
  return (
    <ChatContext.Provider value={{ chat, handleSelectedChat ,handleChat,user }}>
      {children}
    </ChatContext.Provider>
  );
};
export const useChat = () => useContext(ChatContext);
