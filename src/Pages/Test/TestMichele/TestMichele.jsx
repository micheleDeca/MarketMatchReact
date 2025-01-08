import React, { useState, useEffect } from "react";
import MapComponent from "../../../Components/MapComponent/MapComponent";
import "./TestMichele.css";
 
 
const TestMichele = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'e6d205d5e58f4ed2ab5ffc26451f06d2'; // Sostituisci con la tua chiave API OpenCage

  const fetchCoordinates = async () => {
    if (!address) {
      setError('Inserisci un indirizzo valido');
      return;
    }

    try {
      setError(null);
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          address
        )}&key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Errore nella richiesta API');
      }

      const data = await response.json();

      if (data.results.length > 0) {
        setCoordinates({
          lat: data.results[0].geometry.lat,
          lon: data.results[0].geometry.lng,
        });
      } else {
        setError('Nessun risultato trovato');
        setCoordinates(null);
      }
    } catch (err) {
      setError(err.message);
      setCoordinates(null);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Geocoding con OpenCage</h1>
      <div>
        <input
          type="text"
          placeholder="Inserisci un indirizzo"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            width: '300px',
            padding: '10px',
            marginRight: '10px',
          }}
        />
        <button
          onClick={fetchCoordinates}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#FFF',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Cerca
        </button>
      </div>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      {coordinates && (
        <div style={{ marginTop: '20px' }}>
          <h3>Coordinate trovate:</h3>
          <p>Latitudine: {coordinates.lat}</p>
          <p>Longitudine: {coordinates.lon}</p>
        </div>
      )}
    </div>
  );
};

export default TestMichele;



/*
quando fai richiesta al db, fai richiesta con cordinate di ne4j, per vicinanza, ma metti limite di quantita negozi dopo aver ordinato
*/

/*
 // Funzione per caricare i negozi dal backend
  const fetchStores = async () => {
    try {
      // Effettua una richiesta GET al backend con i parametri delle coordinate
      const response = await axios.get("/api/stores", {
        params: {
          latitude: mapCenter[0],
          longitude: mapCenter[1],
          maxDistance: 5000, // Distanza massima in metri
        },
      });

      // Salva i negozi vicini nello stato
      const nearbyStores = response.data;
      setStores(nearbyStores);

      // Ordina i negozi per distanza
      const sortedByDistance = [...nearbyStores].sort((a, b) => a.distance - b.distance);
      setSortedStores(sortedByDistance);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  // Effetto per aggiornare i negozi quando cambia il centro della mappa
  useEffect(() => {
    fetchStores();
  }, [mapCenter]); // Dipendenza: mapCenter
*/