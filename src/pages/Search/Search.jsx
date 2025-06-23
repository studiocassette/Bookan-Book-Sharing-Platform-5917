import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useBooks } from '../../contexts/BookContext';

const { FiSearch, FiMapPin, FiFilter, FiArrowLeft, FiStar } = FiIcons;

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { searchBooks, books } = useBooks();

  useEffect(() => {
    setResults(books);
  }, [books]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const searchResults = await searchBooks(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const popularSearches = ['Fiction', 'Science-fiction', 'Philosophie', 'Histoire', 'Art'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="flex items-center space-x-4 mb-4">
          <Link to="/app" className="p-2 -ml-2">
            <SafeIcon icon={FiArrowLeft} className="text-xl text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Explorer</h1>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative">
          <SafeIcon 
            icon={FiSearch} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher titre, auteur, ISBN..."
            className="w-full pl-12 pr-12 py-3 bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
          >
            <SafeIcon icon={FiFilter} />
          </button>
        </form>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Popular Searches */}
        {!query && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Recherches populaires</h2>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => setQuery(search)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              {query ? `Résultats pour "${query}"` : 'Livres disponibles'}
            </h2>
            <span className="text-gray-500 text-sm">{results.length} livres</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((book, index) => (
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
                      <h3 className="font-semibold text-gray-900 mb-1 leading-tight">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                      
                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <SafeIcon 
                            key={i} 
                            icon={FiStar} 
                            className={`text-xs ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="text-gray-500 text-xs ml-1">4.0</span>
                      </div>

                      {/* Owner Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiMapPin} className="text-gray-400 text-xs" />
                          <span className="text-gray-500 text-xs">
                            {book.owner.distance}km • {book.owner.name}
                          </span>
                        </div>
                        <Link
                          to={`/app/books/${book.id}`}
                          className="px-4 py-2 bg-blue-500 text-white text-sm rounded-full font-medium hover:bg-blue-600 transition-colors"
                        >
                          Emprunter
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {results.length === 0 && !loading && query && (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucun livre trouvé pour "{query}"</p>
              <p className="text-gray-400 text-sm mt-1">
                Essayez avec d'autres mots-clés
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;