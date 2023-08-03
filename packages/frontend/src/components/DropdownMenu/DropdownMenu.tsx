import React, { ReactNode, useState } from "react";

type DropdownMenuProps = {
  menuItems: ReactNode[];
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ menuItems }) => {
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  const toggleMenu = () => setIsMenuActive(!isMenuActive);

  return (
    <div className="flex flex-col justify-center items-center relative">
      <div className="flex items-center rounded-full justify-center w-6 h-6 text-gray-500 hover:bg-gray-100 cursor-pointer dark:hover:bg-zinc-600">
        <button className="w-6 h-6 mb-2" onClick={toggleMenu}>
          ...
        </button>
      </div>
      {isMenuActive ? (
        <>
          <button
            tabIndex={1}
            onClick={toggleMenu}
            className="h-full w-full fixed inset-0 z-10 cursor-default"
          ></button>
          <div className="absolute bg-white w-48 border shadow border-gray-100 py-4 mt-2 rounded-lg right-0 top-7 z-20 dark:bg-zinc-600 dark:border-zinc-600">
            <ul className="">
              {menuItems.map((menuItem, index) => (
                <li
                  onClick={toggleMenu}
                  key={index}
                  className=" text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg py-2 px-4 dark:hover:bg-zinc-500 "
                >
                  {menuItem}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default DropdownMenu;
