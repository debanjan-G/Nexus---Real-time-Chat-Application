/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";

const ChatCard = ({ chatName, isSelected, chat }) => {
  const { user, currentChat, setCurrentChat } = ChatState();
  console.log("Chat = ", chat);
  // console.log("Current Chat = ", currentChat);

  const handleChatCardClick = () => {
    setCurrentChat(chat);
  };

  return (
    <div
      onClick={handleChatCardClick}
      className={`py-2 px-4 rounded-md 
    ${
      isSelected ? "bg-green-500 text-white" : "bg-slate-300 text-slate-800"
    } text-left w-full my-4 
    hover:bg-sky-300 hover:cursor-pointer`}
    >
      <h1 className="text-xl font-semibold">{chatName}</h1>
      <p className=" text-sm">
        {chat.latestMessage?.sender === user.id && (
          <span className="font-semibold text-lg">You: </span>
        )}
        {chat._id === currentChat._id
          ? currentChat.latestMessage?.content
          : chat.latestMessage?.content}
      </p>
    </div>
  );
};

export default ChatCard;
