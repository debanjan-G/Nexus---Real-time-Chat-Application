import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
// import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import SearchResultBox from "../misc/SearchResultBox";
import Spinner from "../Spinner";
import { Toaster, toast } from "react-hot-toast";
import SkeletonLoader from "../SkeletonLoader";

const users = [
  {
    id: 1,
    name: "Durward Reynolds",
    email: "durward@example.com",
    avatar:
      "https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-479x512-n8sg74wg.png",
  },
  {
    id: 2,
    name: "Kenton Towne",
    email: "kenton@example.com",
    avatar:
      "https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-479x512-n8sg74wg.png",
  },
  {
    id: 3,
    name: "Therese Wunsch",
    email: "therese@example.com",
    avatar:
      "https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-479x512-n8sg74wg.png",
  },
  {
    id: 4,
    name: "Benedict Kessler",
    email: "benedict@example.com",
    avatar:
      "https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-479x512-n8sg74wg.png",
  },
  {
    id: 5,
    name: "Katelyn Rohan",
    email: "katelyn@example.com",
    avatar:
      "https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-479x512-n8sg74wg.png",
  },
];

export default function ChatSidebar({ open, setOpen }) {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const notify = (msg) => {
    toast(msg);
  };

  const searchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!query) return;
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/user?search=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setSearchedUsers(response.data.users);
    } catch (error) {
      console.log(error);
      notify("Request Failed❌");
    } finally {
      setLoading(false);
    }
  };

  const accessChat = async (person) => {
    // console.log(person);

    setSelectedPerson(person);

    console.log("Creating new chat");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/chat/",
        {
          userId: person._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      notify("Could not create chat! Try again later.");
      console.log("ERROR: ", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        setQuery("");
        setSelectedPerson(null);
      }}
      className="relative z-10"
    >
      <Toaster />
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:-translate-x-full sm:duration-700 bg-white shadow-xl"
            >
              <div className="flex h-full flex-col overflow-y-scroll py-6">
                <TransitionChild>
                  <div className="flex justify-between items-center p-4">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                      Search Users
                    </DialogTitle>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <IoMdClose
                        aria-hidden="true"
                        className="h-6 w-6 text-red-500"
                      />
                    </button>
                  </div>
                </TransitionChild>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <div className=" flex justify-center items-center gap-2 mb-4">
                    <input
                      className="p-2 pl-10 border border-gray-300 rounded-md w-full "
                      aria-label="Assignee"
                      placeholder="Search User"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    {/* <button className="">Go</button> */}
                    <button
                      onClick={searchUsers}
                      className=" bg-slate-800 text-white rounded-md text-sm w-1/2 p-2"
                    >
                      Go
                    </button>
                  </div>
                  {/* <SkeletonLoader /> */}
                  {loading ? (
                    <SkeletonLoader />
                  ) : (
                    <div className="mt-2 max-h-60 ">
                      {searchedUsers?.map((person) => (
                        <SearchResultBox
                          person={person}
                          key={person.email}
                          name={person.username}
                          email={person.email}
                          avatar={person.avatar}
                          accessChat={accessChat}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
