/* eslint-disable react/prop-types */
import React from "react";

const Avatar = ({ name, image }) => {
  console.log(name);

  // Check if name is valid and split it to get initials
  const initials =
    name && name.split(" ").length > 1
      ? name.split(" ")[0][0] + name.split(" ")[1][0]
      : name
      ? name[0]
      : ""; // Fallback to first letter of the name if single name or empty

  return (
    <div className="bg-sky-400 rounded-full p-2">
      {/* {image ? (
        <img src={image} alt={`${name}'s avatar`} className="rounded-full" />
      ) : ( */}
      <span className="text-white font-bold">{initials}</span>
      {/* )} */}
    </div>
  );
};

export default Avatar;
