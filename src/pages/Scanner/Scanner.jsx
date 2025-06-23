import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useBooks } from '../../contexts/BookContext';

const { FiCamera, FiArrowLeft, FiX, FiCheck, FiPlus, FiBook } = FiIcons;

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedBook, setScannedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const { addBook } = useBooks();

  const mockBooks = [
    {
      isbn: '9782070408504',
      title: 'Le Nom de la Rose',
      author: 'Umberto Eco',
      coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop',
      description: 'Roman historique captivant dans une abbaye médiévale.',
      publisher: 'Gallimard',
      year: 1982
    }
  ];

  const startCamera = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
      }
    } catch (err) {
      setError('Impossible d\'accéder à la caméra');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  const simulateScan = () => {
    setLoading(true);
    setTimeout(() => {
      const randomBook = mockBooks[0];
      setScannedBook(randomBook);
      setLoading(false);
      stopCamera();
    }, 2000);
  };

  const handleAddBook = async () => {
    if (!scannedBook) return;
    try {
      await addBook({ ...scannedBook, condition: 'Good' });
      setScannedBook(null);
      alert('Livre ajouté avec succès !');
    } catch (err) {
      setError('Erreur lors de l\'ajout');
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  if (scannedBook) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white px-4 py-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <button onClick={() => setScannedBook(null)} className="p-2 -ml-2">
              <SafeIcon icon={FiArrowLeft} className="text-xl text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Livre détecté</h1>
          </div>
        </div>

        <div className="px-4 py-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
          >
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-center text-white">
              <SafeIcon icon={FiCheck} className="text-3xl mx-auto mb-2" />
              <h2 className="text-xl font-bold">Livre scanné avec succès !</h2>
            </div>

            <div className="p-6">
              <div className="flex space-x-4 mb-6">
                <img
                  src={scannedBook.coverUrl}
                  alt={scannedBook.title}
                  className="w-24 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {scannedBook.title}
                  </h3>
                  <p className="text-gray-600 mb-1">{scannedBook.author}</p>
                  <p className="text-gray-500 text-sm mb-2">
                    {scannedBook.publisher} • {scannedBook.year}
                  </p>
                  <p className="text-gray-500 text-sm">ISBN: {scannedBook.isbn}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {scannedBook.description}
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleAddBook}
                  className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiPlus} />
                  <span>Ajouter à ma bibliothèque</span>
                </button>
                <button
                  onClick={() => setScannedBook(null)}
                  className="w-full border border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Scanner un autre livre
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <Link to="/app" className="p-2 -ml-2">
            <SafeIcon icon={FiArrowLeft} className="text-xl text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Scanner un livre</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          {!isScanning ? (
            <div className="p-8 text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <SafeIcon icon={FiCamera} className="text-blue-500 text-3xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Scanner le code-barres
              </h2>
              <p className="text-gray-600 mb-8">
                Pointez votre caméra vers le code-barres du livre pour l'identifier automatiquement
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={startCamera}
                className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiCamera} />
                <span>Ouvrir la caméra</span>
              </button>
            </div>
          ) : (
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-80 object-cover bg-gray-900"
              />
              
              {/* Scan Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="border-2 border-white border-dashed rounded-lg p-8">
                  <div className="w-48 h-32 border-2 border-white rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiBook} className="text-white text-2xl" />
                  </div>
                  <p className="text-white text-center mt-4 text-sm">
                    Centrez le code-barres dans le cadre
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <div className="flex justify-center space-x-4">
                  {loading ? (
                    <div className="flex items-center space-x-2 text-white">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Analyse en cours...</span>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={simulateScan}
                        className="bg-white text-gray-900 py-3 px-6 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                      >
                        Scanner
                      </button>
                      <button
                        onClick={stopCamera}
                        className="bg-red-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-red-600 transition-colors"
                      >
                        <SafeIcon icon={FiX} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="mt-6 bg-blue-50 rounded-xl p-4">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Conseils</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Assurez-vous que l'éclairage est suffisant</li>
            <li>• Tenez le livre bien droit</li>
            <li>• Le code-barres doit être entièrement visible</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Scanner;