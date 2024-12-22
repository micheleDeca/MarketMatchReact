import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import "leaflet.markercluster";
import ReactDOMServer from "react-dom/server";
import CategoryLabelList from "../CategoryLabelList/CategoryLabelList";
import "./MapComponent.css";

// Icona personalizzata per i marker
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854866.png", // URL dell'immagine dell'icona
  iconSize: [25, 25], // Dimensioni dell'icona
});

// Funzione per calcolare la distanza tra due coordinate geografiche
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180; // Conversione in radianti
  const R = 6371; // Raggio terrestre in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Formula dell'haversine
  return R * c; // Distanza in km
};

// Componente  utilizza il plugin Leaflet MarkerCluster per gestire automaticamente il raggruppamento 
// (clustering) di più marker su una mappa, rendendola piu leggibile
const MarkerCluster = ({ stores, userPosition, onMarkerAction }) => {
  const map = useMap(); // Hook di React Leaflet per accedere alla mappa corrente

  useEffect(() => { 
    const markers = L.markerClusterGroup({  // Creazione di un gruppo di cluster  
      maxClusterRadius: 50, // Distanza massima (in pixel) per raggruppare i marker
      disableClusteringAtZoom: 18  // Disabilita il clustering a livelli di zoom superiori a 18
    }); 

    // Per ogni negozio, Il componente itera attraverso l'array stores per creare un marker per ogni negozio.
    stores.forEach((store) => {
      const distance = calculateDistance(
        userPosition[0], // Latitudine dell'utente
        userPosition[1], // Longitudine dell'utente
        store.latitude, // Latitudine del negozio
        store.longitude // Longitudine del negozio
      );

      // Genera dinamicamente la lista delle categorie come stringa HTML
      const categoryListHTML = ReactDOMServer.renderToString(
        <CategoryLabelList badges={store.categories} size={"small"}/>
      );

      // Crea il marker per il negozio
      const marker = L.marker([store.latitude, store.longitude], { icon: customIcon });

      // Aggiungi un popup al marker con informazioni sul negozio
      marker.bindPopup(
        `<div>
          <b>${store.name}</b><br/>
          ⭐ <span>${store.rating}/5</span><br/>
          📍 <span>${store.address}, ${store.city}</span><br/>
          🚶‍♂️ <span>Distanza: ${distance.toFixed(2)} km</span><br/>
          ${categoryListHTML}
        </div>`,
        {
          autoClose: true, // Chiude automaticamente altri popup
          closeOnClick: false, // Non chiude il popup quando clicchi su di esso
        }
      ).on("popupopen", () => {
        console.log("Marker cliccato! ID negozio:", store.id);
        if (onMarkerAction) {
          onMarkerAction(store.id); // Restituisci solo l'ID
        }
      });
      
 
      markers.addLayer(marker); // Aggiungi il marker al cluster
    });

    map.addLayer(markers); // Aggiungi i cluster alla mappa

    // Pulizia: rimuovi i marker quando il componente si smonta o cambia
    return () => {
      map.removeLayer(markers);
    };
  }, [stores, userPosition, map, onMarkerAction]); // Dipendenze dell'effetto

  return null; // non renderizza nulla direttamente, ma modifica la mappa aggiungendo marker e cluster.
};

// Componente per gestire eventi della mappa,  si occupa di rilevare quando la mappa cambia posizione 
// (ad esempio, tramite trascinamento o spostamento del centro) e comunica le nuove coordinate del 
// centro della mappa al componente genitore tramite una callback (onMapMove).
const MapEvents = ({ onMapMove }) => {
  const map = useMap();

  useEffect(() => {
    const handleMapMoveEnd = () => {  //Quando l'utente trascina o sposta la mappa, l'evento moveend viene attivato.
      const center = map.getCenter(); // Ottieni il nuovo centro della mappa
      onMapMove([center.lat, center.lng]); // Passa le coordinate del nuovo centro
    };

    map.on("moveend", handleMapMoveEnd); // L'evento moveend viene associato alla mappa per rilevare quando l'utente ha terminato lo spostamento.

    return () => {
      map.off("moveend", handleMapMoveEnd); // Quando il componente viene smontato o le dipendenze cambiano, l'evento viene rimosso con map.off.
    };
  }, [map, onMapMove]); // Dipendenze dell'effetto

  return null; // Non renderizza nulla direttamente
};

// Componente principale della mappa
const MapComponent = ({ userPosition, stores, onStoreClick, onMapMove }) => {
  
  // Funzione per gestire azioni sui marker
  const handleMarkerAction = (shopId) => {
    console.log("Azione marker:", shopId); // Log dell'evento per debug
       onStoreClick(shopId); // Passa solo l'ID del negozio cliccato
   
  };

  return (
    <MapContainer
      center={userPosition} // Centro iniziale della mappa
      zoom={14} // Livello di zoom iniziale
      style={{ height: "100vh", width: "100%" }} // Dimensioni della mappa
    >
      {/* Layer della mappa */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
      />

      {/* Marker cluster */}
      <MarkerCluster
        stores={stores} // Negozi da visualizzare
        userPosition={userPosition} // Posizione dell'utente
        onMarkerAction={handleMarkerAction}

              />

      {/* Eventi della mappa */}
      <MapEvents onMapMove={onMapMove} />
    </MapContainer>
  );
};

export default MapComponent;
