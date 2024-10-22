import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  });

  const login = (userName) => {
    setUser(userName)
    localStorage.setItem('user', JSON.stringify(userName))
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user')
  }

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};