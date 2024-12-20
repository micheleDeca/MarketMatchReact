import React from "react";
import "./CategoryLabel.css";

/**
 * 
 * @prop {string} category - Il testo da visualizzare sull'etichetta. (es. "Biologico")
 * @prop {string} color - Il colore di sfondo dell'etichetta. (es. "#4CAF50")
 * 
 * Esempio:
 * <Badge category="Biologico" color="#4CAF50" />
 */

const Badge = (props) => {

  const labelSizeSmall = false;
  const categoryColors = {
    bio: "#4caf50",
    "senza lattosio": "#039be5",
    vegan: "#0adea5",
    "senza glutine": "#9c27b0",
    km0: "#cddc39",
    vegetariano: "#ff9800",
    default: "darkslateblue", // Colore di default se la categoria non è nella mappa
  };

  const getColorForCategory = (category) => {
    if (typeof category !== "string") {
      console.warn("Categoria non valida:", category); // Log per debugging
      return categoryColors.default;
    }
    const normalizedCategory = category.trim().toLowerCase();
    return categoryColors[normalizedCategory] || categoryColors.default;
  };



  return (
    <div className="badge" style={{
      backgroundColor: getColorForCategory(props.category),
      "--badge-font-size": labelSizeSmall ? "12px" : "",
    }}>
      {props.category}
    </div>
  );
};

export default Badge;
