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
  return (
    <div className="badge" style={{ backgroundColor : props.color }}>
      {props.category}
    </div>
  );
};

export default Badge;
