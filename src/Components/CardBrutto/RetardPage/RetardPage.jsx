import React, { useState, useEffect } from 'react';

// Simula un ritardo di caricamento
const RetardPage = () => {
  const [isReady, setIsReady] = useState(false); // Stato per simulare il caricamento

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true); // Imposta lo stato su pronto dopo 5 secondi
    }, 5000);

    return () => clearTimeout(timer); // Pulisce il timer se il componente viene smontato
  }, []);

  if (!isReady) {
    // Simula il caricamento con un ritardo
    throw new Promise((resolve) => {
      setTimeout(resolve, 1000); // Ritardo simulato di 5 secondi
    });
  }

  // Contenuto della pagina che viene mostrato dopo il caricamento
  return (
    <div>
      <h1>Benvenuto nella pagina ritardata!</h1>
    </div>
  );
};

export default RetardPage;
