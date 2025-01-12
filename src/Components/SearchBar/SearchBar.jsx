import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import "./SearchBar.css";
import SearchIcon from './search.svg';

/**
 * SearchBar is a reusable component for searching or entering an address to fetch geographic coordinates.
 * It supports two modes: "search" for general searches and "posizione" for fetching coordinates based on an address.
 *
 * @component
 * @param {Object} props - The props object for the SearchBar component.
 * @param {string} props.type - Determines the mode of the search bar:
 *   - `"search"`: For generic text searches.
 *   - `"posizione"`: For fetching geographic coordinates based on an address.
 * @param {string} [props.placeholder="Cerca..."] - The placeholder text for the input field.
 * @param {function} props.onStateChange - Callback function to pass updated state values to the parent component.
 *   - Arguments passed: (`key`, `value`) where `key` is the state name and `value` is the updated value.
 *
 * @returns {JSX.Element} A search bar component with optional geolocation functionality.
 *
 * @example
 * // Example usage of the SearchBar component
 * import SearchBar from './SearchBar';
 *
 * function App() {
 *   const handleStateChange = (key, value) => {
 *     console.log(`State changed: ${key} = ${value}`);
 *   };
 *
 *   return (
 *     <div>
 *       <h1>Search Bar Example</h1>
 *       <SearchBar
 *         type="posizione"
 *         placeholder="Inserisci indirizzo..."
 *         onStateChange={handleStateChange}
 *       />
 *     </div>
 *   );
 * }
 */

function SearchBar(props) {

  const type = props.type;

  // Stato per inputValue e address
  const [inputValue, setInputValue] = useState("");
  const [address, setAddress] = useState('');

  const handlePositionClick = async () => {
      if (!address) {
        setError("Inserisci un indirizzo valido");
        return;
      }
      await fetchCoordinates();
  };

  const handleSearchValue = (value) => {
    setInputValue(value);
    props.onStateChange('searchName', value);
  }

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
              : handleSearchValue(e.target.value)
          } />
        <img src={SearchIcon} alt="search" className="SearchBarImg" onClick={type === "posizione" ? handlePositionClick : null} />
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