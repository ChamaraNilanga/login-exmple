import React, { createContext, useState, useContext } from 'react';

const UserConfigContext = createContext();

export const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState(null);
    const [token, setToken] = useState(null);
  
    const contextValue = {
        userName,
        setUserName,
        token,
        setToken
    };
    
    return (
      <UserConfigContext.Provider value={contextValue}>
        {children}
      </UserConfigContext.Provider>
    );
  };
  
  export const useUserContext = () => {
    const context = useContext(UserConfigContext);
    if (!context) {
      throw new Error('useIpContext must be used within an IpProvider');
    }
    return context;
  };