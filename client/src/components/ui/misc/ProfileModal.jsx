/* eslint-disable react/prop-types */
import React from "react";
import { ChatState } from "../../context/ChatProvider";
import { IoMdClose } from "react-icons/io";

export default function ProfileModal({
  username,
  userEmail,
  userPic,
  showModal,
  setShowModal,
}) {
  return (
    <>
      {showModal ? (
        <>
          <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/4 my-6 mx-auto ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-center p-5 border-b border-solid border-blueGray-200 rounded-t text-center">
                  <h3 className="text-3xl font-semibold mx-auto w-full">
                    {username}
                  </h3>
                  <IoMdClose
                    className="text-black"
                    onClick={() => setShowModal(false)}
                  />
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-col items-center">
                  <img
                    className="object-contain h-32 mb-4"
                    src={userPic}
                    alt="user-pic"
                  />

                  <div>
                    <p className="text-xl font-light tracking-wider">
                      <span className="font-semibold">Email: </span>
                      {userEmail}
                    </p>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none hover:bg-red-500 hover:text-white transition-all rounded-md duration-250 focus:outline-none mr-1 mb-1 ease-linear"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
