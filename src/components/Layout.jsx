import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Adjust path

const Layout = () => {
  return (
    <div className="flex">
      {/* Main content area */}
      <div className="flex-1 min-h-screen">
        {/* Navbar */}
        {/* <Navbar /> */}

        {/* Dynamic content */}
        <div className="p-6 bg-gray-100 min-h-screen">
          <Outlet /> {/* This will render the matching route's component */}
        </div>
      </div>
    </div>
  );
};

export default Layout;

