import React from "react";

const SingleChatArea = () => {
  return (
    <div className="flex flex-col h-full bg-slate-300">
      <div className="flex-1 overflow-y-auto p-2 ">
        {/* This is where the chat messages will be displayed */}
        {/* Example message display */}
        <div className="mb-2">User: Hi there!</div>
        <div className="mb-2">You: Hello!</div>
        {/* Add more messages here */}
      </div>
      <div className="p-2">
        <input
          className="w-full p-2 rounded-md"
          type="text"
          placeholder="Enter a message"
        />
      </div>
    </div>
  );
};

export default SingleChatArea;
