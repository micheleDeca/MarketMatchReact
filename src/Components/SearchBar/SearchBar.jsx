import { useState } from "react";
import "./SearchBar.css";
import SearchIcon from './search.svg';

/**
 * A component that displays a search bar with a menu icon and a search icon.
 *
 * @component
 * @returns {JSX.Element} A search bar component with input and accompanying icons.
 */

function SearchBar(props) {

  const [inputValue, setInputValue] = useState("");

    // Funzione per gestire il cambiamento dell'input
    const handleInputChange = (event) => {
        setInputValue(event.target.value); // Aggiorna lo stato con il valore corrente dell'input
        console.log("Valore aggiornato:", event.target.value); // Stampa in console per debug
    };

  return (
    <>
      <div className="SearchBarBox">
        <input type="text" className="SearchBarInput" placeholder={props.placeholder || "Cerca..."} value={inputValue} 
         onChange={handleInputChange}/>
        <img src={SearchIcon} alt="search" className="SearchBarImg"/>
      </div>
    </>
  );
}

export default SearchBar;