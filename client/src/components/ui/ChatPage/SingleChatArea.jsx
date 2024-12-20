/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from "react";
import Spinner from "../Spinner";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import toast from "react-hot-toast";
import ScrollableFeed from "react-scrollable-feed";
import Tooltip from "../Tooltip";
import { io } from "socket.io-client";
import TypingIndicator from "../misc/TypingIndicator";

const SingleChatArea = ({ otherUser }) => {
  //states
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [timeoutID, setTimeoutID] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  // context
  const { setChats, currentChat, setCurrentChat } = ChatState();

  //socket.io-client config
  const socket = useMemo(() => io("http://localhost:8080"), []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WS server.");
    });

    socket.on("new-message", (msg) => {
      console.log("received message: ", msg);
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("typing", () => {
      setShowTyping(true);
    });
    socket.on("no-typing", () => {
      setShowTyping(false);
    });

    return () => socket.disconnect();
  }, [socket]);

  const notify = (msg) => {
    toast(msg);
  };

  useEffect(() => {
    fetchMessages();
  }, [currentChat]);

  const fetchMessages = async () => {
    if (!currentChat) return;

    socket.emit("join-room", currentChat._id);

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

      console.log("Fetched messages: ", response.data);
      setMessages(response.data.messages);
    } catch (error) {
      console.log("Error: ", error);
      notify("Failed to load messages❌");
    } finally {
      setLoading(false);
      notify("Messages loaded successfully✅");
    }
  };

  const handleMessageSend = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const messageToSend = newMessage;
      setNewMessage("");
      const response = await axios.post(
        `http://localhost:8080/api/message`,
        {
          message: messageToSend,
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

      // emitting socket.io-client event
      socket.emit("send-message", newMessageDoc);
    } catch (error) {
      console.log("Error: ", error);
      notify("Failed to send message❌");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = () => {
    if (timeoutID) clearTimeout(timeoutID);
    setIsTyping(true);
    socket.emit("show-typing", currentChat._id);
  };

  const handleKeyUp = () => {
    if (timeoutID) clearTimeout(timeoutID);

    const timeoutId = setTimeout(() => {
      setIsTyping(false);
      socket.emit("hide-typing", currentChat._id);
    }, 2000);

    setTimeoutID(timeoutId);
  };

  // useEffect(() => {
  //   if (isTyping) {
  //     console.log("Emitting typing event");

  //     socket.emit("show-typing", currentChat._id);
  //   }
  // }, [isTyping]);
  return (
    <div className="flex flex-col h-full bg-slate-300">
      <div className="flex-1 overflow-y-auto flex flex-col-reverse p-2">
        <ScrollableFeed>
          {messages &&
            messages.map((msg) => {
              const isOtherUser = msg.sender._id === otherUser._id;
              return (
                <div
                  key={msg._id}
                  className={`mb-2 flex ${
                    isOtherUser ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {isOtherUser && (
                    <Tooltip message={otherUser.username}>
                      <img
                        className="object-cover rounded-full h-10 w-10 cursor-pointer mr-2"
                        src={otherUser.avatar}
                        alt="avatar"
                      />
                    </Tooltip>
                  )}

                  <div
                    className={`max-w-[70%] flex items-center p-2 rounded-md ${
                      isOtherUser ? "bg-white" : "bg-pink-500 text-white"
                    }`}
                  >
                    <span className="break-words">{msg.content}</span>
                  </div>
                </div>
              );
            })}
        </ScrollableFeed>
      </div>
      {loading && <Spinner />}

      {/* Typing Indicator */}
      {showTyping && (
        <span className="p-4">
          <TypingIndicator />
        </span>
      )}
      <form
        onSubmit={handleMessageSend}
        className="p-2 flex gap-2 items-center"
      >
        <input
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
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

export default SingleChatArea;
