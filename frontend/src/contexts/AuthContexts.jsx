import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';
const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  ME: '/auth/me'
};
const COOKIE_NAMES = {
  ACCESS_TOKEN: 'cutly_access_token',
  TOKEN: 'token'
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const savedToken = getCookie(COOKIE_NAMES.ACCESS_TOKEN);
    
    if (!savedToken) {
      setIsLoading(false);
      return;
    }

    setToken(savedToken);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const response = await axios.post(
        `${API_BASE_URL}${AUTH_ENDPOINTS.ME}`,
        {},
        { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }
      );
      
      setUser(response.data);
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthError = (error) => {
    if (error.response?.status === 401) {
      deleteCookie(COOKIE_NAMES.ACCESS_TOKEN);
      deleteCookie(COOKIE_NAMES.TOKEN);
      setToken(null);
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}${AUTH_ENDPOINTS.REGISTER}`,
        userData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      if (response.status === 200 || response.status === 201) {
        return { success: true };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Ошибка регистрации' 
      };
    }
  };

  const loginUser = async (credentials) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}${AUTH_ENDPOINTS.LOGIN}`,
        credentials,
        { 
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true 
        }
      );

      setToken(response.data);
      
      const userResponse = await axios.post(
        `${API_BASE_URL}${AUTH_ENDPOINTS.ME}`,
        {},
        { withCredentials: true }
      );
      
      setUser(userResponse.data);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}${AUTH_ENDPOINTS.LOGOUT}`);
    } catch (error) {
    }

    deleteCookie(COOKIE_NAMES.ACCESS_TOKEN);
    deleteCookie(COOKIE_NAMES.TOKEN);
    setToken(null);
    setUser(null);
  };

  const authValue = {
    user,
    token,
    registerUser,
    loginUser,
    logout,
    isLoading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function deleteCookie(name) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export const useAuth = () => useContext(AuthContext);