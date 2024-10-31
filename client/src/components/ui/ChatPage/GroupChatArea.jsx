/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Spinner from "../Spinner"; // Assuming you have a Spinner component
import ScrollableFeed from "react-scrollable-feed"; // Scrollable feed for messages
import { ChatState } from "../../context/ChatProvider"; // Context for chat state
import { IoSend } from "react-icons/io5";
import Tooltip from "../Tooltip";

const GroupChatArea = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, currentChat, setCurrentChat, setChats } = ChatState();

  // console.log("GroupChat component");
  console.log("Current Chat  = ", currentChat);

  // Initialize socket.io client
  const socket = useMemo(() => io("http://localhost:8080"), []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WS server.");
    });

    // Remove any existing listener before adding a new one
    socket.removeAllListeners("new-message");
    socket.on("new-message", (msg) => {
      setMessages((prev) => {
        if (prev.some((m) => m._id === msg._id)) return prev; // Skip if duplicate
        return [...prev, msg];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    fetchMessages();
    socket.emit("join-room", currentChat._id);
  }, [currentChat]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/message/${currentChat._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMessageSend = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/message`,
        {
          message: newMessage,
          chatID: currentChat._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // we are updating only the latestMessage field of the currentChat
      const updatedChat = {
        ...currentChat,
        latestMessage: response.data.populatedMessage,
      };
      setCurrentChat(updatedChat);

      // Update the chats array to set the latest message for the specific chat
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat._id === currentChat._id ? updatedChat : chat
        )
      );

      const newMessageDoc = response.data.populatedMessage;
      setMessages((prev) => [...prev, newMessageDoc]);
      socket.emit("send-message", newMessageDoc);
      setNewMessage(""); // Clear input after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-300">
      <div className="flex-1 overflow-y-auto flex flex-col-reverse p-2">
        <ScrollableFeed>
          {messages &&
            messages.map((msg) => {
              const isLoggedInUserTheSender = msg.sender._id === user.id;
              return (
                <div
                  key={msg._id}
                  className={`flex mb-2 ${
                    isLoggedInUserTheSender ? "justify-end" : ""
                  }`}
                >
                  {!isLoggedInUserTheSender && (
                    <Tooltip message={msg.sender.username}>
                      <img
                        className="object-cover rounded-full h-10 w-10 cursor-pointer mr-2"
                        src={msg.sender.avatar}
                        alt="avatar"
                      />
                    </Tooltip>
                  )}

                  <div
                    className={`max-w-[70%] flex items-center p-2 rounded-md ${
                      msg.sender._id === user.id
                        ? "bg-pink-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    <span>{msg.content}</span>
                  </div>
                </div>
              );
            })}
        </ScrollableFeed>
      </div>
      {loading && <Spinner />}
      <form
        onSubmit={handleMessageSend}
        className="p-2 flex gap-2 items-center"
      >
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 rounded-md"
          type="text"
          placeholder="Enter a message"
          required
        />
        <button type="submit">
          <IoSend className="text-2xl hover:cursor-pointer hover:text-blue-800 duration-200" />
        </button>
      </form>
    </div>
  );
};

export default GroupChatArea;
