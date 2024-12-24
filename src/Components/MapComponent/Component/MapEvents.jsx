import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapEvents = ({ onMapMove, mapPosition, mapZoom }) => {
    const map = useMap();

    useEffect(() => {
        const handleMapMoveEnd = () => {
            const center = map.getCenter(); // Ottieni il centro effettivo della mappa
            const mapSize = map.getSize(); // Ottieni le dimensioni della mappa in pixel

            // Calcola il centro visibile (spostato verso il basso)
            const visibleCenter = map.containerPointToLatLng([
                mapSize.x / 2, // Centro orizzontale
                mapSize.y / 3, // Sposta il centro verticale (1/3 dall'alto)
            ]);

            // Imposta il nuovo centro visibile
            mapPosition(visibleCenter);
            mapZoom(map.getZoom());
            onMapMove([visibleCenter.lat, visibleCenter.lng]); // Passa le coordinate del nuovo centro visibile
        };

        map.on("moveend", handleMapMoveEnd); // L'evento moveend viene associato alla mappa per rilevare quando l'utente ha terminato lo spostamento.

        return () => {
            map.off("moveend", handleMapMoveEnd); // Quando il componente viene smontato o le dipendenze cambiano, l'evento viene rimosso con map.off.
        };
    }, [map, onMapMove, mapZoom]); // Dipendenze dell'effetto

    return null; // Non renderizza nulla direttamente
};

export default MapEvents;
