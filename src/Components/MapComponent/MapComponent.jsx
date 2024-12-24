import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import "leaflet.markercluster";

import "./MapComponent.css";
import MarkerCluster from "./Component/MarkerCluster";
import MapEvents from "./Component/MapEvents";


const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149059.png", // URL dell'icona
  iconSize: [30, 30], // Dimensioni dell'icona
});

  


// Componente principale della mappa
const MapComponent = ({ userPosition, stores, onStoreClick, onMapMove, onMapZoom }) => {

  // Funzione per gestire azioni sui marker
  const handleMarkerAction = (shopId) => {
    onStoreClick(shopId);
  };
  const [mapPositiona, setMapPositiona] = useState([41.1039637, 16.878227]);

  const mapPosition = (a) => {
    setMapPositiona(a);
  };


  return (
    <MapContainer
      center={userPosition} // Centro iniziale della mappa
      zoom={14} // Livello di zoom iniziale
      style={{ height: "50vh", width: "100%", }} // Dimensioni della mappa
    >

      {/* Layer della mappa */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      {/* Marker cluster */}
      <MarkerCluster
        stores={stores} // Negozi da visualizzare
        userPosition={userPosition} // Posizione dell'utente
        onMarkerAction={handleMarkerAction}

      />
      {/* Marker per la posizione dell'utente */}
      {false && (<Marker position={mapPositiona} icon={userIcon}>
      </Marker>)}

      <Marker position={userPosition} icon={userIcon}>
        <Tooltip permanent direction="top">
          La tua posizione

        </Tooltip>
      </Marker>

      {/* Eventi della mappa */}
      <MapEvents onMapMove={onMapMove} mapPosition={mapPosition} mapZoom={onMapZoom} />

    </MapContainer>
  );
};

export default MapComponent;
