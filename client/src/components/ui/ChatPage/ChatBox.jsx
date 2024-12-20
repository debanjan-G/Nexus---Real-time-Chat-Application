import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { LuEye } from "react-icons/lu";
import ProfileModal from "../misc/ProfileModal";
import SingleChatArea from "./SingleChatArea";
import { IoIosInformationCircleOutline } from "react-icons/io";
import EditGroupModal from "../misc/EditGroupModal";
import GroupChatArea from "./GroupChatArea";

const ChatBox = () => {
  const [otherUser, setOtherUser] = useState("");
  const [chatName, setChatName] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditGroupModal, setShowEditGroupModal] = useState(false);
  const { user: loggedInUser, currentChat } = ChatState();

  useEffect(() => {
    if (loggedInUser && currentChat) {
      const foundUser = currentChat.users.find(
        (user) => user._id !== loggedInUser.id
      );
      setOtherUser(foundUser);

      const newChatName = currentChat.isGroupChat
        ? currentChat.chatName
        : foundUser?.username || "Unknown User";

      setChatName(newChatName);
    }
  }, [loggedInUser, currentChat]);

  return (
    <div className="bg-white p-4 w-full h-full rounded-md flex flex-col">
      {showEditGroupModal && (
        <EditGroupModal
          open={showEditGroupModal}
          setOpen={setShowEditGroupModal}
        />
      )}

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
        <div className="flex items-center justify-between p-2 mb-2">
          <h1 className="text-4xl font-light mb-2">{chatName}</h1>
          {currentChat.isGroupChat ? (
            <IoIosInformationCircleOutline
              onClick={() => setShowEditGroupModal(true)}
              className="text-2xl hover:cursor-pointer hover:text-blue-600 duration-200"
            />
          ) : (
            <LuEye
              onClick={() => setShowProfileModal(true)}
              className="text-xl hover:cursor-pointer hover:text-blue-600 duration-200"
            />
          )}
        </div>
      )}
      <hr className="border-t-4" />
      <div className="flex-1 overflow-y-auto">
        {!chatName ? (
          <div className="h-full flex items-center justify-center">
            <h1 className="text-4xl font-light text-slate-700">
              Click on a user to start chatting
            </h1>
          </div>
        ) : // Corrected rendering logic
        currentChat.users.length > 2 ? (
          <GroupChatArea />
        ) : (
          <SingleChatArea otherUser={otherUser} />
        )}
      </div>
    </div>
  );
};

export default ChatBox;
