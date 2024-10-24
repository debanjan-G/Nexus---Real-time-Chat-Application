/* eslint-disable react/prop-types */
import React from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import SearchResultBox from "../misc/SearchResultBox";
import Avatar from "../misc/Avatar";

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

const ChatPageHeader = ({ user }) => {
  const [selectedPerson, setSelectedPerson] = useState("Search User");
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? users
      : users.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });
  return (
    <div className="bg-white flex justify-between items-center shadow-lg  p-4 mb-4">
      <div className="flex items-center gap-2">
        <IoSearch />
        <Combobox
          value={selectedPerson}
          onChange={setSelectedPerson}
          onClose={() => setQuery("")}
        >
          <ComboboxInput
            className="p-2"
            aria-label="Assignee"
            displayValue={(person) => person?.name}
            placeholder="Search User"
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxOptions
            anchor="bottom"
            className="w-1/4 border empty:invisible p-2 opacity-100"
          >
            {filteredPeople.map((person) => (
              <ComboboxOption
                key={person.id}
                value={person}
                className="data-[focus]:bg-blue-100 m-4"
              >
                <SearchResultBox
                  name={person.name}
                  email={person.email}
                  avatar={person.avatar}
                />
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Combobox>
      </div>
      <h1 className=" text-4xl font-light">Nexus</h1>
      <div className=" flex items-center justify-around gap-4 ">
        <IoIosNotifications className=" size-6" />
        <div className="flex items-center hover:bg-slate-100 transition duration-200 hover:cursor-pointer">
          <Avatar name={user.name} image={user.avatar} />
          {/* <img
            className=" object-contain h-10"
            src={user.avatar}
            alt="avatar"
          /> */}
          <IoMdArrowDropdown />
        </div>
      </div>
    </div>
  );
};

export default ChatPageHeader;
