import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { userAPI } from '../../services/api';
import authService from '../../services/authService';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing auth on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedUser = authService.getUser();
      const token = authService.getToken();
      
      if (storedUser && token) {
        setUser(storedUser);
        // Set axios default authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Optionally verify token with backend
        try {
          const response = await userAPI.getProfile();
          setUser(response.data.data);
          authService.saveAuth(token, response.data.data);
        } catch (err) {
          // Token invalid, logout
          authService.logout();
          setUser(null);
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await userAPI.login({ email, password });
      const { data } = response.data;
      
      authService.saveAuth(data.token, data);
      setUser(data);
      // Set axios default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
      return { success: false, message };
    }
  };

  const googleLogin = async (credential) => {
    try {
      setError(null);
      const response = await userAPI.googleLogin(credential);
      const { data } = response.data;
      
      authService.saveAuth(data.token, data);
      setUser(data);
      // Set axios default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Google login failed. Please try again.';
      setError(message);
      return { success: false, message };
    }
  };

  const register = async (name, email, password) => {
    try {
      setError(null);
      const response = await userAPI.register({ name, email, password });
      const { data } = response.data;
      
      authService.saveAuth(data.token, data);
      setUser(data);
      // Set axios default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(message);
      return { success: false, message };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    // Remove axios default authorization header
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
    localStorage.setItem('aurumUser', JSON.stringify({ ...user, ...updatedData }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        googleLogin,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export default AuthContext;

