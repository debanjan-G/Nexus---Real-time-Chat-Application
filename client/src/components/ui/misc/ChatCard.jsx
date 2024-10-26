/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";

const ChatCard = ({ chatName, latestMessage, isSelected, fetchChat, chat }) => {
  console.log("CHATNAME = ", chatName);

  return (
    <div
      onClick={() => fetchChat(chatName, chat)}
      className={`py-2 px-4 rounded-md 
    ${
      isSelected ? "bg-green-500 text-white" : "bg-slate-300 text-slate-800"
    } text-left w-full my-4 
    hover:bg-sky-300 hover:cursor-pointer`}
    >
      <h1 className="text-xl font-semibold">{chatName}</h1>
      <p className=" text-sm">{latestMessage}</p>
    </div>
  );
};

export default ChatCard;
