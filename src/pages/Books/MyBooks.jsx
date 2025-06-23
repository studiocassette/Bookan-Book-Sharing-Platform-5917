import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useBooks } from '../../contexts/BookContext';

const { FiArrowLeft, FiPlus, FiBook, FiEdit, FiTrash2, FiMoreVertical } = FiIcons;

const MyBooks = () => {
  const { myBooks } = useBooks();
  const [filter, setFilter] = useState('all');

  const filteredBooks = myBooks.filter(book => {
    if (filter === 'available') return book.status === 'Available';
    if (filter === 'lent') return book.status === 'Lent';
    return true;
  });

  const stats = [
    { label: 'Total', value: myBooks.length, color: 'bg-blue-500' },
    { label: 'Disponibles', value: myBooks.filter(b => b.status === 'Available').length, color: 'bg-green-500' },
    { label: 'Prêtés', value: myBooks.filter(b => b.status === 'Lent').length, color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Link to="/app" className="p-2 -ml-2">
              <SafeIcon icon={FiArrowLeft} className="text-xl text-gray-600" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Ma bibliothèque</h1>
          </div>
          <Link
            to="/app/scanner"
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="text-xl" />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                <span className="text-white font-bold">{stat.value}</span>
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Filters */}
        <div className="flex space-x-2 mb-6">
          {['all', 'available', 'lent'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === filterType
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterType === 'all' ? 'Tous' : 
               filterType === 'available' ? 'Disponibles' : 'Prêtés'}
            </button>
          ))}
        </div>

        {/* Books List */}
        {filteredBooks.length > 0 ? (
          <div className="space-y-4">
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex space-x-4">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-16 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 leading-tight">
                          {book.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{book.author}</p>
                      </div>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <SafeIcon icon={FiMoreVertical} className="text-sm" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          book.status === 'Available' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {book.status === 'Available' ? 'Disponible' : 'Prêté'}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${
                          book.condition === 'New' ? 'bg-green-500' : 
                          book.condition === 'Good' ? 'bg-yellow-500' : 'bg-orange-500'
                        }`}></span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <SafeIcon icon={FiEdit} className="text-sm" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <SafeIcon icon={FiTrash2} className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiBook} className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {filter === 'all' ? 'Aucun livre' : 
               filter === 'available' ? 'Aucun livre disponible' : 'Aucun livre prêté'}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? 'Commencez par ajouter vos premiers livres' 
                : 'Changez de filtre pour voir d\'autres livres'}
            </p>
            {filter === 'all' && (
              <Link
                to="/app/scanner"
                className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
              >
                <SafeIcon icon={FiPlus} />
                <span>Ajouter un livre</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooks;