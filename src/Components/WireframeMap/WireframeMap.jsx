import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./WireframeMap.css"; // Importa il file CSS separato

const WireframeMap = ({ latitude, longitude, storeName }) => {
  const googleMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  useEffect(() => {
    const map = L.map("wireframe-map", {
      center: [latitude, longitude],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map).bindPopup(storeName);

    // Distruggi la mappa al smontaggio del componente
    return () => {
      map.remove();
    };
  }, [latitude, longitude, storeName]);

  return (
    <div style={{ position: "relative", width: "100%", height: "200px" }}>
      {/* Mappa */}
      <div id="wireframe-map"></div>
      {/* Bottone per indicazioni */}
      <a
        href={googleMapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="get-directions-button"
      >
        Ottieni Indicazioni
      </a>
    </div>
  );
};

export default WireframeMap;
