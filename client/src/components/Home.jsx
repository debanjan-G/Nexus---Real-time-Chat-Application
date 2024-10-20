import React, { useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import axios from "axios";

const Home = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const response = await axios.get("http://localhost:8080/api/chats");
      console.log(response.data);
      setChats(response.data);
    };

    fetchChats();
  }, []);

  return (
    <div>
      <h1>Home Component</h1>

      <div className=" text-center">
        <h1 className="text-center">Chat Application</h1>
        <Button className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
          Save changes
        </Button>
      </div>
      <div className="flex flex-col items-center text-left">
        {chats.length > 0 &&
          chats.map((chat) => <p key={chat._id}>{chat.chatName}</p>)}
      </div>
    </div>
  );
};

export default Home;
