import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      // Fallback to localStorage for demo
      const storedUser = localStorage.getItem('bookan_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.log('Auth check failed');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Mock login for demo
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: 'Reader',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      setUser(mockUser);
      localStorage.setItem('bookan_user', JSON.stringify(mockUser));
      return mockUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // Mock registration for demo
      const mockUser = {
        id: Date.now().toString(),
        ...userData,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`
      };
      setUser(mockUser);
      localStorage.setItem('bookan_user', JSON.stringify(mockUser));
      return mockUser;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('bookan_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};