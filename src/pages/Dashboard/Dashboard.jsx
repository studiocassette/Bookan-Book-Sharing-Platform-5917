import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { useBooks } from '../../contexts/BookContext';

const { FiSearch, FiBookOpen, FiUsers, FiTrendingUp, FiPlus, FiMapPin, FiBell } = FiIcons;

const Dashboard = () => {
  const { user } = useAuth();
  const { books, myBooks } = useBooks();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bonjour');
    else if (hour < 18) setGreeting('Bon après-midi');
    else setGreeting('Bonsoir');
  }, []);

  const categories = [
    { name: 'Fiction', count: 234, color: 'bg-blue-100 text-blue-600' },
    { name: 'Sciences', count: 156, color: 'bg-green-100 text-green-600' },
    { name: 'Histoire', count: 89, color: 'bg-purple-100 text-purple-600' },
    { name: 'Art', count: 67, color: 'bg-orange-100 text-orange-600' }
  ];

  const recentBooks = books.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img 
              src={user?.avatar} 
              alt={user?.name}
              className="w-12 h-12 rounded-full border-2 border-blue-100"
            />
            <div>
              <p className="text-gray-600 text-sm">{greeting}</p>
              <h1 className="text-xl font-bold text-gray-900">
                {user?.name?.split(' ')[0]} 👋
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <SafeIcon icon={FiBell} className="text-xl" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <Link to="/app/search" className="block">
          <div className="bg-gray-100 rounded-full px-4 py-3 flex items-center space-x-3">
            <SafeIcon icon={FiSearch} className="text-gray-400" />
            <span className="text-gray-500">Rechercher un livre...</span>
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white"
          >
            <SafeIcon icon={FiBookOpen} className="text-2xl mb-2" />
            <p className="text-blue-100 text-sm">Livres disponibles</p>
            <p className="text-2xl font-bold">{books.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white"
          >
            <SafeIcon icon={FiUsers} className="text-2xl mb-2" />
            <p className="text-green-100 text-sm">Mes livres</p>
            <p className="text-2xl font-bold">{myBooks.length}</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Actions rapides</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/app/scanner"
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <SafeIcon icon={FiPlus} className="text-blue-600 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Ajouter un livre</h3>
              <p className="text-gray-500 text-sm">Scanner le code-barres</p>
            </Link>

            <Link
              to="/app/search"
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <SafeIcon icon={FiSearch} className="text-green-600 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Explorer</h3>
              <p className="text-gray-500 text-sm">Trouver des livres</p>
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Catégories populaires</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className={`inline-flex px-2 py-1 rounded-full text-sm font-medium ${category.color} mb-2`}>
                  {category.name}
                </div>
                <p className="text-gray-600 text-sm">{category.count} livres</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Books */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Près de vous</h2>
            <Link to="/app/search" className="text-blue-500 text-sm font-medium">
              Voir tout
            </Link>
          </div>
          <div className="space-y-3">
            {recentBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-12 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                      {book.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">{book.author}</p>
                    <div className="flex items-center space-x-1 mt-2">
                      <SafeIcon icon={FiMapPin} className="text-gray-400 text-xs" />
                      <span className="text-gray-500 text-xs">
                        {book.owner.distance}km • {book.owner.name}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/app/books/${book.id}`}
                    className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full font-medium"
                  >
                    Voir
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;