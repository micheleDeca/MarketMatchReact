import React from "react";
import Label from "../CategoryLabel/CategoryLabel";
import "./CategoryLabelList.css";

const BadgeContainer = () => {
  // Lista di badge con testo e colori
  const badges = [
    { text: "Bio", backgroundColor: "#4caf50" },
    { text: "Senza lattosio", backgroundColor: "#039be5" },
    { text: "Bio", backgroundColor: "#4caf50" },
   
    // Aggiungi altri badge qui...
  ];

  //Key necessaria per aiutare react a renderizzare liste di elementi, ottimizzando il processo di aggiornametno del dom

  return (
    <div className="badge-container">
      {badges.map((badge, index) => (
        <Label key={index} category={badge.text} color={badge.backgroundColor} />
      ))}
    </div>
  );
};
 
export default BadgeContainer;
