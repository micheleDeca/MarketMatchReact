import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import ProductList from '../../Components/ProductList/ProductList';
import CategoryCardList from '../../Components/CategoryCardList/CategoryCardList';
import WelcomeBanner from '../../Components/WelcomeBanner/WelcomeBanner';
import { useUserContext } from '../../Context/UserContext';
import { useCategoryContext } from '../../Context/CategoryContex';

import FeaturesComponent from './FeaturesComponent/FeaturesComponent';
import PositionComponent from './PositionComponent/PositionComponent';
import HighlightShops from './HighlightShops/HighlightShops';
import FeaturesComponentShop from './FeaturesComponentShop/FeaturesComponentShop';
import { getReccomanderProductFetch } from './Updater/GetRecommanderProduct';
import { getPositionProduct } from './Updater/GetPositionProduct';
import { getRecipes } from './Updater/GetRecipes';
import { getPositionStore } from './Updater/GetPositionStore';
import { getViwedProduct } from './Updater/GetViewedProduct';
import { getStoreProduct } from './Updater/GetStoreProducts';
import { getStoreReservation } from './Updater/GetReservationStore';


const Home = (props) => {

  const products = [
    { id: 1, name: "Prodotto 1", originalPrice: "10.00€", currentPrice: "80.00€", image: "http://4.232.65.20/assets/test/4.jpeg", detail: "Un prodotto di alta qualità per ogni esigenza." },
    { id: 2, name: "Prodotto 2", currentPrice: "20.00€", image: "http://4.232.65.20/assets/test/9.jpg", detail: "Un prodotto versatile e ideale per tutta la famiglia." },
    { id: 3, name: "Prodotto 3", originalPrice: "20.00€", currentPrice: "25.00€", image: "http://4.232.65.20/assets/test/2.webp", detail: "Perfetto per soddisfare ogni tuo desiderio di qualità." },
    { id: 4, name: "Prodotto 4", originalPrice: "1.00€", currentPrice: "10.00€", image: "http://4.232.65.20/assets/test/6.png", detail: "Un'ottima scelta per il tuo benessere quotidiano." },
    { id: 5, name: "Prodotto 5", currentPrice: "20.00€", image: "http://4.232.65.20/assets/test/7.webp", detail: "Prodotto naturale e sostenibile per ogni occasione." },
    { id: 6, name: "Prodotto 6", currentPrice: "30.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641783795_000100023617_1.jpg", detail: "Qualità e gusto in un unico prodotto." },
    { id: 7, name: "Prodotto 7", currentPrice: "10.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1705579086_000100022608_1.jpg", detail: "Ideale per prendersi cura di sé ogni giorno." },
    { id: 8, name: "Prodotto 8", currentPrice: "20.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1711003172_000100023121_1.jpg", detail: "Prodotto ricco di benefici naturali." },
    { id: 9, name: "Prodotto 9", currentPrice: "30.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641640213_000100023796_1.jpg", detail: "Un'ottima scelta per una vita sana e attiva." },
    { id: 10, name: "Prodotto 10", currentPrice: "10.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1705579086_000100022608_1.jpg", detail: "Un prodotto pensato per offrirti il massimo comfort." },
  ];

  const categories = [
    { name: "Senza Lattosio", logo: "🥤", color: "#D6F5FF" },
    { name: "Senza Glutine", logo: "🍞", color: "#FFF5D6" },
    { name: "Biologico", logo: "🍎", color: "#FFDFDF" },
    { name: "Vegetariano", logo: "🥦", color: "#DFFFD6" },
  ];


  const { databaseKey, userType } = useUserContext();
  const { category, setCategory } = useCategoryContext();


  const [recommenderProduct, setRecommenderProduct] = useState([]);
  const [positionProduct, setPositionProduct] = useState([]);
  const [reservationStore, setReservationStore] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [store, setStore] = useState([]);


  const [userPosition, setUserPosition] = useState([]); // Stato per la posizione dell'utente

  // Funzione che verrà passata al componente figlio per aggiornare la posizione
  const handlePositionUpdate = (position) => {
    setUserPosition(position); // Aggiorna la posizione nel componente padre
  };

  console.log("Categoria", category);
  console.log("Tipo Utente", userType);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Aggiungi dipendenze che richiedono il reset dello scroll

  useEffect(() => {
    if (userType == "ConA") {
      let isMounted = true; // Flag per evitare aggiornamenti su componenti smontati

      const getProductsRecommander = async () => {

        const [
          productsData,
          productsDataPos,
          recipesData,
          storeData
        ] = await Promise.all([
          getReccomanderProductFetch({
            userUuid: databaseKey,
            userLatitude: userPosition.latitude,
            userLongitude: userPosition.longitude,
          }),
          getPositionProduct({
            userLatitude: userPosition.latitude,
            userLongitude: userPosition.longitude,
          }),
          getRecipes(),
          getPositionStore({
            userLatitude: userPosition.latitude,
            userLongitude: userPosition.longitude,
          })
        ]);

        if (isMounted) {
          setRecommenderProduct(productsData);
          setPositionProduct(productsDataPos);
          setRecipe(recipesData);
          setStore(storeData)

        }

      };

      getProductsRecommander();

      // Cleanup: evita aggiornamenti su componenti smontati
      return () => {
        isMounted = false;
      };


    }

  }, [userPosition, userType])

  useEffect(() => {
    if (userType == "NoAccesso"  ) {
      let isMounted = true; // Flag per evitare aggiornamenti su componenti smontati

      const getProductsRecommander = async () => {

        const [
           productsDataPos,
           productsData
        ] = await Promise.all([
           
          getPositionProduct({
            userLatitude: userPosition.latitude,
            userLongitude: userPosition.longitude,
          }),
          getViwedProduct(),
          
           
        ]);

        if (isMounted) {
          setRecommenderProduct(productsData);
          setPositionProduct(productsDataPos);
           

        }

      };

      getProductsRecommander();

      // Cleanup: evita aggiornamenti su componenti smontati
      return () => {
        isMounted = false;
      };


    }

  }, [userPosition, userType])

  useEffect(() => {
    if (userType == "NegA"  ) {
      let isMounted = true; // Flag per evitare aggiornamenti su componenti smontati

      const getProductsRecommander = async () => {

        const [
           productsData,
           productsDataOffer,
           reservation
        ] = await Promise.all([
           
          getStoreProduct({
            filterOffer: null,
            storeUuid: databaseKey, 
          }),
          getStoreProduct({
            filterOffer: true,
            storeUuid: databaseKey, 
          }),
          getStoreReservation({
            storeUuid: databaseKey, 
          }),
          
           
        ]);

        if (isMounted) {
          setRecommenderProduct(productsData);
          setPositionProduct(productsDataOffer);
          setReservationStore(reservation);


        }

      };

      getProductsRecommander();

      // Cleanup: evita aggiornamenti su componenti smontati
      return () => {
        isMounted = false;
      };


    }

  }, [userPosition, userType])


  return (
    <>
      <div className="background"></div>
      {
        userType === "NoAccesso" ? (
          <>
            <CategoryCardList title="LE NOSTRE MIGLIORI CATEGORIE" categories={categories} />
            <PositionComponent onPositionUpdate={handlePositionUpdate} />
            <ProductList title="SCOPRI I NOSTRI PRODOTTI" products={recommenderProduct} type={"product"} />
            <FeaturesComponent />
            <ProductList title="VICINO A TE" products={positionProduct}   type={"product"} />
          </>

        ) : userType == "ConA" ? (
          <>
            <CategoryCardList title="LE TUE CATEGORIE PREFERITE" categories={categories} />
            <PositionComponent onPositionUpdate={handlePositionUpdate} />
            <ProductList title="NOI TI CONOSCIAMO PIÚ DI QUANTO TU CREDA 😏" products={recommenderProduct} buttonName={"Aggiungi al carrello"} type={"product"} />
            <FeaturesComponent />
            <ProductList title="PRODOTTI VICINO A TE" products={positionProduct} buttonName={"Aggiungi al carrello"} type={"product"} />
            <HighlightShops />
            <ProductList title="RICETTE PER I TUOI GUSTI" products={recipe} type={"recipe"} />
            <ProductList title="NEGOZI VICINO A TE" products={store} type={"store"} />
          </>
        ) : userType == "AmmA" ? (
          <>
          </>
        ) : userType == "NegA" ? (
          <>
            <CategoryCardList title="CATEGORIE NEGOZIO" categories={categories} />
            <ProductList title="PRODOTTI IN VENDITA" products={recommenderProduct} type={"product"} />
            <FeaturesComponentShop />
            <ProductList title="PRODOTTI IN PROMOZIONE (verificare come)" products={positionProduct} buttonName={"Modifica"} type={"product"} />
            <div className="reservation-wrapper-home"><ProductList title="ULTIME PRENTOAZIONI" products={reservationStore} type={"reservation"} /></div>
           </>
        ) : (
          <>
          </>
        )
      }

    </>

  );
};

export default Home;
