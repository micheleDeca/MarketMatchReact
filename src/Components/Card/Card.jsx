import React, { useState } from 'react'
import './Card.css'
import { Link } from 'react-router';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import CostIcon from '../Card/assets/costo.svg';
import DifficultyIcon from '../Card/assets/difficolta.svg';
import CookingTimeIcon from '../Card/assets/tempoCottura.svg';
import PreparationTimeIcon from '../Card/assets/tempoPreparazione.svg';
import { useCategoryContext } from "../../Context/CategoryContex";
import { useNavigate } from "react-router-dom";
import { getToken } from '../../LocalStorage/TokenStorage';
import { useUserContext } from '../../Context/UserContext';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { insertUserProductView } from '../../Pages/Product/Updater/InsertUserProductView';

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
    const navigate = useNavigate();
    const { userType, databaseKey } = useUserContext();

    const isProduct = props.type === "product";
    const { category: categoryList } = useCategoryContext();

    const insertProductInCart = async () => {
        const token = getToken();

        console.log(databaseKey);
        if (!token || !databaseKey) {
            throw new Error("Token o databaseKey mancanti");
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/api/cart/insertProducts`,
                {
                    idUser: databaseKey,
                    idProdotto: props.id
                }, // Corpo della richiesta
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Token di autenticazione
                    },
                }
            );

            const result = response.data;
            console.log(result);

            if (result.esito === true) {
                handleAddClick();
            }

        } catch (error) {
            console.error("Errore durante il recupero dei prodotti:", error);
            throw error; // Propaga l'errore
        }
    };

    const handleAddClick = () => {

        console.log("prodotto: " + props.id + " aggiunto nel carrello");
        setNotification(`${props.name} è stato aggiunto al carrello`);

        // Rimuovi la notifica dopo 3 secondi
        setTimeout(() => {
            setNotification(null);
        }, 2000);
    };

    // Funzione per ottenere il colore di una categoria
    const getColorForCategory = (categoryName) => {
        if (!categoryList || categoryList.length === 0) {
            console.warn("CategoryList non è disponibile o è vuoto");
            return "darkslateblue"; // Colore di default
        }

        const normalizedCategory = categoryName.toLowerCase();
        // Cerca la categoria nell'array
        const categoryItem = categoryList.find(
            (cat) => cat.categoryName.toLowerCase() === normalizedCategory
        );

        return categoryItem ? categoryItem.categoryColor : "darkslateblue"; // Default se non trovato
    };

    const [notification, setNotification] = useState(null); // Stato per la notifica


    const straightContent = props.straight === true;


    const handleClickCard = () => {

        if(userType === "ConA" && isProduct){
            insertUserProductView(databaseKey,props.id);
        }
        
        let linkType = null;
        isProduct ? linkType = "/prodotto" : linkType = "/ricetta"
        navigate(linkType, { state: { id: props.id } });
    };

    /*
    <Link to={isProduct ? {
                    pathname: "/prodotto",
                    state: { id: props.id }
                } :
                    `/ricetta/${props.id}`}
                    className="product-link">
                    <img className="card-image" src={props.image} />
                </Link>
    */

    return (
        <>
            <div
                className="card"
                style={{
                    flexDirection: props.straight === "false" ? "" : "column",
                }}


            >
                <div onClick={handleClickCard} className='cliccable-link'>
                    <div className="card-image-wrapper">
                        <img className="card-image" src={props.image} /></div>
                </div>


                <div className="card-info">

                    <div onClick={handleClickCard} className='cliccable-link'>
                        <h3 className="card-name" >{props.name}</h3></div>

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
                    {isProduct &&
                        userType === "ConA" &&
                        <p className="card-detail">{props.distanceKm} km</p>}
                    {isProduct &&
                        userType === "NegA" &&
                        <p className="card-detail">Visite: {props.views} </p>}
                    {isProduct &&
                        userType === "NegA" &&
                        <p className="card-detail">Prenotazioni: {props.reservations} </p>}
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
                            <span className='icon-recipe' data-tooltip-id={`cost-tooltip`} data-tooltip-content="Costo"><img src={CostIcon} /></span><span className='text-icon-recipe' >: {props.cost}</span>
                            <span className='icon-recipe' data-tooltip-id={`difficulty-tooltip`} data-tooltip-content="Difficoltà"><img src={DifficultyIcon} /></span><span className='text-icon-recipe' >: {props.difficulty}</span>
                        </div>
                        <div className="card-recipe-icon-text">
                            <span className='icon-recipe' data-tooltip-id={`prepTime-tooltip`} data-tooltip-content="Tempo di preparazione"><img src={PreparationTimeIcon} /></span><span className='text-icon-recipe' >: {props.prepTime}</span>
                            <span className='icon-recipe' data-tooltip-id={`cookTime-tooltip`} data-tooltip-content="Tempo di cottura"><img src={CookingTimeIcon} /></span><span className='text-icon-recipe' >: {props.cookTime}</span>
                        </div>
                    </div>)}
                    {props.button ? (<button className="card-button" onClick={insertProductInCart}>{props.button}</button>) : ""}

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
