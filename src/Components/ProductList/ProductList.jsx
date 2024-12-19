import React, { useState, useEffect} from 'react';

import ProductCard from '../Card/Card';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper components
import '../../../node_modules/swiper/swiper-bundle.min.css';
import '../../../node_modules/swiper/modules/pagination.min.css'; // Importa i CSS per la paginazione
import './ProductList.css';

/**
 * 
 * @prop {string} title - Il titolo della sezione dei prodotti. (es. "I nostri prodotti")
 * @prop {Array<Object>} products - Un array di oggetti rappresentanti i prodotti. Ogni prodotto deve avere:
 *    - {number|string} id - Identificatore unico del prodotto. (es. 1 o "1")
 *    - {string} name - Nome del prodotto. (es. "Prodotto 1")
 *    - {string} price - Prezzo del prodotto in formato stringa. (es. "10")
 *    - {string} image - URL dell'immagine del prodotto. (es. "https://example.com/prodotto.jpg")
 *    - {string} detail - Descrizione del prodotto. (es. "Descrizione prodotto")
 * 
 * Comportamento:
 * - Utilizza lo stato `isMobile` per determinare il layout (Swiper per dispositivi mobili o lista per desktop).
 * - Se `isMobile` è `true`, i prodotti vengono mostrati tramite uno slider con supporto per la paginazione.
 * - Se `isMobile` è `false`, i prodotti vengono mostrati in una lista.
 * 
 * Esempio di utilizzo:
 * const products = [
 *   { id: 1, name: "Prodotto 1", price: "10", image: "https://example.com/prodotto1.jpg", detail: "Descrizione prodotto 1" },
 *   { id: 2, name: "Prodotto 2", price: "20", image: "https://example.com/prodotto2.jpg", detail: "Descrizione prodotto 2" }
 * ];
 * 
 * <ProductList title="I nostri prodotti" products={products} />
 */

import { Pagination } from 'swiper/modules'; // Importa il modulo Pagination

const ProductList = (props) => {
    

    const mobileSize = 1000;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize); // Imposta lo stato iniziale in base alla larghezza attuale


    useEffect(() => {       //consente di eseguire del codice aggiuntivo dopo che il componente è stato montato nel DOM.
        const handleResize = () => {
            setIsMobile(window.innerWidth <= mobileSize);   // controlla la larghezza della finestra con window.innerWidth.
        };

        window.addEventListener('resize', handleResize); // Aggiungi listener per il resize della finestra.
        return () => {
            window.removeEventListener('resize', handleResize); // Rimuovi il listener quando il componente si smonta (quando <WelcomeBanner /> non è più visibile o usato nella pagina.)
        };
    }, []);

    /*
    Le parentesi quadre vuote come secondo argomento di useEffect indicano che il codice all'interno 
    di useEffect viene eseguito solo una volta, quando il componente è montato.
    Non viene rieseguito a meno che il componente non venga smontato e rimontato.
   */

    return (
        <div className="home-section">
            <a className="section-title-product">{props.title} {String.fromCharCode(0x25B6)}</a>
            <div className="svg-divider">
                <svg width="100%" height="2" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="1" x2="100%" y2="1" stroke="#CAC4D0" />
                </svg>
            </div>
            {isMobile ? (
                <Swiper
                    modules={[Pagination]} // Attiva il modulo Pagination
                    spaceBetween={15}
                    slidesPerView={2}
                    pagination={{
                        clickable: true, // Attiva i pallini
                                dynamicBullets: true, // Mostra solo alcuni pallini dinamicamente

                    }}
                    breakpoints={{
                        650: { slidesPerView: 3 },
                        900: { slidesPerView: 4 },
                      }}
                     
                >
                    {props.products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard
                                straight="true"
                                id={product.id}
                                name={product.name}
                                detail={product.detail}
                                currentPrice={product.currentPrice}
                                originalPrice={product.originalPrice}
                                image={product.image}
                                button={props.buttonName}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className="product-list">
                    {props.products.map((product) => (
                        <ProductCard
                            straight="false"   /*false impaginato in riga */
                            id={product.id}
                            name={product.name}
                            detail={product.detail}
                            currentPrice={product.currentPrice}
                            originalPrice={product.originalPrice}
                            image={product.image}
                            button={props.buttonName}
                            />
                    ))}
                </div>
            )}
        </div>
    );
};
export default ProductList;
