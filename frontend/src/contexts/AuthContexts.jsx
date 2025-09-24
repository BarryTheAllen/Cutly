import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';
const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  ME: '/auth/me'
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}${AUTH_ENDPOINTS.ME}`,
        {},
        { 
          withCredentials: true
        }
      );
      
      if (response.status === 200) {
        setUser({ email: response.data.email });
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}${AUTH_ENDPOINTS.REGISTER}`,
        userData,
        { 
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
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
      setIsLoading(true);
      
      await axios.post(
        `${API_BASE_URL}${AUTH_ENDPOINTS.LOGIN}`,
        credentials,
        { 
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      await checkAuth();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Ошибка входа' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}${AUTH_ENDPOINTS.LOGOUT}`,
        {},
        { 
          withCredentials: true
        }
      );
    } catch (error) {
    } finally {
      setUser(null);
    }
  };

  const authValue = {
    user,
    token: user ? 'authenticated' : null,
    isLoading,
    registerUser,
    loginUser,
    logout,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);