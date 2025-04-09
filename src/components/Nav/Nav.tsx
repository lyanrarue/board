import { useState } from "react";
import { HamburgerIcon } from "../Icons/Icons";
import NavPopover from "./NavPopover/NavPopover";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleDropdown}
        className="px-1 py-1 rounded-md focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-900"
      >
        <HamburgerIcon />
      </button>
      {/* NavPopover */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-48 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md shadow-lg">
          <NavPopover />
        </div>
      )}
    </>
  );
};

export default Nav;
