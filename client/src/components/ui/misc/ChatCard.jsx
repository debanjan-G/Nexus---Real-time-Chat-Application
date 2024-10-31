/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";

const ChatCard = ({ chatName, isSelected, chat }) => {
  console.log("chat = ", chat);

  const [senderName, setSenderName] = useState("");
  const { user, currentChat, setCurrentChat } = ChatState();

  const handleChatCardClick = () => {
    setCurrentChat(chat);
  };

  const getSenderInfo = async (senderID) => {
    if (!senderID) return; // handle case where senderID is undefined
    console.log("RECEIVED SENDER ID: ", senderID);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/${senderID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);

      setSenderName(response.data.user.username);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  useEffect(() => {
    console.log("Inside useEffect");

    if (
      chat.isGroupChat &&
      chat.latestMessage?.sender &&
      chat.latestMessage.sender !== user.id
    ) {
      getSenderInfo(chat.latestMessage.sender);
    }
  }, [chat.latestMessage?.sender]); // Dependency array includes the sender ID

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

      <p className="text-sm">
        {chat.latestMessage?.sender === user.id ? (
          <span className="font-semibold">You: </span>
        ) : (
          chat.isGroupChat && (
            <span className="font-semibold">{senderName}: </span>
          )
        )}
        {chat._id === currentChat._id
          ? currentChat.latestMessage?.content
          : chat.latestMessage?.content}
      </p>
    </div>
  );
};

export default ChatCard;
