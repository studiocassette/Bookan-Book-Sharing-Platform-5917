import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMessageCircle, FiSend, FiBook, FiUser, FiSearch, FiMoreVertical } = FiIcons;

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const mockConversations = [
    {
      id: '1',
      participant: {
        name: 'Marie Dubois',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marie'
      },
      book: {
        title: 'Le Nom de la Rose',
        coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=150&fit=crop'
      },
      lastMessage: {
        text: 'Parfait ! Je peux venir le récupérer demain après-midi.',
        timestamp: new Date('2024-01-20T14:30:00'),
        sender: 'other'
      },
      unread: 2,
      messages: [
        {
          id: '1',
          text: 'Bonjour ! Je suis intéressé par votre livre "Le Nom de la Rose".',
          timestamp: new Date('2024-01-20T10:00:00'),
          sender: 'me'
        },
        {
          id: '2',
          text: 'Bonjour ! Oui, il est disponible. Vous pouvez le récupérer quand vous voulez.',
          timestamp: new Date('2024-01-20T10:15:00'),
          sender: 'other'
        },
        {
          id: '3',
          text: 'Génial ! Où pouvons-nous nous retrouver ?',
          timestamp: new Date('2024-01-20T10:30:00'),
          sender: 'me'
        },
        {
          id: '4',
          text: 'Je peux vous le déposer à la bibliothèque Forney demain entre 14h et 16h, ça vous va ?',
          timestamp: new Date('2024-01-20T14:00:00'),
          sender: 'other'
        },
        {
          id: '5',
          text: 'Parfait ! Je peux venir le récupérer demain après-midi.',
          timestamp: new Date('2024-01-20T14:30:00'),
          sender: 'other'
        }
      ]
    },
    {
      id: '2',
      participant: {
        name: 'Bibliothèque Forney',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=library'
      },
      book: {
        title: "L'Étranger",
        coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100&h=150&fit=crop'
      },
      lastMessage: {
        text: 'Nous vous rappelons que le livre doit être rendu avant le 24 janvier.',
        timestamp: new Date('2024-01-19T16:00:00'),
        sender: 'other'
      },
      unread: 0,
      messages: [
        {
          id: '1',
          text: 'Bonjour, votre réservation pour "L\'Étranger" est confirmée.',
          timestamp: new Date('2024-01-10T09:00:00'),
          sender: 'other'
        },
        {
          id: '2',
          text: 'Merci ! À quelle heure puis-je venir le récupérer ?',
          timestamp: new Date('2024-01-10T09:15:00'),
          sender: 'me'
        },
        {
          id: '3',
          text: 'Nous sommes ouverts de 9h à 18h du mardi au samedi.',
          timestamp: new Date('2024-01-10T09:30:00'),
          sender: 'other'
        },
        {
          id: '4',
          text: 'Nous vous rappelons que le livre doit être rendu avant le 24 janvier.',
          timestamp: new Date('2024-01-19T16:00:00'),
          sender: 'other'
        }
      ]
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    // Simulate sending message
    const newMsg = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date(),
      sender: 'me'
    };

    // Update conversation with new message
    setSelectedConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg]
    }));

    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une conversation..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bookan-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {mockConversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation?.id === conversation.id ? 'bg-bookan-primary bg-opacity-10' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <img
                    src={conversation.participant.avatar}
                    alt={conversation.participant.name}
                    className="w-12 h-12 rounded-full"
                  />
                  {conversation.unread > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {conversation.unread}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {conversation.participant.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {format(conversation.lastMessage.timestamp, 'HH:mm')}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <img
                      src={conversation.book.coverUrl}
                      alt={conversation.book.title}
                      className="w-6 h-8 object-cover rounded"
                    />
                    <span className="text-sm text-gray-600 truncate">
                      {conversation.book.title}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate">
                    {conversation.lastMessage.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedConversation.participant.avatar}
                    alt={selectedConversation.participant.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {selectedConversation.participant.name}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <img
                        src={selectedConversation.book.coverUrl}
                        alt={selectedConversation.book.title}
                        className="w-4 h-6 object-cover rounded"
                      />
                      <span className="text-sm text-gray-600">
                        {selectedConversation.book.title}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
                  <SafeIcon icon={FiMoreVertical} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {selectedConversation.messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.sender === 'me'
                      ? 'bg-bookan-primary text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {format(message.timestamp, 'HH:mm')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-bookan-primary focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-3 bg-bookan-primary text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SafeIcon icon={FiSend} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <SafeIcon icon={FiMessageCircle} className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sélectionnez une conversation
              </h3>
              <p className="text-gray-600">
                Choisissez une conversation pour commencer à échanger
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;