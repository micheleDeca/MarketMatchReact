import React, { useState, useEffect } from 'react';
import './CardLong.css';
import CategoryLabelList from '../CategoryLabelList/CategoryLabelList';
import Counter from "../../Components/Counter/Counter";
import { useNavigate } from "react-router-dom";

/**
 * Componente ProductLong
 * 
 * Descrizione:
 * ProductLong è un componente che rappresenta un prodotto in formato dettagliato, mostrando immagine, nome, descrizione, prezzo e badge associati.
 * 
 * Props:
 * - `image` {string}: L'URL dell'immagine del prodotto. (es. "https://example.com/prodotto.jpg")
 * - `quantity` {number|null}: La quantità del prodotto acquistata. Se presente, viene mostrata accanto al nome del prodotto. (es. 2)
 * - `productName` {string}: Il nome del prodotto. (es. "Mela Bio")
 * - `detail` {string}: Una descrizione dettagliata del prodotto. (es. "Una mela biologica proveniente da coltivazioni sostenibili.")
 * - `price` {number}: Il prezzo attuale del prodotto. (es. 5.99)
 * - `originalPrice` {number|null}: Il prezzo originale del prodotto. Se presente, viene mostrato accanto al prezzo scontato. (es. 7.99)
 * - `badges` {Array<Object>}: Un array di oggetti rappresentanti i badge associati al prodotto. Ogni oggetto deve contenere:
 *   - `text` {string}: Il testo del badge. (es. "Bio")
 *   - `backgroundColor` {string}: Il colore di sfondo del badge. (es. "#4CAF50")
 * 
 * Comportamento:
 * - Adatta il layout per dispositivi mobili e desktop, utilizzando lo stato `isMobile`.
 * - Trunca la descrizione del prodotto in base alla larghezza del dispositivo.
 * - Mostra il prezzo corrente e, se presente, il prezzo originale come prezzo scontato.
 * 
 * Esempio di utilizzo:
 * const badges = [
 *   { text: "Bio", backgroundColor: "#4CAF50" },
 *   { text: "Vegano", backgroundColor: "#FFC107" }
 * ];
 * 
 * <ProductLong 
 *   image="https://example.com/prodotto.jpg" 
 *   quantity={2} (non inserire quantità per NON vedere "x")
 *   productName="Mela Bio" 
 *   detail="Una mela biologica proveniente da coltivazioni sostenibili."
 *   currentPrice={5.99}
 *   originalPrice={7.99}
 *   badges={badges} 
 * />
 */
const CardLong = (props) => {
    const mobileSize = 1000;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);
    const maxLength = 130;
    const maxLengthMobile = 50;

    const navigate = useNavigate();
    const isStore = props.type === "shop";
    const isProduct = props.type === "product";
    const isRecipe = props.type === "recipe";
    
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


    const handleClickCard = () => {
        let linkType = null;
        isStore ? linkType = "/negozio" : (isProduct ? linkType = "/prodotto" : linkType = "");
        
        navigate(linkType, { state: { id: props.id } });
    };


    return (
        <div className="card-long">
            <div onClick={handleClickCard} className='cliccable-link'>

                <img
                    className="card-image-long"
                    src={props.image}
                />
            </div>
            <div className="card-info-long">
                <div className="card-name-category-long">
                    <div onClick={handleClickCard} className='cliccable-link'>  <h3 className="card-name-long">
                        {props.quantity ? `${props.quantity} x ` : ''}{props.productName}
                    </h3> </div>
                    <CategoryLabelList badges={props.badges} />
                </div>
                <p className="card-detail-long">
                {isRecipe? props.detail : truncateText(props.detail)}
                     {/* {isRecipe? props.detail : truncateText(props.detail)} */}
                </p>
                <p className="card-detail-long">
                    {props.detail2}
                </p>
                <div className="card-long-price-count-container">
                    <div className="price-container-long">
                        {props.originalPrice ? (
                            <>
                                <span className="current-price-long">{props.currentPrice}</span>
                                <span className="original-price-long">{props.originalPrice}</span>
                            </>
                        ) : (
                            <span className="normal-price-long">{props.currentPrice}</span>
                        )}
                    </div>
                    {(props.getCounter != null) && <div className="count-container-card-long">
                        <Counter productId={props.id} initialQuantity={props.quantity}
                        onChangeQuantity={props.onChangeQuantity} price={props.currentPrice} setUpdatePage={props.updatePage}/>
                    </div>}

                </div>
            </div>
        </div>
    );
};

export default CardLong;
