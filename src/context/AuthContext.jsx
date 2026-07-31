import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('kishanghar-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    // Mock login - always succeeds
    const mockUser = {
      id: 1,
      name: 'Rahim Uddin',
      nameBn: 'রহিম উদ্দিন',
      email: email || 'rahim@kishanghar.com',
      phone: '+880 1712-345678',
      location: 'Rangpur, Bangladesh',
      locationBn: 'রংপুর, বাংলাদেশ',
      farmSize: '8.5 acres',
      farmSizeBn: '৮.৫ একর',
      avatar: '👨‍🌾',
      role: 'farmer',
      joined: 'January 2024',
      joinedBn: 'জানুয়ারি ২০২৪',
    };
    setUser(mockUser);
    localStorage.setItem('kishanghar-user', JSON.stringify(mockUser));
    return true;
  };

  const register = (data) => {
    const mockUser = {
      id: 1,
      name: data.name || 'New Farmer',
      nameBn: 'নতুন কৃষক',
      email: data.email || 'farmer@kishanghar.com',
      phone: data.phone || '+880 1700-000000',
      location: data.location || 'Bangladesh',
      locationBn: 'বাংলাদেশ',
      farmSize: data.farmSize || '5 acres',
      avatar: '👨‍🌾',
      role: 'farmer',
      joined: 'March 2025',
      joinedBn: 'মার্চ ২০২৫',
    };
    setUser(mockUser);
    localStorage.setItem('kishanghar-user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kishanghar-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
