import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useBooks } from '../../contexts/BookContext';

const { FiBook, FiClock, FiCheck, FiX, FiMessageCircle, FiCalendar, FiUser } = FiIcons;

const Loans = () => {
  const { loans } = useBooks();
  const [activeTab, setActiveTab] = useState('active');

  const mockLoans = [
    {
      id: '1',
      book: {
        id: '1',
        title: 'Le Nom de la Rose',
        author: 'Umberto Eco',
        coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop'
      },
      borrower: {
        name: 'Marie Dubois',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marie'
      },
      status: 'Active',
      startDate: new Date('2024-01-15'),
      dueDate: new Date('2024-01-29'),
      type: 'lent'
    },
    {
      id: '2',
      book: {
        id: '2',
        title: "L'Étranger",
        author: 'Albert Camus',
        coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop'
      },
      lender: {
        name: 'Bibliothèque Forney',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=library'
      },
      status: 'Active',
      startDate: new Date('2024-01-10'),
      dueDate: new Date('2024-01-24'),
      type: 'borrowed'
    },
    {
      id: '3',
      book: {
        id: '3',
        title: 'Le Petit Prince',
        author: 'Antoine de Saint-Exupéry',
        coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop'
      },
      borrower: {
        name: 'Jean Martin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jean'
      },
      status: 'Completed',
      startDate: new Date('2023-12-01'),
      dueDate: new Date('2023-12-15'),
      returnDate: new Date('2023-12-14'),
      type: 'lent'
    }
  ];

  const activeLoans = mockLoans.filter(loan => loan.status === 'Active');
  const completedLoans = mockLoans.filter(loan => loan.status === 'Completed');
  const currentLoans = activeTab === 'active' ? activeLoans : completedLoans;

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const diff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getStatusColor = (loan) => {
    if (loan.status === 'Completed') return 'text-green-600';
    
    const daysRemaining = getDaysRemaining(loan.dueDate);
    if (daysRemaining < 0) return 'text-red-600';
    if (daysRemaining <= 3) return 'text-orange-600';
    return 'text-blue-600';
  };

  const getStatusText = (loan) => {
    if (loan.status === 'Completed') return 'Terminé';
    
    const daysRemaining = getDaysRemaining(loan.dueDate);
    if (daysRemaining < 0) return `En retard de ${Math.abs(daysRemaining)} jour${Math.abs(daysRemaining) > 1 ? 's' : ''}`;
    if (daysRemaining === 0) return 'À rendre aujourd\'hui';
    return `${daysRemaining} jour${daysRemaining > 1 ? 's' : ''} restant${daysRemaining > 1 ? 's' : ''}`;
  };

  const stats = [
    {
      label: 'Prêts actifs',
      value: activeLoans.length.toString(),
      icon: FiClock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Livres prêtés',
      value: mockLoans.filter(l => l.type === 'lent').length.toString(),
      icon: FiBook,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Livres empruntés',
      value: mockLoans.filter(l => l.type === 'borrowed').length.toString(),
      icon: FiUser,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Prêts</h1>
        <p className="text-gray-600">Suivez vos échanges de livres</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <SafeIcon icon={stat.icon} className={`text-lg ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Historique des prêts</h2>
          
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'active'
                  ? 'bg-white text-bookan-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              En cours ({activeLoans.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'completed'
                  ? 'bg-white text-bookan-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Terminés ({completedLoans.length})
            </button>
          </div>
        </div>

        {/* Loans List */}
        <div className="space-y-4">
          {currentLoans.map((loan, index) => (
            <motion.div
              key={loan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={loan.book.coverUrl}
                  alt={loan.book.title}
                  className="w-16 h-20 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{loan.book.title}</h3>
                      <p className="text-gray-600 text-sm">{loan.book.author}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        loan.type === 'lent' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {loan.type === 'lent' ? 'Prêté' : 'Emprunté'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <img
                          src={loan.borrower?.avatar || loan.lender?.avatar}
                          alt={loan.borrower?.name || loan.lender?.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm text-gray-600">
                          {loan.type === 'lent' ? 'Prêté à' : 'Emprunté de'} {loan.borrower?.name || loan.lender?.name}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <SafeIcon icon={FiCalendar} className="text-xs" />
                        <span>
                          {format(loan.startDate, 'dd MMM', { locale: fr })} - {format(loan.dueDate, 'dd MMM', { locale: fr })}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`text-sm font-medium ${getStatusColor(loan)}`}>
                        {getStatusText(loan)}
                      </span>
                      
                      {loan.status === 'Active' && (
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-600 hover:text-bookan-primary hover:bg-white rounded-lg transition-colors">
                            <SafeIcon icon={FiMessageCircle} className="text-sm" />
                          </button>
                          {loan.type === 'lent' && (
                            <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-white rounded-lg transition-colors">
                              <SafeIcon icon={FiCheck} className="text-sm" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {currentLoans.length === 0 && (
          <div className="text-center py-8">
            <SafeIcon icon={FiBook} className="text-4xl text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {activeTab === 'active' ? 'Aucun prêt en cours' : 'Aucun prêt terminé'}
            </h3>
            <p className="text-gray-600">
              {activeTab === 'active' 
                ? 'Vos prêts actifs apparaîtront ici'
                : 'Votre historique apparaîtra ici'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loans;