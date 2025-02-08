import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiX } from 'react-icons/fi'; // Import close icon

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gray-200 text-black p-4 transition-transform transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:w-64`}
    >
      {/* Close Button for mobile view */}
      <div className="flex justify-end lg:hidden">
        <button
          onClick={toggleSidebar}
          className="text-2xl"
          aria-label="Close sidebar"
        >
          <FiX />
        </button>
      </div>

      {/* Sidebar content */}
      <h2 className="text-2xl font-semibold text-blue-600">Logo</h2>
      <ul className="mt-4 space-y-2">
        <Link to="/localStorage">
          <li className={`p-2 rounded border-2 ${location.pathname === '/localStorage' ? 'bg-gray-300 border-gray-500' : 'hover:bg-gray-300 '}`}>
            Local Storage
          </li>
        </Link>
        <Link to="/dashboard">
          <li className={`p-2 rounded border-2 ${location.pathname === '/dashboard' ? 'bg-gray-300 border-gray-500' : 'hover:bg-gray-300 '}`}>
            Dashboard
          </li>
        </Link>
        <Link to="/customer-details">
          <li className={`p-2 rounded border-2 ${location.pathname === '/customer-details' ? 'bg-gray-300 border-gray-500' : 'hover:bg-gray-300 '}`}>
            Customer Details
          </li>
        </Link>
        <Link to="/invoice-form">
          <li className={`p-2 rounded border-2 ${location.pathname === '/invoice-form' ? 'bg-gray-300 border-gray-500' : 'hover:bg-gray-300 '}`}>
            Invoice Form
          </li>
        </Link>
        <Link to="/raw-material-details">
          <li className={`p-2 rounded border-2 ${location.pathname === '/raw-material-details' ? 'bg-gray-300 border-gray-500' : 'hover:bg-gray-300 '}`}>
            Raw Material Details
          </li>
        </Link>
        <Link to="/attendance">
          <li className={`p-2 rounded border-2 ${location.pathname === '/attendance' ? 'bg-gray-300 border-gray-500' : 'hover:bg-gray-300'}`}>
            Attendance
          </li>
        </Link>
        <Link to="/todo-list">
          <li className={`p-2 rounded border-2 ${location.pathname === '/todo-list' ? 'bg-gray-300 border-gray-500' : 'hover:bg-gray-300 '}`}>
            Todo List
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
