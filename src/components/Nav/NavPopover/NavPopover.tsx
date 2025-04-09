const NavPopover = () => {
  return (
    <div>
      <div className="absolute top-[-6px] right-2 w-3 h-3 bg-white dark:bg-gray-800 transform rotate-45"></div>
      <ul className="py-2">
        <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
          Coming Soon
        </li>
      </ul>
    </div>
  );
};

export default NavPopover;
