import { useState } from "react";
import { Settings } from "lucide-react";

const SettingsPopover = () => {
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
        <Settings />
      </button>
      <div
        className={`absolute top-full mt-2 right-0 w-95 h-110 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md shadow-lg transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{
          transformOrigin: "top right",
          transitionTimingFunction: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
        }}
      >
        <div className="flex flex-col justify-center items-center h-full">
          Coming Soon: Configureable Protocols
        </div>
      </div>
    </>
  );
};

export default SettingsPopover;
