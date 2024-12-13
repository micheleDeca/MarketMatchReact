import React from 'react'
import './ProductCard.css'

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

const ProductCard = (props) => {

    const straightContent = props.straight === true;
    return (
        <div
            className="card"
            style={{
                flexDirection: props.straight === "false" ? "" : "column",
            }}
        >

            <img className="card-image" src={props.image} />
            <div className="card-info">
                <h3 className="card-name">{props.name}</h3>
                <p className="card-detail">{props.detail}</p>
                <p className="price-container-card">{props.originalPrice ? (
                    <>
                        <span className="current-price-card">{props.currentPrice}</span>
                        <span className="original-price-card">{props.originalPrice}</span>
                    </>
                ) : (
                    <span className="normal-price-card">{props.currentPrice}</span>
                )}</p>
                {props.button? (<button className="card-button">{props.button}</button>) : ""}
                
            </div>
        </div>
    )
}

export default ProductCard
