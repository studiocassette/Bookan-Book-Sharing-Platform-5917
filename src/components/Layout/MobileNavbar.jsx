import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiSearch, FiCamera, FiBook, FiUser } = FiIcons;

const MobileNavbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/app', icon: FiHome, label: 'Accueil' },
    { path: '/app/search', icon: FiSearch, label: 'Explorer' },
    { path: '/app/scanner', icon: FiCamera, label: 'Scanner' },
    { path: '/app/my-books', icon: FiBook, label: 'Ma liste' },
    { path: '/app/profile', icon: FiUser, label: 'Profil' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center py-2 px-3 min-w-0 flex-1"
          >
            <div className={`p-2 rounded-full transition-all duration-200 ${
              location.pathname === item.path 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-500'
            }`}>
              <SafeIcon icon={item.icon} className="text-xl" />
            </div>
            <span className={`text-xs mt-1 ${
              location.pathname === item.path 
                ? 'text-blue-500 font-medium' 
                : 'text-gray-500'
            }`}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNavbar;