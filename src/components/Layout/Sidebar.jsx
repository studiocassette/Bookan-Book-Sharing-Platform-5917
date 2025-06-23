import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const { FiHome, FiSearch, FiCamera, FiBook, FiMessageCircle, FiUser, FiLogOut } = FiIcons;

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/app', icon: FiHome, label: 'Tableau de bord' },
    { path: '/app/search', icon: FiSearch, label: 'Rechercher' },
    { path: '/app/scanner', icon: FiCamera, label: 'Scanner ISBN' },
    { path: '/app/my-books', icon: FiBook, label: 'Ma Bibliothèque' },
    { path: '/app/loans', icon: FiBook, label: 'Mes Prêts' },
    { path: '/app/messages', icon: FiMessageCircle, label: 'Messages' },
    { path: '/app/profile', icon: FiUser, label: 'Mon Profil' }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-40">
      <div className="p-6">
        {/* Logo */}
        <Link to="/app" className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-bookan-primary rounded-xl flex items-center justify-center">
            <SafeIcon icon={FiBook} className="text-white text-lg" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-bookan-dark">Bookan</h1>
            <p className="text-xs text-gray-500">Bibliothèque de proximité</p>
          </div>
        </Link>

        {/* User Info */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{user?.name}</h3>
              <p className="text-sm text-gray-500 truncate">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-bookan-primary text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-bookan-primary'
              }`}
            >
              <SafeIcon icon={item.icon} className="text-lg" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiLogOut} className="text-lg" />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;