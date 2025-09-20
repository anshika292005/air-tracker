import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('flightTracker_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        localStorage.removeItem('flightTracker_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (userData) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user object
      const newUser = {
        id: Date.now().toString(),
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email,
        phone: userData.phone || '',
        joinDate: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        preferences: {
          notifications: true,
          newsletter: true,
          seatPreference: 'window'
        },
        bookings: [],
        loyaltyPoints: 0
      };

      setUser(newUser);
      localStorage.setItem('flightTracker_user', JSON.stringify(newUser));
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Validate password confirmation
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Check if user already exists (simulate)
      const existingUsers = JSON.parse(localStorage.getItem('flightTracker_users') || '[]');
      const userExists = existingUsers.some(u => u.email === userData.email);
      
      if (userExists) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone || '',
        joinDate: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        preferences: {
          notifications: true,
          newsletter: true,
          seatPreference: 'window'
        },
        bookings: [],
        loyaltyPoints: 100 // Welcome bonus
      };

      // Save to users list
      existingUsers.push(newUser);
      localStorage.setItem('flightTracker_users', JSON.stringify(existingUsers));

      setUser(newUser);
      localStorage.setItem('flightTracker_user', JSON.stringify(newUser));
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('flightTracker_user');
  };

  const updateUser = (updates) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('flightTracker_user', JSON.stringify(updatedUser));
  };

  const addBooking = (booking) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      bookings: [...user.bookings, booking],
      loyaltyPoints: user.loyaltyPoints + 50 // Points per booking
    };
    
    setUser(updatedUser);
    localStorage.setItem('flightTracker_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    addBooking,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
