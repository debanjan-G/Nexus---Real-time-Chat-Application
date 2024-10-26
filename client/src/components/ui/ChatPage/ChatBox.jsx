import React from "react";
import { ChatState } from "../../context/ChatProvider";

const ChatBox = () => {
  const { currentChat } = ChatState();

  return (
    <div className="bg-white p-4 w-full rounded-md h-full flex items-center justify-center">
      <h1 className=" text-4xl font-light text-slate-700">
        Click on a user to start chatting
      </h1>
    </div>
  );
};

export default ChatBox;
