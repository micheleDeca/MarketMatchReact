import React from 'react';

// Funzione per salvare il token nel localStorage con una data di scadenza
export const saveToken = (token, expiresInMinutes) => {
    const expirationTime = new Date().getTime() + expiresInMinutes * 60 * 1000; // Tempo di scadenza in millisecondi
    const tokenData = {
        token,
        expirationTime,
    };
    localStorage.setItem('authToken', JSON.stringify(tokenData));
};

// Funzione per recuperare il token, verificando se è ancora valido
export const getToken = () => {
    const tokenData = JSON.parse(localStorage.getItem('authToken'));
    if (!tokenData) return null; // Nessun token salvato

    const currentTime = new Date().getTime();
    if (currentTime > tokenData.expirationTime) {
        localStorage.removeItem('authToken'); // Rimuove il token scaduto
        return null;
    }

    return tokenData.token;
};

// Funzione per rimuovere il token manualmente
export const removeToken = () => {
    localStorage.removeItem('authToken');
    sessionStorage.setItem('currentPage', 1);

};


 