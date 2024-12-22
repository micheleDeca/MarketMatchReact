import React, { useState, useEffect } from "react";
import MapComponent from "../../../Components/MapComponent/MapComponent";
import "./TestMichele.css";
// Simulazione del database di negozi

// Simulazione del database di negozi: un array di oggetti rappresenta i negozi
// con informazioni come id, nome, posizione geografica (latitudine, longitudine),
// punteggio (rating), indirizzo e categorie di appartenenza.
const allStores = [
  { id: 1, name: "Vegan Café La Sorgente", latitude: 41.114045, longitude: 16.876462, rating: 4.5, address: "Via Roma 10", city: "Bari", categories: ["Vegan", "Bio"] },
  { id: 2, name: "Green Bites Bistro", latitude: 41.110936, longitude: 16.875983, rating: 4.2, address: "Piazza Garibaldi 15", city: "Bari", categories: ["Vegetariano", "Bio"] },
  { id: 3, name: "Bio & Veg Restaurant", latitude: 41.113334, longitude: 16.874922, rating: 4.8, address: "Corso Vittorio Emanuele 22", city: "Bari", categories: ["Bio", "Vegan", "Km0"] },
  { id: 4, name: "Alberto's Vegan Corner", latitude: 41.112027, longitude: 16.873967, rating: 4.7, address: "Via Sparano 5", city: "Bari", categories: ["Vegan", "Km0"] },
  { id: 5, name: "Vegano e Basta", latitude: 41.110499, longitude: 16.877562, rating: 4.3, address: "Viale della Repubblica 8", city: "Bari", categories: ["Vegan", "Vegetariano"] },
  { id: 6, name: "EcoVeg", latitude: 41.113789, longitude: 16.878658, rating: 4.6, address: "Via Manzoni 12", city: "Bari", categories: ["Bio", "Senza Glutine"] },
  { id: 7, name: "La Casa del Vegan", latitude: 41.114804, longitude: 16.878029, rating: 4.4, address: "Piazza Umberto 1", city: "Bari", categories: ["Vegan", "Km0"] },
  { id: 8, name: "Vegano Ristorante Zero", latitude: 41.115642, longitude: 16.876934, rating: 4.9, address: "Via Melo 20", city: "Bari", categories: ["Vegan", "Bio"] },
  { id: 9, name: "Vegan Food Love", latitude: 41.116022, longitude: 16.879125, rating: 4.1, address: "Via Dante 45", city: "Bari", categories: ["Bio", "Vegan", "Sostenibile"] },
  { id: 10, name: "Green Vegan Paradise", latitude: 41.111264, longitude: 16.880321, rating: 4.3, address: "Via Capruzzi 11", city: "Bari", categories: ["Vegetariano", "Bio"] },
  { id: 11, name: "Organic Planet", latitude: 41.117854, longitude: 16.882112, rating: 4.8, address: "Via Napoli 30", city: "Bari", categories: ["Bio", "Km0"] },
  { id: 12, name: "Nature's Gift Market", latitude: 41.112345, longitude: 16.879432, rating: 4.6, address: "Via Amendola 17", city: "Bari", categories: ["Km0", "Senza Glutine"] },
  { id: 13, name: "Zero Waste Haven", latitude: 41.111785, longitude: 16.877543, rating: 4.5, address: "Via Caracciolo 7", city: "Bari", categories: ["Vegan", "Bio"] },
  { id: 14, name: "Vegan Delight", latitude: 41.113567, longitude: 16.873890, rating: 4.7, address: "Via Quasimodo 9", city: "Bari", categories: ["Vegan", "Senza Lattosio"] },
  { id: 15, name: "Gluten-Free Haven", latitude: 41.109123, longitude: 16.876789, rating: 4.6, address: "Via Piccinni 30", city: "Bari", categories: ["Senza Glutine", "Km0"] },
  { id: 16, name: "Latte-Free Delight", latitude: 41.108954, longitude: 16.874563, rating: 4.4, address: "Via Sparano 12", city: "Bari", categories: ["Senza Lattosio", "Bio"] },
  { id: 17, name: "Healthy Bites", latitude: 41.115345, longitude: 16.873890, rating: 4.2, address: "Via Cavour 18", city: "Bari", categories: ["Vegetariano", "Km0"] },
  { id: 18, name: "The Vegan Table", latitude: 41.114678, longitude: 16.878123, rating: 4.8, address: "Via Dante 50", city: "Bari", categories: ["Vegan", "Senza Lattosio"] },
  { id: 19, name: "BioVita Market", latitude: 41.116890, longitude: 16.877432, rating: 4.9, address: "Via Garruba 23", city: "Bari", categories: ["Bio", "Km0"] },
  { id: 20, name: "Vegan & Gluten-Free Hub", latitude: 41.118234, longitude: 16.876120, rating: 4.7, address: "Via Napoli 45", city: "Bari", categories: ["Vegan", "Senza Glutine"] },
  // Negozi nella zona di Fasano
  { id: 21, name: "Fasano Vegan Spot", latitude: 40.9793809, longitude: 17.366667, rating: 4.5, address: "Via Roma 5", city: "Fasano", categories: ["Vegan", "Km0"] },
  { id: 22, name: "Bio Fasano Market", latitude: 40.835000, longitude: 17.368500, rating: 4.2, address: "Via Bari 10", city: "Fasano", categories: ["Bio", "Vegetariano"] },
  { id: 23, name: "Green Fasano Bistro", latitude: 40.837000, longitude: 17.370000, rating: 4.8, address: "Via Lecce 15", city: "Fasano", categories: ["Bio", "Senza Glutine"] },
  { id: 24, name: "Fasano Organic Place", latitude: 40.830000, longitude: 17.362000, rating: 4.6, address: "Via Napoli 20", city: "Fasano", categories: ["Bio", "Km0"] },
  { id: 25, name: "Vegan Food Paradise", latitude: 40.832500, longitude: 17.365500, rating: 4.9, address: "Via Venezia 8", city: "Fasano", categories: ["Vegan", "Bio"] },
  { id: 26, name: "Fasano Healthy Haven", latitude: 40.836000, longitude: 17.371500, rating: 4.7, address: "Piazza Garibaldi", city: "Fasano", categories: ["Vegetariano", "Senza Lattosio"] },
];


// Funzione per calcolare la distanza tra due coordinate geografiche usando la formula dell'haversine
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180; // Conversione dei gradi in radianti
  const R = 6371; // Raggio terrestre in km
  const dLat = toRad(lat2 - lat1); // Differenza di latitudine in radianti
  const dLon = toRad(lon2 - lon1); // Differenza di longitudine in radianti
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2); // Calcolo del quadrato della metà della corda sferica
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Calcolo dell'angolo centrale
  return R * c; // Distanza in km
};

// Funzione per filtrare i negozi vicini a una posizione specifica entro una distanza massima (5 km per default)
const fetchStoresNearby = (center, maxDistance = 5) => {
  return allStores
    .map((store) => ({
      ...store,
      distance: calculateDistance(
        center[0], // Latitudine del centro
        center[1], // Longitudine del centro
        store.latitude, // Latitudine del negozio
        store.longitude // Longitudine del negozio
      ),
    }))
    .filter((store) => store.distance <= maxDistance); // Filtra i negozi entro la distanza massima
};

// Componente principale
const TestMichele = () => {
  // Stato per la posizione dell'utente
  const [userPosition, setUserPosition] = useState([41.1039637, 16.878227]);

  // Stato per il centro della mappa
  const [mapCenter, setMapCenter] = useState([41.1039637, 16.878227]);

  // Stato per i negozi vicini al centro della mappa
  const [stores, setStores] = useState([]);

  // Stato per l'id del negozio selezionato
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  // Stato per i negozi ordinati in base alla distanza dal negozio selezionato
  const [sortedStores, setSortedStores] = useState([]);

  // Effetto per aggiornare i negozi vicini ogni volta che il centro della mappa cambia
  useEffect(() => {
    const nearbyStores = fetchStoresNearby(mapCenter, 5); // Filtra negozi entro 5 km
    setStores(nearbyStores);
  }, [mapCenter]); // Dipendenza: mapCenter

  // Funzione per gestire il click su un negozio e aggiornare lo stato
  const handleStoreClick = (id) => {
    setSelectedStoreId(id);
  };

  // Effetto per calcolare i negozi ordinati per distanza dal negozio selezionato
  useEffect(() => {
    if (selectedStoreId) {
      const selectedStore = stores.find((store) => store.id === selectedStoreId); // Trova il negozio selezionato
      if (selectedStore) {
        const nearbyStores = stores
          .filter((store) => store.id !== selectedStoreId) // Escludi il negozio selezionato
          .map((store) => ({
            ...store,
            distance: calculateDistance(
              selectedStore.latitude,
              selectedStore.longitude,
              store.latitude,
              store.longitude
            ),
          }))
          .sort((a, b) => a.distance - b.distance); // Ordina i negozi per distanza crescente
        setSortedStores(nearbyStores); // Aggiorna lo stato
      }
    } else {
      setSortedStores([]); // Resetta se non c'è un negozio selezionato
    }
  }, [selectedStoreId, stores]); // Dipendenze: selectedStoreId, stores

  // Funzione per gestire lo spostamento della mappa
  const handleMapMove = (newCenter) => {
    console.log("Nuovo centro mappa:", newCenter); // Log del nuovo centro
    setMapCenter(newCenter); // Aggiorna lo stato del centro della mappa
  };

  // Render del componente
  return (
    <div>
      {/* Componente della mappa */}
      <div className="map-wrapper">
      <div className="map-container">
      <MapComponent
        userPosition={userPosition} // Posizione dell'utente
        stores={stores} // Lista dei negozi vicini
        onStoreClick={handleStoreClick} // Funzione per il click su un negozio
        onMapMove={handleMapMove} // Funzione per lo spostamento della mappa
      />
      </div>
      </div>
      {/* Lista dei negozi ordinati */}
      <h2>Negozi Ordinati per Distanza {selectedStoreId}</h2>
      <ul>
        {sortedStores.map((store) => (
          <li key={store.id}>
            {store.name} - {store.distance.toFixed(2)} km
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestMichele;