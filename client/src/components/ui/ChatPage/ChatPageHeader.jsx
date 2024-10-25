/* eslint-disable react/prop-types */
import React from "react";

import { IoIosNotifications } from "react-icons/io";

import { useState } from "react";

import Avatar from "../misc/Avatar";
import DropdownMenu from "../misc/DropdownMenu";
import ProfileModal from "../misc/ProfileModal";
import { IoSearch } from "react-icons/io5";

const ChatPageHeader = ({ user, setOpen }) => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="bg-white flex justify-between items-center shadow-lg  p-4 mb-4">
      <div className="flex items-center gap-2" onClick={() => setOpen(true)}>
        <IoSearch />
        Search Users
      </div>
      <h1 className=" text-4xl font-light">Nexus</h1>
      <div className=" flex items-center justify-around gap-4 ">
        <IoIosNotifications className=" size-6" />
        <div className="flex items-center hover:cursor-pointer">
          <Avatar name={user.name} image={user.avatar} />
          <DropdownMenu setShowModal={setShowModal} />
          <ProfileModal
            username={user.name}
            userEmail={user.email}
            userPic={user.avatar}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPageHeader;
