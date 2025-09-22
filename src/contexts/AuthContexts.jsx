import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const registerUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8000/auth/register', userData, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.status === 200 || response.status === 201) {
        return { success: true, message: 'Письмо с подтверждением отправлено на вашу почту' };
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
      const response = await axios.post('http://localhost:8000/auth/login', credentials, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.data) {
        const jwtToken = response.data;
        localStorage.setItem('token', jwtToken);
        setToken(jwtToken);
        setUser({
          email: credentials.email,
          token: jwtToken
        });
        
        return { success: true };
      }
      
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Ошибка входа' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      registerUser,
      loginUser,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);