import React, { useEffect, useState } from "react";
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
import { Field, Input } from "@headlessui/react";
import SearchResultBox from "./SearchResultBox";

const EditGroupModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { currentChat, setCurrentChat } = ChatState();

  // Add people to group states
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Notify function
  const notify = (msg) => {
    toast(msg);
  };

  // Function to search for users
  const searchUsers = async () => {
    if (!query) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/user?search=${query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);
      setSearchResults(response.data.users);
    } catch (error) {
      console.log("ERROR: ", error);
      notify("User Not Found❗");
    } finally {
      setLoading(false);
    }
  };

  // Function to remove users from group
  const removePeopleFromGroup = async (userID) => {
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

  // Function to add new people to the group
  const addPeopleToGroup = async (newUser) => {
    if (currentChat.users.find((user) => user._id === newUser._id)) {
      notify("User is already present in the group⚠️");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(
        "http://localhost:8080/api/chat/group-add-people",
        {
          usersToAdd: [newUser._id],
          groupChatID: currentChat._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);
      setCurrentChat(response.data.updatedGroupChat); // Update currentChat with new members
      notify("User added to Group Chat successfully✅");
    } catch (error) {
      console.log("Error: ", error);
      notify("Operation Failed❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchUsers();
  }, [query]);

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
            className="relative transform overflow-hidden rounded-lg bg-white px-4 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex gap-2 justify-center items-center">
              <DialogTitle
                as="h3"
                className="text-3xl text-center font-light leading-6 text-gray-900"
              >
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

            <Field className="w-full flex items-center gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
                className="outline outline-slate-200 mx-2 my-3 block w-full rounded-lg border-none bg-slate-100 py-1.5 px-3 text-sm/6 text-slate-800 focus:outline-none"
                placeholder="Add users (eg: Arthur, Kenny, Angela)"
              />
            </Field>

            {/* Show search results */}
            <div className="max-h-[35vh] w-full overflow-y-scroll">
              {searchResults?.map((result, index) => (
                <SearchResultBox
                  addPeopleToGroup={addPeopleToGroup}
                  key={index}
                  person={result}
                />
              ))}
            </div>

            {loading && <Spinner />}
            <form className="w-full max-w-md px-4 flex flex-col justify-center items-center mx-auto">
              <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-4">
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
