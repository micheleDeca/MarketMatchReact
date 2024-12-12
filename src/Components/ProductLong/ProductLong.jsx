import React, { useState, useEffect } from 'react';
import './ProductLong.css';
import CategoryLabelList from '../CategoryLabelList/CategoryLabelList';

/**
 * 
 * @prop {string} image - L'URL dell'immagine del prodotto. (es. "https://example.com/prodotto.jpg")
 * @prop {number} quantity - La quantità del prodotto acquistata
 * @prop {string} productName - Il nome del prodotto
 * @prop {string} detail - Una descrizione del prodotto
 * @prop {number} price - Il prezzo del prodotto
 * @prop {Array<string>} badges - Un array di etichette o categorie associate al prodotto. (es. { text: "Bio", backgroundColor: "#4caf50" })
 */

const ProductLong = (props) => {
    const mobileSize = 1000;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);
    const maxLength = 130;
    const maxLengthMobile = 50;
 

    // Funzione per troncare il testo
    const truncateText = (text) => {
        if (isMobile) {
            if (text.length > maxLengthMobile) {
                return text.substring(0, maxLengthMobile) + '...';
            }
        } else {
            if (text.length > maxLength) {
                return text.substring(0, maxLength) + '...';
            }
        }
        return text;
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= mobileSize);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="card-long">
            <img
                className="card-image-long"
                src={props.image}
            />
            <div className="card-info-long">
                <div className="card-name-category-long">
                    <h3 className="card-name-long">
                        {props.quantity} x {props.productName}
                    </h3>
                    <CategoryLabelList badges={badges}/>
                </div>
                <p className="card-detail-long">
                    {truncateText(props.detail)}
                </p>
                <p className="card-price-long">€{props.price}</p>
            </div>
        </div>
    );
};

export default ProductLong;
