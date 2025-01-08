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
    <section className="about-us">
    <div className="container">
      <h1 className="about-title">Chi Siamo</h1>
      <p className="about-tagline">
        Inclusivi per natura, sostenibili per scelta. MarketMatch è la piattaforma che rivoluziona il modo in cui scopri e acquisti prodotti eco-sostenibili e specializzati.
      </p>
      <div className="about-content">
        <div className="about-card">
          <h2 className="about-card-title">La nostra missione</h2>
          <p className="about-card-content">
            Vogliamo semplificare la ricerca di prodotti biologici, vegani, senza glutine e tanto altro, rendendo il consumo consapevole accessibile a tutti. Il nostro obiettivo è unire persone, negozi locali e produttori, creando un ecosistema virtuoso.
          </p>
        </div>
        <div className="about-card">
          <h2 className="about-card-title">Come lo facciamo</h2>
          <p className="about-card-content">
            Grazie alla geolocalizzazione, a suggerimenti personalizzati basati sulle tue preferenze e a un sistema di ricompense green, rendiamo semplice fare scelte sostenibili, supportando al contempo l'economia locale.
          </p>
        </div>
        <div className="about-card">
          <h2 className="about-card-title">Cosa ci distingue</h2>
          <p className="about-card-content">
            MarketMatch combina tecnologia avanzata con valori etici, offrendo una piattaforma unica che promuove il benessere, la sostenibilità e l'inclusione. Siamo più di un servizio: siamo un partner per il tuo stile di vita consapevole.
          </p>
        </div>
      </div>
      <div className="about-highlight">
        <h2>Cosa puoi aspettarti</h2>
        <ul>
          <li>🌍 Prodotti selezionati vicino a te</li>
          <li>🌱 Ricompense per acquisti green</li>
          <li>🛒 Prenotazioni semplici e veloci</li>
          <li>💡 Suggerimenti personalizzati</li>
        </ul>
      </div>
    </div>
  </section>
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