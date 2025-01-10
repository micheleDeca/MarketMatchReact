import React, { useState, useEffect } from 'react';
import ProductCard from '../Card/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../node_modules/swiper/swiper-bundle.min.css';
import '../../../node_modules/swiper/modules/pagination.min.css';
import './ProductList.css';
import { Pagination } from 'swiper/modules';
import LoadingPage from '../../Pages/LoadingPage/LoadingPage';

const ProductList = (props) => {
    const [officialProducts, setOfficialProducts] = useState({});
    const [loading, setLoading] = useState(true); // Imposta inizialmente lo stato del loading a true
    const [error, setError] = useState(null); // Stato per gli errori
    const mobileSize = 1000;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);

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
            console.log("sto caricando");
            setLoading(true); // Se i prodotti sono null, mostra il caricamento
        } else if (props.products.length > 0) {
            console.log("ho smesso 1");

            setOfficialProducts(props.products); // Altrimenti, carica i prodotti
            console.log("ho smesso 2");

            setLoading(false);
            setError(null);
        }

        setOfficialProducts(props.products); // Altrimenti, carica i prodotti

    }, [props.products]); // Usa useEffect per monitorare quando `props.products` cambia


     useEffect(()=>{
        console.log("I prodotti sono arrivati nella compoente ");
      },[props.products])
      useEffect(()=>{
        console.log("non va");
        console.log(officialProducts);
      },[officialProducts])

    if (loading) return <div><LoadingPage /></div>;
    if (error) return <div>Errore: {error}</div>;

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
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
