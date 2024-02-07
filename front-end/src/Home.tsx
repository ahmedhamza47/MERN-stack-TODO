import { useState } from "react";

import TodoApp from "./TODODB";

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <div className="p-4">
      <div className=" w-100 flex justify-end">
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={toggle}
            className="flex items-center text-sm font-medium text-gray-500 focus:outline-none focus:ring focus:border-blue-300"
            id="user-menu"
            aria-haspopup="true"
          >
            <img className="w-8 h-8 rounded-full" src={""} alt="User Image" />
          </button>

          {/* Dropdown Content */}
          {dropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 cursor-pointer">
              <div className="py-1" role="none">
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Profile
                </a>
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Change Password
                </a>
                <div
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={handleLogout}
                >
                  Sign Out
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <TodoApp />
    </div>
  );
};

export default Home;
