import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = ({}) => {
  const isDarkMode = false;
  return (
    <>
      <header className="px-6 py-5 border-b bg-white">
        <div className="flex justify-between">
          <div>
            <span className=" text-slate-600 font-semibold">Todo List</span>
          </div>
          <div>
            <ul>
              <li>
                <button>{isDarkMode ? <BsSun /> : <BsMoon />}</button>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
