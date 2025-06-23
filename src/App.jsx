import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Scanner from './pages/Scanner/Scanner';
import Search from './pages/Search/Search';
import BookDetail from './pages/Books/BookDetail';
import MyBooks from './pages/Books/MyBooks';
import Loans from './pages/Loans/Loans';
import Messages from './pages/Messages/Messages';
import Profile from './pages/Profile/Profile';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <Router>
          <div className="app-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/app" 
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="scanner" element={<Scanner />} />
                <Route path="search" element={<Search />} />
                <Route path="books/:id" element={<BookDetail />} />
                <Route path="my-books" element={<MyBooks />} />
                <Route path="loans" element={<Loans />} />
                <Route path="messages" element={<Messages />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;