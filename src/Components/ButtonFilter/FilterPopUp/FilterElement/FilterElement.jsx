import { useState } from 'react';
import './FilterElement.css'

export default function FilterElement({ name }) {

    const [backgroundColor, setBackgroundColor] = useState("#e7ca86"); // Stato per il colore di sfondo

    // Funzione per gestire il clic e cambiare il colore
    const handleClick = () => {
        setBackgroundColor(backgroundColor === "#e7ca86" ? "#7f7b72" : "#e7ca86");
    };

    return (
        <button className="element" onClick={handleClick} style={{ backgroundColor }} >
            {name}
        </button>
    )
}