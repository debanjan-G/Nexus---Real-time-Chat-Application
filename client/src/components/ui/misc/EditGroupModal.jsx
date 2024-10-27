import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import toast, { Toaster } from "react-hot-toast";
import { ChatState } from "../../context/ChatProvider";
import Badge from "../misc/Badge";
import axios from "axios";
import Spinner from "../Spinner";

const EditGroupModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { currentChat, setCurrentChat } = ChatState();

  console.log("selected chat = ", currentChat);

  const notify = (msg) => {
    toast(msg);
  };

  const removePeopleFromGroup = async (userID) => {
    console.log(`Removing user ${userID} from group`);

    try {
      const response = await axios.put(
        "http://localhost:8080/api/chat/group-remove-people",
        {
          userID,
          groupChatID: currentChat._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);
      setCurrentChat(response.data.updatedGroupChat);

      notify("User removed from group successfully✅");
    } catch (error) {
      console.log("Error: ", error);
      notify("Operation Failed❌");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      <Toaster />
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex gap-2 justify-center items-center">
              {/* <IoIosCreate className=" text-sky-500 text-3xl bg-slate-100" /> */}
              <DialogTitle
                as="h3"
                className="text-3xl text-center font-light leading-6 text-gray-900"
              >
                {/* Group Name here */}
                {currentChat.chatName}
              </DialogTitle>
            </div>
            {/* Show all users of the group */}

            <div className="px-4 flex flex-wrap items-center justify-center gap-2">
              {currentChat?.users.map((user) => (
                <Badge
                  key={user._id}
                  user={user}
                  removeBadge={removePeopleFromGroup}
                />
              ))}
            </div>

            {loading && <Spinner />}
            <form
              // onSubmit={createGroupChat}
              className="w-full max-w-md px-4 flex flex-col justify-center items-center mx-auto"
            >
              <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-4">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm text-white font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-600 sm:mt-0 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default EditGroupModal;
