/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import SkeletonLoader from "../SkeletonLoader";
import { Button } from "@headlessui/react";
import ChatCard from "../misc/ChatCard";
import { IoAddOutline } from "react-icons/io5";
import Spinner from "../Spinner";
import CreateGroupModal from "../misc/CreateGroupModal";

const MyChats = ({ user }) => {
  const { chats, setChats, currentChat, setCurrentChat } = ChatState();
  const [loading, setLoading] = useState(false);
  const [loggedUser, setLoggedUser] = useState();
  const [selectedChat, setSelectedChat] = useState("");
  const [open, setOpen] = useState(false);

  const notify = (msg) => {
    toast(msg);
  };

  const token = localStorage.getItem("token");
  // const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/chat", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setChats(response.data.chats);

        console.log("Chats = ", response.data);
      } catch (error) {
        console.log("ERROR: ", error);
        notify("Oops! An error occured while fetching your chats.");
      } finally {
        notify("Chats fetched successfully✅");
        setLoading(false);
      }
    };

    fetchChats(); // fetching all chats of currently logged user

    setLoggedUser(JSON.parse(localStorage.getItem("userInfo"))); // saving the details of the currently logged user
  }, []);

  const fetchChat = async (user, chat) => {
    console.log(`Fetching chat with ${user.username}`);
    console.log("selected chat = ", chat);

    setCurrentChat(chat);
  };

  const showCreateGroupModal = () => {
    setOpen(true);
  };

  return (
    <div className="bg-white p-4 w-1/3 rounded-md overflow-y-scroll">
      <Toaster />
      <div className="flex gap-4 justify-between items-center">
        <h1 className="text-3xl font-light">My Chats</h1>
        <Button
          onClick={showCreateGroupModal}
          className="flex items-center bg-blue-400 rounded-md text-white p-2"
        >
          New Group Chat
          <IoAddOutline className="text-2xl mx-2 inline" />
        </Button>
        <CreateGroupModal open={open} setOpen={setOpen} />
      </div>
      {chats?.map((chat, index) => (
        <div onClick={() => setSelectedChat(chat)} className="" key={index}>
          <ChatCard
            chat={chat}
            fetchChat={fetchChat}
            // latestMessage={chat.latestMessage || null}
            isSelected={selectedChat._id === chat._id}
            otherUser={chat.users.find((user) => user._id != loggedUser.id)}
            latestMessage={`Latest Message ${index + 1}`}
          />
        </div>
      ))}
      {loading && <SkeletonLoader />}
    </div>
  );
};

export default MyChats;

// 1. MyChats heading
// 2. New Group Chat  button
//3. Current user label
// 4. Individual Chat Component (card):
// a. other user's name
//b. Recent message + sender name
