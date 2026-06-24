import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      verifyToken(token);
    } else {
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const verifyToken = async (authToken) => {
    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      const res = await api.get('/auth/verify');
      if (res.data.valid) {
        setUser(res.data.admin); // Our backend returns 'admin' payload for both user and admin currently due to reuse, but let's parse it correctly. Wait, backend route /verify returns `{ valid: true, admin: req.user }`. So user = req.user.
      } else {
        setToken(null);
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
