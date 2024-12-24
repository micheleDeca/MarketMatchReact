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
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149059.png",
  iconSize: [30, 30],
});

// Componente per spostare la mappa
const ResetViewButton = ({ userPosition }) => {
  const map = useMap();

  const handleResetView = () => {
    map.setView(userPosition, 14);
  };

  return (
    <button className="reset-view-button" onClick={handleResetView}>
      <span className="reset-view-icon">🏠</span>
    </button>
  );
};

// Componente principale della mappa
const MapComponent = ({ userPosition, stores, onStoreClick, onMapMove, onMapZoom }) => {
  const handleMarkerAction = (shopId) => {
    onStoreClick(shopId);
  };

  const [mapPositiona, setMapPositiona] = useState([41.1039637, 16.878227]);

  const mapPosition = (a) => {
    setMapPositiona(a);
  };

  return (
    <div>
      <MapContainer
        center={userPosition}
        zoom={14}
        style={{ height: "50vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MarkerCluster
          stores={stores}
          userPosition={userPosition}
          onMarkerAction={handleMarkerAction}
        />

        <Marker position={userPosition} icon={userIcon}>
          <Tooltip direction="top" offset={[0, -10]} className="custom-tooltip">
            <span>📍 Sei qui</span>
          </Tooltip>
        </Marker>

        <MapEvents onMapMove={onMapMove} mapPosition={mapPosition} mapZoom={onMapZoom} />

        {/* Bottone Torna alla Home */}
        <ResetViewButton userPosition={userPosition} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
