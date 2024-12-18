import { useState } from 'react';
import './FilterElement.css'

export default function FilterElement({name}){

    const [backgroundColor, setBackgroundColor] = useState("blue"); // Stato per il colore di sfondo

    // Funzione per gestire il clic e cambiare il colore
    const handleClick = () => {
        setBackgroundColor(backgroundColor === "blue" ? "#007BFF" : "blue");
    };

    return( 
    <input type="button" value={name} className="element" onClick={handleClick} style={{ backgroundColor }}  />
    )
}