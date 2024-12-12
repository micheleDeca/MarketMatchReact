import React from "react";
import Label from "../CategoryLabel/CategoryLabel";
import "./CategoryLabelList.css";

/* 
* @prop {Array<Object>} badges - Un array di oggetti che rappresentano le etichette/categorie. Ogni oggetto deve contenere:
*    - {string} text - Il testo dell'etichetta. (es. "Biologico")
*    - {string} backgroundColor - Il colore di sfondo dell'etichetta. (es. "#4CAF50")
*/

const BadgeContainer = (props) => {
  // Lista di badge con testo e colori
  /*const badges = [
    { text: "Bio", backgroundColor: "#4caf50" },
    { text: "Senza lattosio", backgroundColor: "#039be5" },
    { text: "Bio", backgroundColor: "#4caf50" },
   
    // Aggiungi altri badge qui...
  ]; */


  return (
    <div className="badge-container">
      {props.badges.map((badge, index) => (
        <Label key={index} category={badge.text} color={badge.backgroundColor} />
          //Key necessaria per aiutare react a renderizzare liste di elementi, ottimizzando il processo di aggiornametno del dom
      ))}
    </div>
  );
};
 
export default BadgeContainer;
