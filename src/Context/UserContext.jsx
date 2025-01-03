import React, { createContext, useContext, useState } from 'react';

// Creiamo il contesto
const UserContext = createContext();

// Provider per il contesto
export const UserProvider = ({ children }) => {
    const [userType, setUserType] = useState(null); // Può essere 'admin', 'user', etc.
    const [databaseKey, setDatabaseKey] = useState(null); // Per memorizzare il databaseKey dell'utente

    return (
        <UserContext.Provider value={{ userType, setUserType, databaseKey, setDatabaseKey }}>
            {children}
        </UserContext.Provider>
    );
};

// Accedere facilmente al contesto
export const useUserContext = () => {
    return useContext(UserContext);
};
