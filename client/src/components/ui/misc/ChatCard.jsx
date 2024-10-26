/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";

const ChatCard = ({
  otherUser,
  latestMessage,
  isSelected,
  fetchChat,
  chat,
}) => {
  return (
    <div
      onClick={() => fetchChat(otherUser, chat)}
      className={`py-2 px-4 rounded-md 
    ${
      isSelected ? "bg-green-500 text-white" : "bg-slate-300 text-slate-800"
    } text-left w-full my-4 
    hover:bg-sky-300 hover:cursor-pointer`}
    >
      <h1 className="text-xl font-semibold">{otherUser.username}</h1>
      <p className=" text-sm">
        <span className="font-semibold">
          {/* {latestMessage.sender} */}
          {/* GuestUser 2 */}
        </span>
        {/* {latestMessage.content} */}
        {/* Sample Content */}
        {latestMessage}
      </p>
    </div>
  );
};

export default ChatCard;
