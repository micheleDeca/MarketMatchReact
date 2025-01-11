import React, { useState, useEffect } from 'react';
import ProductCard from '../Card/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../node_modules/swiper/swiper-bundle.min.css';
import '../../../node_modules/swiper/modules/pagination.min.css';
import './ProductList.css';
import { useNavigate } from "react-router-dom";

import { Pagination } from 'swiper/modules';
import LoadingPage from '../../Pages/LoadingPage/LoadingPage';
import OperationLong from '../OperationLong/OperationLong';

const ProductList = (props) => {
    const [officialProducts, setOfficialProducts] = useState({});
    const [loading, setLoading] = useState(true); // Imposta inizialmente lo stato del loading a true
    const [error, setError] = useState(null); // Stato per gli errori
    const mobileSize = 1000;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= mobileSize);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (props.products === null) {
            setLoading(true); // Se i prodotti sono null, mostra il caricamento
        } else if (props.products != null) {
            setOfficialProducts(props.products); // Altrimenti, carica i prodotti

            setLoading(false);
            setError(null);
        }

        setOfficialProducts(props.products); // Altrimenti, carica i prodotti

    }, [props.products]); // Usa useEffect per monitorare quando `props.products` cambia

    const handleClickTitle = () => {

        let linkType = null;
        linkType = props.type === "product" ? "/prodotti" : (props.type === "store" ? "/negozi" : "/ricette");
        navigate(linkType);
    };

    if (loading) return <div><LoadingPage /></div>;
    if (error) return <div>Errore: {error}</div>;

    return (
        <div className="home-section">
            <a className="section-title-product" onClick={handleClickTitle}>{props.title} {String.fromCharCode(0x25B6)}</a>
            <div className="svg-divider">
                <svg width="100%" height="2" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="1" x2="100%" y2="1" stroke="#CAC4D0" />
                </svg>
            </div>
            {props.type != "reservation" && <div>
            {isMobile ? (
                <Swiper
                    modules={[Pagination]}
                    spaceBetween={15}
                    slidesPerView={2}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    breakpoints={{
                        650: { slidesPerView: 3 },
                        900: { slidesPerView: 4 },
                    }}
                >
                    {officialProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard
                                key={product.id}
                                straight="true"
                                id={product.id}
                                button={props.buttonName}
                                type={props.type}
                                name={product.name}
                                detail={product.detail}
                                currentPrice={(product.currentPrice) ? product.currentPrice + "€" : ""}
                                originalPrice={(product.originalPrice) ? product.originalPrice + "€" : ""}
                                image={"http://4.232.65.20/assets/" + product.image}
                                categories={product.categories}
                                difficulty={product.difficulty}
                                prepTime={product.prepTime}
                                cookTime={product.cookTime}
                                cost={product.cost}
                                distanceKm={product.distanceKm}
                                reservations={product.reservations}
                                views={product.views}
                                addresDetail={product.address + " " + product.city}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className="product-list">
                    {officialProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            straight="false"
                            id={product.id}
                            button={props.buttonName}
                            type={props.type}
                            name={product.name}
                            detail={product.detail}
                            currentPrice={(product.currentPrice) ? product.currentPrice + "€" : ""}
                            originalPrice={(product.originalPrice) ? product.originalPrice + "€" : ""}
                            image={"http://4.232.65.20/assets/" + product.image}
                            categories={product.categories}
                            difficulty={product.difficulty}
                            prepTime={product.prepTime}
                            cookTime={product.cookTime}
                            cost={product.cost}
                            distanceKm={product.distanceKm}
                            reservations={product.reservations}
                            views={product.views}
                            addresDetail={product.address + " " + product.city}

                        />
                    ))}
                </div>
            )}
            </div>}

            {props.type === "reservation" && <div className="operations">

                {officialProducts.map((operation) => (
                    <OperationLong
                        key={operation.id}
                        status={operation.status} //Prenotazione
                        id={operation.id} //Prenotazione e Motivo accredito punti
                        operationDate={operation.reservationDate} //Prenotazione e punti
                        infoDate={operation.infoDate} //Prenotazione
                        shopId={operation.storeName} //Prenotazione
                        customerId={operation.customerFirstName + " " + operation.customerLastName} //Prenotazione
                        value={operation.pointValue} //punti
                        pointType={operation.pointType} //punti  plus, minus
                        type={props.type} //reservation, point
                    />
                ))}

            </div>}
        </div>
    );
};

export default ProductList;
