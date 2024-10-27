import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { getSender } from "../../../helperFunctions/getSender";
import { LuEye } from "react-icons/lu";
import ProfileModal from "../misc/ProfileModal";

const ChatBox = () => {
  const [otherUser, setOtherUser] = useState("");
  const [chatName, setChatName] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { user: loggedInUser, currentChat } = ChatState();

  useEffect(() => {
    // Only proceed if both loggedInUser and currentChat are defined
    if (loggedInUser && currentChat) {
      const foundUser = currentChat.users.find(
        (user) => user._id !== loggedInUser.id
      );
      setOtherUser(foundUser);

      const newChatName = currentChat.isGroupChat
        ? currentChat.chatName
        : foundUser?.username || "Unknown User";

      setChatName(newChatName);

      console.log("Chat Name = ", newChatName);
    }
  }, [loggedInUser, currentChat]);

  return (
    <div className="  bg-white p-4 w-full h-full rounded-md">
      {showProfileModal && (
        <ProfileModal
          username={otherUser.username}
          userEmail={otherUser.email}
          userPic={otherUser.avatar}
          showModal={showProfileModal}
          setShowModal={setShowProfileModal}
        />
      )}
      {chatName && (
        <div className=" flex items-center justify-between p-2 mb-2">
          <h1 className=" text-4xl font-light mb-2">{chatName}</h1>
          {!currentChat.isGroupChat && (
            <LuEye
              onClick={() => setShowProfileModal(true)}
              className=" text-xl hover:cursor-pointer hover:text-blue-600 duration-200"
            />
          )}
        </div>
      )}
      <hr className=" border-t-4" />
      {!chatName && (
        <div className="h-full flex items-center justify-center">
          <h1 className=" text-4xl font-light text-slate-700">
            Click on a user to start chatting
          </h1>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
