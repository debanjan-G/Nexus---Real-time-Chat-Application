import React, { useState, useEffect } from "react";
import { ChatState } from "./context/ChatProvider";
import ChatPageHeader from "./ui/ChatPage/ChatPageHeader";
import ChatSidebar from "./ui/ChatPage/ChatSidebar";
import ChatBox from "./ui/ChatPage/ChatBox";
import MyChats from "./ui/ChatPage/MyChats";
import toast, { Toaster } from "react-hot-toast";

const Chats = () => {
  const { user, setUser } = ChatState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const showLoginSuccess = localStorage.getItem("showLoginSuccess");

    if (showLoginSuccess) {
      toast.success("Login Successful✅");
      localStorage.removeItem("showLoginSuccess");
    }
  }, []);

  return (
    <div className="bg-[url(chat-app-bg.jpg)] h-screen">
      <Toaster />
      <ChatPageHeader user={user} setOpen={setOpen} />
      <ChatSidebar open={open} setOpen={setOpen} />
      <div className="flex h-[85vh] gap-4 justify-between p-4 w-full">
        <MyChats user={user} />
        <ChatBox />
      </div>
    </div>
  );
};

export default Chats;
