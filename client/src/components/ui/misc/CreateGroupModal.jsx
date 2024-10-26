"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Field, Input } from "@headlessui/react";
import { IoIosCreate } from "react-icons/io";
import { ChatState } from "../../context/ChatProvider";
import Spinner from "../Spinner";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IoMdSearch } from "react-icons/io";

export default function CreateGroupModal({ open, setOpen }) {
  // form data states
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);

  // search users functionality
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //Loading State
  const [loading, setLoading] = useState(false);

  // context API
  const { chats, setChats, user } = ChatState();

  // toast (notifications)
  const notify = (msg) => {
    toast(msg);
  };

  // Function to create the group chat
  const createGroupChat = (e) => {
    console.log("Creating group chat...");

    e.preventDefault();
  };

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

      setSearchResults(response.data);
    } catch (error) {
      console.log("ERROR: ", error);
      notify("User Not Found❗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
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
              <IoIosCreate className=" text-sky-500 text-3xl bg-slate-100" />
              <DialogTitle
                as="h3"
                className="text-3xl text-center font-light leading-6 text-gray-900"
              >
                Create Group Chat
              </DialogTitle>
            </div>

            <form
              onSubmit={createGroupChat}
              className="w-full max-w-md px-4 flex flex-col justify-center items-center mx-auto"
            >
              <Field className="w-full">
                <Input
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  required
                  className="outline outline-slate-200 mt-3 block w-full rounded-lg border-none bg-slate-100 py-1.5 px-3 text-sm/6 text-slate-800
                    focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  placeholder="Group Chat Name"
                />
              </Field>
              <Field className="w-full flex items-center gap-2">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  required
                  className="outline outline-slate-200 my-3 block w-full rounded-lg border-none bg-slate-100 py-1.5 px-3 text-sm/6 text-slate-800
                    focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  placeholder="Add users (eg: Arthur, Kenny, Angela)"
                />
                <IoMdSearch
                  onClick={searchUsers}
                  className=" text-3xl hover:text-green-700 duration-200 transition-all cursor-pointer"
                />
              </Field>
              {loading && <Spinner />}

              <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-4">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm text-white font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-600 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto"
                >
                  Create Group Chat
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
