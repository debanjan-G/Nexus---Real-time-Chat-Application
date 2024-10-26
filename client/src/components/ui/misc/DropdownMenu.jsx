import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function DropdownMenu({ setShowModal }) {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <Menu>
      <MenuButton
        onClick={() => {
          setShowDropdown((prev) => !prev);
        }}
        className="inline-flex items-center gap-2 rounded-full py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-200 data-[open]:bg-gray-200 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        <IoMdArrowDropdown className="size-4 text-black" />
      </MenuButton>

      {showDropdown && (
        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-slate-800 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
              onClick={() => {
                setShowModal(true);
              }}
            >
              {/* <PencilIcon className="size-4 fill-white/30" /> */}
              My Profile
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
              onClick={handleLogout}
            >
              {/* <Square2StackIcon className="size-4 fill-white/30" /> */}
              Logout
            </button>
          </MenuItem>
        </MenuItems>
      )}
    </Menu>
    // </div>
  );
}
