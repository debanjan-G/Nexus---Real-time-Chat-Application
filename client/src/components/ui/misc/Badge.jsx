/* eslint-disable react/prop-types */
import React from "react";
import { IoMdClose } from "react-icons/io";

const Badge = ({ user, removeBadge }) => {
  //   console.log("USERNAME = ", user.username);

  return (
    <div className="flex justify-center rounded-md bg-blue-300 text-blue-900">
      <span className="  inline-block text-center px-2 py-1 rounded text-md font-semibold">
        {user.username}
      </span>
      <IoMdClose
        onClick={() => removeBadge(user._id)}
        className="hover:cursor-pointer rounded-full text-white bg-red-500"
      />
    </div>
  );
};

export default Badge;
