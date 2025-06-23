import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const { FiArrowLeft, FiEdit, FiSettings, FiBook, FiHeart, FiStar, FiUsers, FiBell, FiHelpCircle, FiLogOut } = FiIcons;

const Profile = () => {
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Livres partagés', value: '24', icon: FiBook, color: 'bg-blue-500' },
    { label: 'Échanges', value: '18', icon: FiHeart, color: 'bg-red-500' },
    { label: 'Note moyenne', value: '4.8', icon: FiStar, color: 'bg-yellow-500' },
    { label: 'Abonnés', value: '156', icon: FiUsers, color: 'bg-green-500' }
  ];

  const menuItems = [
    { label: 'Modifier le profil', icon: FiEdit, action: () => {} },
    { label: 'Notifications', icon: FiBell, action: () => {} },
    { label: 'Paramètres', icon: FiSettings, action: () => {} },
    { label: 'Aide', icon: FiHelpCircle, action: () => {} },
    { label: 'Déconnexion', icon: FiLogOut, action: logout, danger: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <Link to="/app" className="p-2 -ml-2">
            <SafeIcon icon={FiArrowLeft} className="text-xl text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Mon profil</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
        >
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-20 h-20 rounded-full border-4 border-blue-100"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600 mb-1">{user?.email}</p>
              <p className="text-gray-500 text-sm">Membre depuis janvier 2024</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-gray-700 text-sm leading-relaxed">
              Passionné de littérature française et de romans historiques. 
              J'adore partager mes découvertes avec d'autres lecteurs de la communauté.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center"
            >
              <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <SafeIcon icon={stat.icon} className="text-white text-lg" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`w-full flex items-center space-x-4 p-4 hover:bg-gray-50 transition-colors ${
                index < menuItems.length - 1 ? 'border-b border-gray-100' : ''
              } ${item.danger ? 'text-red-600' : 'text-gray-900'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                item.danger ? 'bg-red-50' : 'bg-gray-100'
              }`}>
                <SafeIcon icon={item.icon} className={`text-lg ${item.danger ? 'text-red-600' : 'text-gray-600'}`} />
              </div>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </motion.div>

        {/* App Info */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm">Bookan version 1.0.0</p>
          <p className="text-gray-400 text-xs mt-1">© 2024 Bookan. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;