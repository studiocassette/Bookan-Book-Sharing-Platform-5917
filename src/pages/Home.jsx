import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const { FiBook, FiMapPin, FiUsers, FiHeart, FiArrowRight, FiCheck } = FiIcons;

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: FiBook,
      title: 'Scanner & Partager',
      description: 'Scannez vos livres en un clic et partagez votre bibliothèque'
    },
    {
      icon: FiMapPin,
      title: 'Proximité',
      description: 'Trouvez des livres près de chez vous en quelques secondes'
    },
    {
      icon: FiUsers,
      title: 'Communauté',
      description: 'Rejoignez une communauté de lecteurs passionnés'
    },
    {
      icon: FiHeart,
      title: 'Gratuit',
      description: 'Échangez gratuitement et contribuez à un monde plus durable'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Livres partagés' },
    { number: '2.5K+', label: 'Lecteurs actifs' },
    { number: '500+', label: 'Villes couvertes' },
    { number: '95%', label: 'Satisfaction' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bookan-light via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-bookan-primary rounded-xl flex items-center justify-center">
                <SafeIcon icon={FiBook} className="text-white text-lg" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-bookan-dark">Bookan</h1>
                <p className="text-xs text-gray-500">Bibliothèque de proximité</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <Link
                  to="/app"
                  className="bg-bookan-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Mon Espace
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-bookan-primary font-medium"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    className="bg-bookan-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    S'inscrire
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-bookan-dark leading-tight mb-6">
                La plus grande
                <span className="text-bookan-primary block">bibliothèque</span>
                <span className="text-bookan-secondary">de proximité</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Prêtez, empruntez et découvrez des livres près de chez vous. 
                Rejoignez une communauté de lecteurs qui partagent leur passion.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-bookan-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <span>Commencer gratuitement</span>
                  <SafeIcon icon={FiArrowRight} />
                </Link>
                
                <button className="border-2 border-bookan-primary text-bookan-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-bookan-primary hover:text-white transition-all duration-300">
                  Voir la démo
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-bookan-primary to-blue-700 rounded-3xl p-8 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=faces"
                  alt="Lecteur heureux"
                  className="rounded-2xl w-full h-80 object-cover"
                />
              </div>
              
              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiCheck} className="text-bookan-accent text-lg" />
                  <span className="font-semibold text-sm">Livre trouvé!</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiMapPin} className="text-bookan-primary text-lg" />
                  <span className="font-semibold text-sm">À 800m de chez vous</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-bookan-dark mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, local et gratuit. Découvrez comment Bookan révolutionne le partage de livres.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-bookan-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <SafeIcon icon={feature.icon} className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-bookan-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-bookan-primary to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-white"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-bookan-light">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-bookan-dark mb-6">
              Prêt à rejoindre la communauté ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Commencez dès maintenant et découvrez des milliers de livres près de chez vous.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 bg-bookan-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Créer mon compte gratuit</span>
              <SafeIcon icon={FiArrowRight} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bookan-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-bookan-primary rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiBook} className="text-white text-sm" />
              </div>
              <span className="font-bold text-lg">Bookan</span>
            </div>
            <p className="text-gray-400">
              © 2024 Bookan. Fait avec ❤️ pour les lecteurs.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;