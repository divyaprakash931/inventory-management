import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import Sidebar from './Sidebar';
import downloadExcel from "../components/DownloadExcel";
import { useNavigate } from 'react-router-dom';

const Navbar = ({ component: Component }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logout = () => {
    downloadExcel();
    navigate('/');
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar stays on the left */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar at the top of the content area */}
        <nav className="bg-gray-50 text-black p-4 flex justify-between items-center shadow-md h-16 lg:h-auto w-full">
          {/* Hamburger Menu for mobile view */}
          <button
            className="text-2xl lg:hidden"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <FiMenu />
          </button>

          {/* App Title */}
          <h1 className="text-lg sm:text-2xl font-bold">Inventory Management</h1>

          {/* Logout button */}
          <div className="flex space-x-4">
            <div
              className="p-2 hover:bg-gray-300 rounded text-red-600 cursor-pointer"
              onClick={logout}
            >
              Logout
            </div>
          </div>
        </nav>

        {/* Routed content will be rendered here below the Navbar */}
        <div className="flex-1 p-6 bg-gray-100 overflow-auto">
          {Component && <Component />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
