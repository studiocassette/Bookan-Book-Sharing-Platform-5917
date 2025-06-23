import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const { FiHome, FiSearch, FiCamera, FiBook, FiMessageCircle, FiUser, FiMenu, FiX } = FiIcons;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/app', icon: FiHome, label: 'Accueil' },
    { path: '/app/search', icon: FiSearch, label: 'Rechercher' },
    { path: '/app/scanner', icon: FiCamera, label: 'Scanner' },
    { path: '/app/my-books', icon: FiBook, label: 'Mes Livres' },
    { path: '/app/messages', icon: FiMessageCircle, label: 'Messages' },
    { path: '/app/profile', icon: FiUser, label: 'Profil' }
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <Link to="/app" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-bookan-primary rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiBook} className="text-white text-sm" />
          </div>
          <span className="font-bold text-lg text-bookan-dark">Bookan</span>
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="text-xl text-gray-600" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isMenuOpen ? 0 : '-100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <SafeIcon icon={FiX} className="text-xl text-gray-600" />
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-bookan-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <SafeIcon icon={item.icon} className="text-lg" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiUser} className="text-lg" />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;