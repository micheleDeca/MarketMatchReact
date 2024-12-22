import React, { useState } from 'react'
import './Card.css'
import { Link } from 'react-router';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import CostIcon from '../Card/assets/costo.svg';
import DifficultyIcon from '../Card/assets/difficolta.svg';
import CookingTimeIcon from '../Card/assets/tempoCottura.svg';
import PreparationTimeIcon from '../Card/assets/tempoPreparazione.svg';

/**
 * 
 * @prop {string} image - L'URL dell'immagine del prodotto. (es. "https://example.com/prodotto.jpg")
 * @prop {string} name - Il nome del prodotto. (es. "Pane Integrale")
 * @prop {string} detail - Una descrizione dettagliata del prodotto. (es. "Pane integrale fatto con grano biologico")
 * @prop {number} price - Il prezzo del prodotto. (es. 4.50)
 * @prop {string} button - Il testo del pulsante associato al prodotto. (es. "Aggiungi al carrello")
 * @prop {boolean|string} straight - Se `true`, il layout è in modalità colonna (verticale). Se "false" o assente, il layout è orizzontale.
 * 
 * Esempio di utilizzo:
 * <ProductCard 
 *   image="https://example.com/prodotto.jpg" 
 *   name="Pane Integrale" 
 *   detail="Pane integrale fatto con grano biologico" 
 *   price={4.50} 
 *   button="Aggiungi al carrello" 
 *   straight={true} 
 * />
 */

/*
Tipologia Card (type)
-product
-recipe
*/

const Card = (props) => {

    const isProduct = props.type === "product";

    const handleAddClick = () => {

        console.log("prodotto: " + props.id + " aggiunto nel carrello");
        setNotification(`${props.name} è stato aggiunto al carrello`);

        // Rimuovi la notifica dopo 3 secondi
        setTimeout(() => {
            setNotification(null);
        }, 2000);
    };

    // Mappa dei colori per le categorie
    const categoryColors = {
        bio: "#4caf50",
        "senza lattosio": "#039be5",
        vegan: "#0adea5",
        "senza glutine": "#9c27b0",
        km0: "#cddc39",
        vegetariano: "#ff9800",
        default: "#607d8b", // Colore di default se la categoria non è nella mappa
    };

    // Funzione per ottenere il colore della categoria
    const getColorForCategory = (category) => {
        return categoryColors[category.toLowerCase()] || categoryColors.default;
    };

    const [notification, setNotification] = useState(null); // Stato per la notifica


    const straightContent = props.straight === true;
    return (
        <>
            <div
                className="card"
                style={{
                    flexDirection: props.straight === "false" ? "" : "column",
                }}
            >
                <Link to={isProduct? `/prodotto/${props.id}` : `/ricetta/${props.id}`} className="product-link">
                    <img className="card-image" src={props.image} />
                </Link>

                <div className="card-info">
                    <Link
                        to={isProduct? `/prodotto/${props.id}` : `/ricetta/${props.id}`}  className="product-link">
                        <h3 className="card-name">{props.name}</h3>
                    </Link>

                    {/* Sezione categorie */}
                    {props.categories && props.categories.length > 0 && (
                        <div className="category-icons">
                            {props.categories.map((category, index) => (
                                <span
                                    key={index}
                                    className="category-dot"
                                    style={{ backgroundColor: getColorForCategory(category) }}
                                    data-tooltip-id={`tooltip-${props.id}-${index}`}
                                    data-tooltip-content={category}
                                ></span>
                            ))}
                        </div>
                    )}

                    <p className="card-detail">{props.detail}</p>
                    <p className="price-container-card">{props.originalPrice ? (
                        <>
                            <span className="current-price-card">{props.currentPrice}</span>
                            <span className="original-price-card">{props.originalPrice}</span>
                        </>
                    ) : (
                        <span className="normal-price-card">{props.currentPrice}</span>
                    )}</p>

                    {!isProduct && (<div className='recipe-icon-container'>
                        <div className="card-recipe-icon-text">
                            <span className='icon-recipe' data-tooltip-id={`cost-tooltip`} data-tooltip-content="Costo"><img src={CostIcon}/></span><span className='text-icon-recipe' >: {props.cost}</span>
                            <span className='icon-recipe' data-tooltip-id={`difficulty-tooltip`} data-tooltip-content="Difficoltà"><img src={DifficultyIcon} /></span><span className='text-icon-recipe' >: {props.difficulty}</span>
                        </div>
                        <div className="card-recipe-icon-text">
                            <span className='icon-recipe' data-tooltip-id={`prepTime-tooltip`} data-tooltip-content="Tempo di preparazione"><img src={PreparationTimeIcon} /></span><span className='text-icon-recipe' >: {props.prepTime}</span>
                            <span className='icon-recipe' data-tooltip-id={`cookTime-tooltip`} data-tooltip-content="Tempo di cottura"><img src={CookingTimeIcon} /></span><span className='text-icon-recipe' >: {props.cookTime}</span>
                        </div>
                    </div>)}
                    {props.button ? (<button className="card-button" onClick={handleAddClick}>{props.button}</button>) : ""}

                </div>
            </div>

            {/* Tooltip associato alle icone */}
            <Tooltip id={`cost-tooltip`} place="top" />
            <Tooltip id={`difficulty-tooltip`} place="top" />
            <Tooltip id={`prepTime-tooltip`} place="top" />
            <Tooltip id={`cookTime-tooltip`} place="top" />

            {/* Tooltip associato alle categorie */}
            {props.categories &&
                props.categories.map((category, index) => (
                    <Tooltip
                        key={index}
                        id={`tooltip-${props.id}-${index}`}
                        place="top"
                        style={{
                            backgroundColor: "#1e1e1e",
                            color: "#ffffff",
                            fontSize: "12px",
                            borderRadius: "4px",
                            padding: "5px 10px",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                        }}
                    />
                ))}

            {/* Popup di notifica */}
            {notification && (
                <div className="notification-popup">
                    {notification}
                </div>
            )}

        </>
    )
}

export default Card
