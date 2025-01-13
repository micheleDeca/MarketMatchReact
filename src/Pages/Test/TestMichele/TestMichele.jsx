import React, { useState, useEffect } from "react";
import MapComponent from "../../../Components/MapComponent/MapComponent";
import "./TestMichele.css";
import axios from "axios";

const TestMichele = () => {
   

  return (
    <div>
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