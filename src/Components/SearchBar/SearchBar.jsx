import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import "./SearchBar.css";
import SearchIcon from './search.svg';

/**
 * A component that displays a search bar with a menu icon and a search icon.
 *
 * @component
 * @returns {JSX.Element} A search bar component with input and accompanying icons.
 */

function SearchBar(props) {

  const type = props.type;

  // Stato per inputValue e address
  const [inputValue, setInputValue] = useState("");
  const [address, setAddress] = useState('');

  const handleSearchClick = async () => {
    if (type === "posizione") {
      if (!address) {
        setError("Inserisci un indirizzo valido");
        return;
      }
      await fetchCoordinates();
    } else {
      props.onStateChange("searchName", inputValue);
    }
  };

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

    // Esegui quando le coordinate cambiano
    useEffect(() => {
      if (coordinates) {
        // Passa le coordinate solo quando sono state aggiornate
        props.onStateChange('userLatitude', coordinates.lat);
        props.onStateChange('userLongitude', coordinates.lon);
      }
    }, [coordinates, props]); // Trigger quando 'coordinates' cambia

  return (
    <>
      <div className="SearchBarBox">
        <input type="text" className="SearchBarInput" placeholder={props.placeholder || "Cerca..."}
          value={type === "posizione" ? address : inputValue}
          onChange={(e) =>
            type === "posizione"
              ? setAddress(e.target.value)
              : setInputValue(e.target.value)
          } />
        <img src={SearchIcon} alt="search" className="SearchBarImg" onClick={handleSearchClick} />
      </div>

      {type === "posizione" && (
        <>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

          {coordinates && (
            <div style={{ marginTop: '20px' }}>
              <h3>Coordinate trovate:</h3>
              <p>Latitudine: {coordinates.lat}</p>
              <p>Longitudine: {coordinates.lon}</p>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default SearchBar;