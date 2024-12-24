import React, { createContext, useContext, useState } from 'react';

// Creiamo il contesto
const CategoryContext = createContext();

// Provider per il contesto
export const CategoryProvider = ({ children }) => {
    const [category, setCategory] = useState([]);  

    return (
        <CategoryContext.Provider value={{ category, setCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

// Hook per accedere facilmente al contesto
export const useCategoryContext = () => {
    return useContext(CategoryContext);
};