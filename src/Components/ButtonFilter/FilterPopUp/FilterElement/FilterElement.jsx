import { useState } from 'react';
import './FilterElement.css'

export default function FilterElement({ name }) {

    const categoryColors = {
        bio: "#4caf50",
        "senza lattosio": "#039be5",
        vegan: "#0adea5",
        "senza glutine": "#9c27b0",
        km0: "#cddc39",
        vegetariano: "#ff9800",
        default: "#93d7a4", // Colore di default se la categoria non è nella mappa
    };

    const getColorForCategory = (category) => {
        if (typeof category !== "string") {
            console.warn("Categoria non valida:", category); // Log per debugging
            return categoryColors.default;
        }
        const normalizedCategory = category.trim().toLowerCase();
        return categoryColors[normalizedCategory] || categoryColors.default;
    };

    const [backgroundColor, setBackgroundColor] = useState(getColorForCategory(name)); // Stato per il colore di sfondo

    // Funzione per gestire il clic e cambiare il colore
    const handleClick = () => {
        setBackgroundColor((backgroundColor != "#7f7b72")? "#7f7b72" : getColorForCategory(name));
    };

   


    return (
        <div className="element" onClick={handleClick} style={{
            backgroundColor: backgroundColor}} >
            {name}
        </div>
    )
}