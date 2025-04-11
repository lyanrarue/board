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
        <Settings size={30} />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-100 h-110 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md shadow-lg transform transition-all duration-300 scale-100 opacity-100">
          <div className="relative">
            <div className="absolute top-[-6px] right-2 w-3 h-3 bg-white dark:bg-gray-800 transform rotate-45 transition-all duration-300 scale-100 opacity-100"></div>
            <div className="flex flex-col items-center justify-center h-100">
              Configureable Protocols Coming Soon
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsPopover;
