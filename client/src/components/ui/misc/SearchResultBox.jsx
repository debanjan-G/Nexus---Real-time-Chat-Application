import React from "react";

const SearchResultBox = ({ person, name, email, avatar, accessChat }) => {
  return (
    <div
      onClick={() => accessChat(person)}
      className="hover:cursor-pointer hover:bg-sky-200 bg-slate-200 p-2 flex items-center gap-4 my-2"
    >
      <img src={avatar} alt="avatar" className="h-10" />
      <div>
        <p className="text-xl">{name}</p>
        <p className="text-sm">
          <span className=" font-semibold">Email:</span> {email}
        </p>
      </div>
    </div>
  );
};

export default SearchResultBox;
