import React from "react";

const SearchResultBox = ({ name, email, avatar }) => {
  return (
    <div className="hover:bg-sky-200 bg-slate-200 p-2 flex items-center gap-4 my-2">
      <img src={avatar} alt="avatar" className="h-4" />
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
