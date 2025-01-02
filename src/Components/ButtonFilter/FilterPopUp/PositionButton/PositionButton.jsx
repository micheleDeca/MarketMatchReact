import { useState } from "react";
import './PositionButton.css'

export default function PositionButton(props) {

  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {   // Controlla se il browser supporta l'API Geolocation
      setError("Geolocalizzazione non supportata dal browser.");
      return;
    }


    // Richiede la posizione dell'utente
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords; // Estrae latitudine e longitudine dall'oggetto position.coords
        setLocation({ latitude, longitude });
        setError(""); // Resetta eventuali errori
        props.onPosChange('userLatitude', latitude);
        props.onPosChange('userLongitude', longitude);
      },
      (err) => {
        setError("Consenti i permessi per la geolocalizzazione nel browser.");
      }
    );

  };


  return (
    <div>
      {!location &&
        <button onClick={handleGetLocation} className="buttPosition">Rileva Posizione</button>
      }

      {location && (
        <div className="posInfo">
          <h3>Posizione rilevata: </h3>
          <p>Latitudine: {location.latitude.toFixed(2)}</p>
          <p>Longitudine: {location.longitude.toFixed(2)}</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}
