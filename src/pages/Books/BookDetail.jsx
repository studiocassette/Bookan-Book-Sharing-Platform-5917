import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useBooks } from '../../contexts/BookContext';

const { FiArrowLeft, FiMapPin, FiUser, FiStar, FiMessageCircle, FiHeart, FiShare2, FiBook, FiCalendar, FiInfo } = FiIcons;

const BookDetail = () => {
  const { id } = useParams();
  const { books, requestLoan } = useBooks();
  const [loading, setLoading] = useState(false);
  
  const book = books.find(b => b.id === id);
  
  if (!book) {
    return (
      <div className="text-center py-12">
        <SafeIcon icon={FiBook} className="text-6xl text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Livre non trouvé</h2>
        <Link
          to="/app/search"
          className="text-bookan-primary hover:text-blue-700 font-medium"
        >
          ← Retour à la recherche
        </Link>
      </div>
    );
  }

  const handleLoanRequest = async () => {
    setLoading(true);
    try {
      await requestLoan(book.id);
      alert('Demande de prêt envoyée avec succès !');
    } catch (error) {
      alert('Erreur lors de la demande de prêt');
    } finally {
      setLoading(false);
    }
  };

  const getOwnerTypeBadge = (owner) => {
    switch (owner.type) {
      case 'Library':
        return { text: 'Bibliothèque', color: 'bg-green-100 text-green-800', icon: FiBook };
      case 'Bookshop':
        return { text: 'Librairie', color: 'bg-purple-100 text-purple-800', icon: FiUser };
      default:
        return { text: 'Particulier', color: 'bg-blue-100 text-blue-800', icon: FiUser };
    }
  };

  const ownerBadge = getOwnerTypeBadge(book.owner);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Link
          to="/app/search"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-bookan-primary transition-colors"
        >
          <SafeIcon icon={FiArrowLeft} />
          <span>Retour à la recherche</span>
        </Link>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Book Cover & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-full h-80 object-cover"
            />
            
            <div className="p-6 space-y-4">
              <button
                onClick={handleLoanRequest}
                disabled={loading}
                className="w-full bg-bookan-primary text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Envoi...</span>
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiMessageCircle} />
                    <span>Demander le prêt</span>
                  </>
                )}
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <SafeIcon icon={FiHeart} className="text-red-500" />
                  <span className="text-sm">Favoris</span>
                </button>
                
                <button className="flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <SafeIcon icon={FiShare2} className="text-gray-600" />
                  <span className="text-sm">Partager</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Book Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Title & Author */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                <p className="text-xl text-gray-600 mb-4">{book.author}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${ownerBadge.color}`}>
                {ownerBadge.text}
              </span>
            </div>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <SafeIcon
                    key={i}
                    icon={FiStar}
                    className={`text-lg ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-gray-600">4.2 (127 avis)</span>
            </div>
            
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>

          {/* Book Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <SafeIcon icon={FiInfo} />
              <span>Informations</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">ISBN</span>
                  <p className="text-gray-900">{book.isbn}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">État</span>
                  <p className="text-gray-900">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      book.condition === 'New' ? 'bg-green-500' : 
                      book.condition === 'Good' ? 'bg-yellow-500' : 'bg-orange-500'
                    }`}></span>
                    {book.condition === 'New' ? 'Neuf' : 
                     book.condition === 'Good' ? 'Bon état' : 'Usagé'}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Disponibilité</span>
                  <p className="text-green-600 font-medium">Disponible</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Durée de prêt</span>
                  <p className="text-gray-900">14 jours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Owner Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <SafeIcon icon={ownerBadge.icon} />
              <span>Propriétaire</span>
            </h2>
            
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-bookan-primary rounded-full flex items-center justify-center">
                <SafeIcon icon={FiUser} className="text-white text-xl" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{book.owner.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiMapPin} />
                    <span>À {book.owner.distance}km de vous</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiCalendar} />
                    <span>Membre depuis 2023</span>
                  </div>
                </div>
                
                {book.owner.type !== 'Reader' && (
                  <div className="bg-gray-50 rounded-lg p-3 mt-3">
                    <p className="text-sm text-gray-600">
                      {book.owner.type === 'Library' 
                        ? 'Ouvert du lundi au samedi, 9h-18h'
                        : 'Librairie spécialisée en littérature française'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookDetail;