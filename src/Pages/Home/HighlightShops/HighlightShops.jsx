import React from "react";
import "./HighlightShops.css";
import BadgeContainer from "../../../Components/CategoryLabelList/CategoryLabelList";

// Dati fittizi per i negozi (da sostituire con dati dinamici)
const shops = [
  {
    id: 1,
    image: "src/Pages/Home/HighlightShops/assetsMomentaneo/ShopTest1.webp", // Immagine segnaposto
    name: "Negozio Bio Locale",
    description: "Prodotti biologici e freschi direttamente dalla tua zona.",
    city: "Bari",
    distance: "2 km",
    category: ["Biologico"],
  },
  {
    id: 2,
    image: "src/Pages/Home/HighlightShops/assetsMomentaneo/ShopTest2.webp",
    name: "Gourmet Vegan",
    description: "Cucina gourmet vegan con ingredienti selezionati.",
    city: "Milano",
    distance: "5 km",
    category: ["Vegan","Bio"],
  },
  {
    id: 3,
    image: "src/Pages/Home/HighlightShops/assetsMomentaneo/ShopTest3.webp",
    name: "Emporio Senza Glutine",
    description: "Ampia scelta di prodotti senza glutine per ogni occasione.",
    city: "Roma",
    distance: "8 km",
    category: ["Senza Glutine"],
  },
];

 

const HighlightShops = () => {
  return (
    <>
    <a className="section-title-high-shop">I NOSTRI MIGLIORI NEGOZI {String.fromCharCode(0x25B6)}</a>
            <div className="svg-divider">
                <svg width="100%" height="2" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="1" x2="100%" y2="1" stroke="#CAC4D0" />
                </svg>
            </div>
    <div className="shops-container">
      {shops.map((shop) => (
        <div className="shop-box" key={shop.id}>
          <img src={shop.image} alt={shop.name} className="shop-image" />
          <div className="shop-content">
            <h3 className="shop-name">{shop.name}</h3>
            <p className="shop-description">{shop.description}</p>
            <p className="shop-location">
              {shop.city} • {shop.distance}
            </p>
             <div className="shop-category"><BadgeContainer badges={shop.category}/></div>
            <button className="shop-button">Scopri di più</button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default HighlightShops;
