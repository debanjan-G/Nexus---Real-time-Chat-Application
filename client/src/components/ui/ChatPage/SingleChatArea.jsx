import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import toast from "react-hot-toast";

const SingleChatArea = ({ otherUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currentChat, setCurrentChat } = ChatState();

  // console.log("Other User  =  ", otherUser);
  // console.log("Current Chat  =  ", currentChat);

  const notify = (msg) => {
    toast(msg);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

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

      console.log("Fetch Msg Response: ", response.data);
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

      console.log("Send Message API response: ", response.data);
      setMessages((prev) => [...prev, newMessage]); //updating the messages state
    } catch (error) {
      console.log("Error: ", error);
      notify("Failed to send message❌");
    } finally {
      setLoading(false);
      notify("Message sent successfully✅");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-300">
      <div className="flex-1 overflow-y-auto flex flex-col-reverse p-2 ">
        {/* This is where the chat messages will be displayed */}
        {/* Example message display */}
        {/* sender's messages */}
        <div className="mb-2 flex flex-col items-end bg-pink-500 p-2 rounded-md max-w-fit ml-auto text-white  ">
          Hi there!
        </div>
        {/* receiver's messages */}
        <div className="mb-2 flex flex-col items-start bg-white p-2 rounded-md max-w-fit">
          <div className="flex">
            <span className="font-semibold inline mr-2">
              {otherUser.username}:
            </span>{" "}
            Hello!
          </div>
        </div>
        {/* Add more messages here */}
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
        <button>
          <IoSend
            type="submit"
            className="text-2xl hover:cursor-pointer hover:text-blue-800 duration-200"
          />
        </button>
      </form>
    </div>
  );
};

export default SingleChatArea;
