/* eslint-disable react/prop-types */
import React from "react";

const SearchResultBox = ({ person, accessChat, addPeopleToGroup }) => {
  return (
    <div
      onClick={
        accessChat ? () => accessChat(person) : () => addPeopleToGroup(person)
      }
      className="w-full hover:cursor-pointer hover:bg-sky-200 bg-slate-200 p-2 flex items-center gap-4 my-2"
    >
      <img src={person.avatar} alt="avatar" className="h-10" />
      <div>
        <p className="text-xl">{person.username}</p>
        <p className="text-sm">
          <span className="font-semibold">Email:</span> {person.email}
        </p>
      </div>
    </div>
  );
};

export default SearchResultBox;
