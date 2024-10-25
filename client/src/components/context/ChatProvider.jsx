import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, redirect } from "react-router-dom";

const chatContext = createContext(); // this will hold the data that we wanna share

// ChatProvider is a wrapper component that wraps its children within the ContextProvider component so that every children can access the context.
const ChatProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    console.log("userInfo = ", userInfo);

    if (!userInfo) {
      navigate("/");
    } else {
      setUser(userInfo);
    }
  }, [navigate]);

  return (
    <chatContext.Provider value={{ user, setUser }}>
      {children}
    </chatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(chatContext);
};

export default ChatProvider;
