import React, { useState, useEffect } from "react";
import MapComponent from "../../Components/MapComponent/MapComponent";
import CardLongList from "../../Components/CardLongList/CardLongList";
import SearchBar from "../../Components/SearchBar/SearchBar";
import ButtonFilter from "../../Components/ButtonFilter/ButtonFilter";
import "./Stores.css";
 
// Simulazione del database di negozi

// Simulazione del database di negozi: un array di oggetti rappresenta i negozi
// con informazioni come id, nome, posizione geografica (latitudine, longitudine),
// punteggio (rating), indirizzo e categorie di appartenenza.
const allStores = [
  { id: 1, name: "Vegan Café La Sorgente", latitude: 41.125, longitude: 16.868, rating: 4.5, address: "Corso Vittorio Emanuele II, 10", city: "Bari", categories: ["Vegan", "Bio"], image: "http://4.232.65.20/assets/negozio/2.jpg" },
  { id: 2, name: "Green Bites Bistro", latitude: 41.128, longitude: 16.871, rating: 4.2, address: "Piazza San Nicola, 15", city: "Bari", categories: ["Vegetariano", "Bio"], image: "http://4.232.65.20/assets/negozio/9.webp" },
  { id: 3, name: "Bio e Vegan Delights", latitude: 41.123, longitude: 16.873, rating: 4.7, address: "Via Sparano, 30", city: "Bari", categories: ["Senza Glutine", "Bio"], image: "https://via.placeholder.com/150" },
  { id: 4, name: "Naturalia Market", latitude: 41.121, longitude: 16.869, rating: 4.8, address: "Via Argiro, 15", city: "Bari", categories: ["Vegano", "Ecologico"], image: "https://via.placeholder.com/150" },
  { id: 5, name: "Puro Organic Food", latitude: 41.116, longitude: 16.874, rating: 4.6, address: "Piazza Garibaldi, 20", city: "Bari", categories: ["Biologico", "Km0"], image: "https://via.placeholder.com/150" },
  { id: 6, name: "EcoGusto Store", latitude: 41.118, longitude: 16.876, rating: 4.4, address: "Via Melo, 40", city: "Bari", categories: ["Vegan", "Sostenibile"], image: "https://via.placeholder.com/150" },
  { id: 7, name: "Fresh Green Hub", latitude: 41.119, longitude: 16.868, rating: 4.3, address: "Corso Cavour, 12", city: "Bari", categories: ["Naturale", "Eco"], image: "https://via.placeholder.com/150" },
  { id: 8, name: "The Veggie Place", latitude: 41.117, longitude: 16.873, rating: 4.9, address: "Via Amendola, 60", city: "Bari", categories: ["Vegetariano", "Organico"], image: "https://via.placeholder.com/150" },
  { id: 9, name: "Eden Vegan Shop", latitude: 41.118, longitude: 16.877, rating: 4.5, address: "Via De Rossi, 18", city: "Bari", categories: ["Vegano", "Gourmet"], image: "https://via.placeholder.com/150" },
  { id: 10, name: "Bari Bio Market", latitude: 41.115, longitude: 16.870, rating: 4.8, address: "Via Manzoni, 25", city: "Bari", categories: ["Bio", "Tradizionale"], image: "https://via.placeholder.com/150" },
  { id: 11, name: "Il Germoglio Verde", latitude: 41.110, longitude: 16.865, rating: 4.7, address: "Via Putignani, 35", city: "Bari", categories: ["Sostenibile", "Vegan"], image: "https://via.placeholder.com/150" },
  { id: 12, name: "NaturBio Emporium", latitude: 41.122, longitude: 16.872, rating: 4.6, address: "Via Quintino Sella, 12", city: "Bari", categories: ["Km0", "Naturale"], image: "https://via.placeholder.com/150" },
  { id: 13, name: "Sapori Sostenibili", latitude: 41.123, longitude: 16.875, rating: 4.8, address: "Via Carulli, 5", city: "Bari", categories: ["Eco", "Vegan"], image: "https://via.placeholder.com/150" },
  { id: 14, name: "BioSapori Bari", latitude: 41.126, longitude: 16.869, rating: 4.5, address: "Corso Vittorio Emanuele II, 25", city: "Bari", categories: ["Tradizionale", "Bio"], image: "https://via.placeholder.com/150" },
  { id: 15, name: "Cibo Vivo Store", latitude: 41.113, longitude: 16.867, rating: 4.9, address: "Via Crisanzio, 80", city: "Bari", categories: ["Gourmet", "Vegan"], image: "https://via.placeholder.com/150" },
  { id: 16, name: "Green Harmony", latitude: 41.127, longitude: 16.869, rating: 4.6, address: "Piazza Ferrarese, 12", city: "Bari", categories: ["Vegan", "Bio"], image: "https://via.placeholder.com/150" },
  { id: 17, name: "Naturalmente Bio", latitude: 41.126, longitude: 16.871, rating: 4.7, address: "Via Sparano, 20", city: "Bari", categories: ["Bio", "Km0"], image: "https://via.placeholder.com/150" },
  { id: 18, name: "Sapori di Natura", latitude: 41.124, longitude: 16.873, rating: 4.8, address: "Via Argiro, 8", city: "Bari", categories: ["Vegetariano", "Bio"], image: "https://via.placeholder.com/150" },
  { id: 19, name: "EcoVeg", latitude: 41.122, longitude: 16.872, rating: 4.5, address: "Corso Vittorio Emanuele, 5", city: "Bari", categories: ["Vegan", "Senza Glutine"], image: "https://via.placeholder.com/150" },
  { id: 20, name: "Bari Organic Store", latitude: 41.121, longitude: 16.874, rating: 4.6, address: "Piazza Mercantile, 3", city: "Bari", categories: ["Bio", "Km0"], image: "https://via.placeholder.com/150" },
  { id: 21, name: "Gusto Vegetale", latitude: 41.118, longitude: 16.876, rating: 4.7, address: "Via Melo, 50", city: "Bari", categories: ["Vegetariano", "Senza Lattosio"], image: "https://via.placeholder.com/150" },
  { id: 22, name: "Il Bio Angolo", latitude: 41.119, longitude: 16.873, rating: 4.9, address: "Via De Rossi, 22", city: "Bari", categories: ["Bio", "Naturale"], image: "https://via.placeholder.com/150" },
  { id: 23, name: "Naturale e Sano", latitude: 41.116, longitude: 16.874, rating: 4.6, address: "Via Quintino Sella, 10", city: "Bari", categories: ["Senza Lattosio", "Km0"], image: "https://via.placeholder.com/150" },
  { id: 24, name: "Sapori Bio", latitude: 41.117, longitude: 16.871, rating: 4.8, address: "Via Amendola, 15", city: "Bari", categories: ["Bio", "Senza Glutine"], image: "https://via.placeholder.com/150" },
  { id: 25, name: "Sole e Natura", latitude: 41.118, longitude: 16.868, rating: 4.5, address: "Corso Cavour, 18", city: "Bari", categories: ["Vegetariano", "Km0"], image: "https://via.placeholder.com/150" },
  { id: 26, name: "Km0 Bari", latitude: 41.115, longitude: 16.869, rating: 4.7, address: "Piazza Garibaldi, 8", city: "Bari", categories: ["Km0", "Senza Glutine"], image: "https://via.placeholder.com/150" },
  { id: 27, name: "Bio Delizie", latitude: 41.120, longitude: 16.875, rating: 4.6, address: "Via Putignani, 25", city: "Bari", categories: ["Bio", "Senza Lattosio"], image: "https://via.placeholder.com/150" },
  { id: 28, name: "Natura e Gusto", latitude: 41.123, longitude: 16.877, rating: 4.5, address: "Piazza San Nicola, 12", city: "Bari", categories: ["Vegan", "Km0"], image: "https://via.placeholder.com/150" },
  { id: 29, name: "Veggie Bari", latitude: 41.114, longitude: 16.870, rating: 4.9, address: "Via Manzoni, 35", city: "Bari", categories: ["Vegetariano", "Bio"], image: "https://via.placeholder.com/150" },
  { id: 30, name: "Bio in Tavola", latitude: 41.112, longitude: 16.865, rating: 4.6, address: "Via Carulli, 40", city: "Bari", categories: ["Bio", "Vegan"], image: "https://via.placeholder.com/150" },
  { id: 31, name: "Vita Verde", latitude: 41.124, longitude: 16.871, rating: 4.7, address: "Via Venezia, 15", city: "Bari", categories: ["Senza Glutine", "Km0"], image: "https://via.placeholder.com/150" },
  { id: 32, name: "Green Taste", latitude: 41.122, longitude: 16.870, rating: 4.6, address: "Piazza Umberto I, 5", city: "Bari", categories: ["Bio", "Vegetariano"], image: "https://via.placeholder.com/150" },
  { id: 33, name: "Eco Bio Store", latitude: 41.119, longitude: 16.869, rating: 4.8, address: "Corso Vittorio Emanuele, 22", city: "Bari", categories: ["Bio", "Naturale"], image: "https://via.placeholder.com/150" },
  { id: 34, name: "Vegan Friendly", latitude: 41.120, longitude: 16.873, rating: 4.9, address: "Via Argiro, 50", city: "Bari", categories: ["Vegan", "Bio"], image: "https://via.placeholder.com/150" },
  { id: 35, name: "Sapori Senza Confini", latitude: 41.118, longitude: 16.867, rating: 4.8, address: "Via Sparano, 18", city: "Bari", categories: ["Km0", "Vegan"], image: "https://via.placeholder.com/150" },
  { id: 37, name: "Bio Fasano Market", latitude: 40.835000, longitude: 17.368500, rating: 4.2, address: "Via Bari 10", city: "Fasano", categories: ["Bio", "Vegetariano"], image: "https://via.placeholder.com/150" },
  { id: 38, name: "Green Fasano Bistro", latitude: 40.837000, longitude: 17.370000, rating: 4.8, address: "Via Lecce 15", city: "Fasano", categories: ["Bio", "Senza Glutine"], image: "https://via.placeholder.com/150" },
  { id: 39, name: "Fasano Organic Place", latitude: 40.830000, longitude: 17.362000, rating: 4.6, address: "Via Napoli 20", city: "Fasano", categories: ["Bio", "Km0"], image: "https://via.placeholder.com/150" },
  { id: 40, name: "Vegan Food Paradise", latitude: 40.832500, longitude: 17.365500, rating: 4.9, address: "Via Venezia 8", city: "Fasano", categories: ["Vegan", "Bio"], image: "https://via.placeholder.com/150" },
  { id: 41, name: "Fasano Healthy Haven", latitude: 40.836000, longitude: 17.371500, rating: 4.7, address: "Piazza Garibaldi", city: "Fasano", categories: ["Vegetariano", "Senza Lattosio"], image: "https://via.placeholder.com/150" },
];


// Funzione per calcolare la distanza tra due coordinate geografiche usando la formula dell'haversine
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Conversione dei gradi in radianti
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Raggio terrestre in km
  const dLat = toRad(lat2 - lat1); // Differenza di latitudine in radianti
  const dLon = toRad(lon2 - lon1); // Differenza di longitudine in radianti
  // Calcolo del quadrato della metà della corda sferica
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  // Calcolo dell'angolo centrale
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distanza in km
};


const Stores = () => {
  // Stato per memorizzare la posizione dell'utente
  const [userPosition, setUserPosition] = useState([41.1039637, 16.878227]);
  // Stato per memorizzare il centro attuale della mappa
  const [mapCenter, setMapCenter] = useState([41.1039637, 16.878227]);
  // Stato per i negozi vicini al centro della mappa
  const [stores, setStores] = useState([]);
  // Stato per memorizzare l'id del negozio selezionato
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  // Stato per memorizzare i negozi ordinati per distanza (dal centro o dal negozio selezionato)
  const [sortedStores, setSortedStores] = useState([]);

  const [zoomLevel, setZoomLevel] = useState("13");
  // Effetto che si attiva ogni volta che cambia il centro della mappa
  useEffect(() => {

    let maxDistance;

    if (zoomLevel >= 16) {
      maxDistance = 1;
    } else if (zoomLevel >= 15) {
      maxDistance = 2;
    } else if (zoomLevel >= 14) {
      maxDistance = 3;
    } else if (zoomLevel >= 13) {
      maxDistance = 5;
    } else if (zoomLevel >= 10) {
      maxDistance = 100;
    } else {
      maxDistance = 150;
    }

    const nearbyStores = allStores
      .map((store) => ({
        ...store, // Copia i dati del negozio
        distanceFromCenter: calculateDistance(
          mapCenter[0], // Latitudine del centro
          mapCenter[1], // Longitudine del centro
          store.latitude, // Latitudine del negozio
          store.longitude // Longitudine del negozio
        ), // Calcola la distanza tra il centro e il negozio
        distance: calculateDistance(
          userPosition[0], // Latitudine dell'utente
          userPosition[1], // Longitudine dell'utente
          store.latitude, // Latitudine del negozio
          store.longitude // Longitudine del negozio
        ), // Calcola la distanza tra l'utente e il negozio
      }))
      .filter((store) => store.distanceFromCenter <= maxDistance) // Ritorna solo i negozi entro la distanza massima dal centro
      .sort((a, b) => a.distanceFromCenter - b.distanceFromCenter); // Ordina per distanza dal centro

    setStores(nearbyStores); // Aggiorna lo stato dei negozi vicini
    setSortedStores(nearbyStores); // Aggiorna lo stato dei negozi ordinati


  }, [mapCenter, zoomLevel]); // Dipendenza: mapCenter (si aggiorna quando cambia)





  // Funzione per gestire il clic su un negozio (aggiorna lo stato del negozio selezionato)
  const handleStoreClick = (id) => {
    console.log("sad", id);
  };


  const handleMapZoom = (zoomLevel) => {
    console.log("Livello di zoom aggiornato:", zoomLevel);
    setZoomLevel(zoomLevel);
  };

  // Funzione per gestire lo spostamento della mappa (aggiorna il centro della mappa)
  const handleMapMove = (newCenter) => {
    console.log("Nuovo centro mappa:", newCenter); // Log del nuovo centro della mappa
    setMapCenter(newCenter); // Aggiorna lo stato del centro della mappa
    console.log("posizione utente", userPosition);
  };

  const orderNames = ["Nome", "Rilevanza", "Valutazione"];
  const filterNames = ["Bio", "Senza Lattosio", "Senza Glutine", "Vegetariano", "Vegan", "Km0"];

  return (
    <div>
      <div className="shops-header">
        <h1>Negozi</h1>
      </div>
      <div className="shop-header">
        <div className="searchBar">
          <SearchBar />
        </div>
        <div className="filterButton">
          <ButtonFilter order={orderNames} filter={filterNames} type="ConA, Neg" />
        </div>
      </div>

      {/* Wrapper per la mappa */}
      <div className="map-wrapper">
        <div className="map-container">
          <MapComponent
            userPosition={userPosition} // Passa la posizione dell'utente al componente mappa
            stores={stores} // Passa i negozi vicini al componente mappa
            onStoreClick={handleStoreClick} // Funzione da chiamare quando si clicca su un negozio
            onMapMove={handleMapMove} // Funzione da chiamare quando la mappa si sposta
            onMapZoom={handleMapZoom} // Funzione per aggiornare il livello di zoom
          />
        </div>
      </div>
      <div className="svg-divider-shops">
        <svg width="100%" height="2" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="1" x2="100%" y2="1" stroke="#CAC4D0" />
        </svg>
      </div>

      <div className="cards-shop-container">
        <CardLongList
          /*title={selectedStoreId
            ? `Negozi Vicini a "${stores.find((store) => store.id === selectedStoreId)?.name}"`
            : "Negozi Vicini al Centro della Mappa"} */
          shops={sortedStores}
          type="shop"
        />
      </div>
    </div>
  );
};

export default Stores


/*
quando fai richiesta al db, fai richiesta con cordinate di ne4j, per vicinanza, ma metti limite di quantita negozi dopo aver ordinato

Quando cerchi un negozio, da quary fai restituire coordinate e non direttamente negozio

Se riesci, quando clicchi negozio su lista, ti appare in mappa
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