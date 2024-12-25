import React, { createContext, useContext, useState } from 'react';

// Creiamo il contesto
const UserContext = createContext();

// Provider per il contesto
export const UserProvider = ({ children }) => {
    const [userType, setUserType] = useState(null); // Può essere 'admin', 'user', etc.

    return (
        <UserContext.Provider value={{ userType, setUserType }}>
            {children}
        </UserContext.Provider>
    );
};

// accedere facilmente al contesto
export const useUserContext = () => {
    return useContext(UserContext);
};