import React from 'react';
import { Outlet } from 'react-router-dom';
import MobileNavbar from './MobileNavbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="pb-20 lg:pb-0">
        <div className="max-w-md mx-auto lg:max-w-7xl">
          <Outlet />
        </div>
      </main>
      
      {/* Mobile Navigation */}
      <MobileNavbar />
    </div>
  );
};

export default Layout;