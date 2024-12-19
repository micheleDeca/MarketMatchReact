import React from "react";
import Label from "../CategoryLabel/CategoryLabel";
import "./CategoryLabelList.css";

/* PASSARE SOLO LISTE */

const BadgeContainer = (props) => {
  const badges = props.badges || []; // Usa un array vuoto se props.badges è null o undefined

  // Mappa dei colori predefiniti per le categorie
  const categoryColors = {
    bio: "#4caf50",
    "senza lattosio": "#039be5",
    vegan: "#0adea5",
    "senza glutine": "#9c27b0",
    km0: "#cddc39",
    vegetariano: "#ff9800",
    default: "#607d8b", // Colore di default se la categoria non è nella mappa
  };

  // Funzione per ottenere il colore in base al testo normalizzato
  const getColorForCategory = (category) => {
    if (typeof category !== "string") {
      console.warn("Categoria non valida:", category); // Log per debugging
      return categoryColors.default;
    }
    const normalizedCategory = category.trim().toLowerCase();
    return categoryColors[normalizedCategory] || categoryColors.default;
  };

  return (
    <div className="badge-container">
      {badges
        .filter((badge) => typeof badge === "string") // Filtra solo le stringhe valide
        .map((badge, index) => (
          <Label
            key={index}
            category={badge} // Passa il testo dell'etichetta
            color={getColorForCategory(badge)} // Calcola il colore dinamicamente
          />
        ))}
    </div>
  );
};

export default BadgeContainer;
