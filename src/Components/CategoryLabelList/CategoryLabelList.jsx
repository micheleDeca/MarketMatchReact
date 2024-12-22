import React from "react";
import Label from "../CategoryLabel/CategoryLabel";
import "./CategoryLabelList.css";

/* PASSARE SOLO LISTE */

const BadgeContainer = (props) => {
  const badges = props.badges || []; // Usa un array vuoto se props.badges è null o undefined
  const size = props.size;
   

  return (
    <div className="badge-container">
      {badges
        .filter((badge) => typeof badge === "string") // Filtra solo le stringhe valide
        .map((badge, index) => (
          <Label
            key={index}
            category={badge} // Passa il testo dell'etichetta
            size={size}
          />
        ))}
    </div>
  );
};

export default BadgeContainer;
