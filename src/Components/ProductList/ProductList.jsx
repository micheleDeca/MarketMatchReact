import React, { useState, useEffect, useRef} from 'react';

import ProductCard from '../ProductCard/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper components
import '../../../node_modules/swiper/swiper-bundle.min.css';
import '../../../node_modules/swiper/modules/pagination.min.css'; // Importa i CSS per la paginazione
import './ProductList.css';



import { Pagination } from 'swiper/modules'; // Importa il modulo Pagination

const ProductList = (props) => {
    const products = [
        { id: 1, name: "Prodotto 1", price: "10", image: "https://app.naturasi.it/media/catalog/product/cache/852x852/_/1/_1725943432_000100022410_1.jpg" },
        { id: 2, name: "Prodotto 2", price: "20", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641649427_000100023810_1.jpg" },
        { id: 3, name: "Prodotto 3", price: "30", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641812603_000100023921_1.jpg" },
        { id: 1, name: "Prodotto 1", price: "10", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1672720840_000100068965_1.jpg" },
        { id: 2, name: "Prodotto 2", price: "20", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1692786758_000100023101_1.jpg" },
        { id: 3, name: "Prodotto 3", price: "30", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641783795_000100023617_1.jpg" },
        { id: 1, name: "Prodotto 1", price: "10", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1705579086_000100022608_1.jpg" },
        { id: 2, name: "Prodotto 2", price: "20", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1711003172_000100023121_1.jpg" },
        { id: 3, name: "Prodotto 3", price: "30", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641640213_000100023796_1.jpg" },
        { id: 1, name: "Prodotto 1", price: "10", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1705579086_000100022608_1.jpg" },

    ];

    const mobileSize = 1000;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize); // Imposta lo stato iniziale in base alla larghezza attuale
    const swiperRef = useRef(null);


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
                    slidesPerView={1.8}
                    pagination={{
                        clickable: true, // Attiva i pallini
                                dynamicBullets: true, // Mostra solo alcuni pallini dinamicamente

                    }}
                    breakpoints={{
                        450: { slidesPerView: 1.2 },
                        768: { slidesPerView: 2 },
                        900: { slidesPerView: 4 },
                    }}
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard
                                straight="true"
                                name={product.name}
                                detail="descrizione prodotto"
                                price={product.price}
                                image={product.image}
                                button="Modifica"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className="product-list">
                    {products.map((product) => (
                        <ProductCard
                            straight="false"   /*false impaginato in riga */
                            name={product.name}
                            detail="descriziosssssssne prodotto"
                            price={product.price}
                            image={product.image}
                            button="Modifica"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
export default ProductList;
