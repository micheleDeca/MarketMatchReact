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

  return (
    <div className="badge" style={{
      backgroundColor: props.color,
      "--badge-font-size": labelSizeSmall ? "12px" : "",
    }}>
      {props.category}
    </div>
  );
};

export default Badge;
