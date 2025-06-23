import React, { createContext, useContext, useState, useEffect } from 'react';

const BookContext = createContext();

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within BookProvider');
  }
  return context;
};

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data
  const mockBooks = [
    {
      id: '1',
      isbn: '9782070408504',
      title: 'Le Nom de la Rose',
      author: 'Umberto Eco',
      coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop',
      condition: 'Good',
      status: 'Available',
      owner: {
        id: '2',
        name: 'Marie Dubois',
        distance: 0.8,
        location: { lat: 48.8566, lng: 2.3522 }
      },
      description: 'Roman historique captivant dans une abbaye médiévale.'
    },
    {
      id: '2',
      isbn: '9782070413119',
      title: "L'Étranger",
      author: 'Albert Camus',
      coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop',
      condition: 'New',
      status: 'Available',
      owner: {
        id: '3',
        name: 'Bibliothèque Forney',
        distance: 1.2,
        location: { lat: 48.8534, lng: 2.3488 },
        type: 'Library'
      },
      description: 'Chef-d\'œuvre de la littérature française du XXe siècle.'
    },
    {
      id: '3',
      isbn: '9782070360024',
      title: 'Le Petit Prince',
      author: 'Antoine de Saint-Exupéry',
      coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
      condition: 'Good',
      status: 'Available',
      owner: {
        id: '4',
        name: 'Jean Martin',
        distance: 2.1,
        location: { lat: 48.8606, lng: 2.3376 }
      },
      description: 'Un conte poétique et philosophique intemporel.'
    },
    {
      id: '4',
      isbn: '9782070417759',
      title: '1984',
      author: 'George Orwell',
      coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
      condition: 'Good',
      status: 'Available',
      owner: {
        id: '5',
        name: 'Sophie Durand',
        distance: 1.5,
        location: { lat: 48.8529, lng: 2.3499 }
      },
      description: 'Dystopie prophétique sur la surveillance et le totalitarisme.'
    }
  ];

  // Initialize with mock data
  useEffect(() => {
    setBooks(mockBooks);
  }, []);

  const addBook = async (bookData) => {
    try {
      const newBook = {
        id: Date.now().toString(),
        ...bookData,
        status: 'Available',
        owner: { id: 'current-user', name: 'Moi' },
        created_at: new Date().toISOString()
      };

      setMyBooks(prev => [...prev, newBook]);
      setBooks(prev => [...prev, newBook]);
      return newBook;
    } catch (error) {
      console.error('Add book error:', error);
      throw error;
    }
  };

  const searchBooks = async (query, location) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const results = books.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
    
    setLoading(false);
    return results;
  };

  const requestLoan = async (bookId) => {
    const book = books.find(b => b.id === bookId);
    if (!book) return null;

    const loan = {
      id: Date.now().toString(),
      bookId,
      book,
      status: 'Requested',
      requestDate: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    };

    setLoans(prev => [...prev, loan]);
    return loan;
  };

  const fetchBooks = async () => {
    setBooks(mockBooks);
  };

  const value = {
    books,
    myBooks,
    loans,
    loading,
    searchBooks,
    addBook,
    requestLoan,
    fetchBooks
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};