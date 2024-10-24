import React from "react";
import { ChatState } from "./context/ChatProvider";
import ChatPageHeader from "./ui/ChatPage/ChatPageHeader";
import ChatSidebar from "./ui/ChatPage/ChatSidebar";
import ChatBox from "./ui/ChatPage/ChatBox";
import MyChats from "./ui/ChatPage/MyChats";

const Chats = () => {
  const { user, setUser } = ChatState();

  console.log(user);

  return (
    <div className="bg-[url(chat-app-bg.jpg)] h-screen">
      <ChatPageHeader user={user} />
      <ChatSidebar />
      <div className="flex justify-between p-4 w-full">
        <MyChats />
        <ChatBox />
      </div>
    </div>
  );
};

export default Chats;
