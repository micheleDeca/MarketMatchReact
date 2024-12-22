import React, { useRef } from 'react';
import './Home.css';
import ProductList from '../../Components/ProductList/ProductList';
import CategoryCardList from '../../Components/CategoryCardList/CategoryCardList';
import WelcomeBanner from '../../Components/WelcomeBanner/WelcomeBanner';
import { useUserContext } from '../../Context/UserContext';
import FeaturesComponent from './FeaturesComponent/FeaturesComponent';
import PositionComponent from './PositionComponent/PositionComponent';
import HighlightShops from './HighlightShops/HighlightShops';


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
    { name: "Vegenariano", logo: "🥦", color: "#DFFFD6" },
  ];


  const { userType } = useUserContext();

  /*
  useEffect(() => {
        props.setNavColor("white");

        // Simula una chiamata API per caricare i dati dell'utente
        axios.get('/api/user/home').then(response => {
            setUserData(response.data);
            setLoading(false);
        }).catch(error => {
            console.error("Errore nel caricamento dei dati:", error);
            setLoading(false);
        });
    }, []); */


  console.log(userType);
  return (
    <>
      <div className="background"></div>
      {
        userType === "NoAccesso" ? (
          <>
            <CategoryCardList title="LE NOSTRE MIGLIORI CATEGORIE" categories={categories} />
            <WelcomeBanner />
            <ProductList title="SCOPRI I NOSTRI PRODOTTI" products={products} buttonName={"Scopri"} />
            <ProductList title="VICINO A TE" products={products} buttonName={"Scopri"} />
          </>

        ) : userType == "ConA" ? (
          <>
            <CategoryCardList title="LE TUE CATEGORIE PREFERITE" categories={categories} />
            <PositionComponent />
            <ProductList title="SCOPRI I NOSTRI PRODOTTI" products={products} buttonName={"Prenota"} type={"product"}/>

            <FeaturesComponent />
            <ProductList title="PRODOTTI VICINO A TE" products={products} buttonName={"Prenota"} type={"product"}/>
            <HighlightShops />
            <ProductList title="RICETTE PER I TUOI GUSTI (sviluppare)" products={products} type={"recipe"} />
            <ProductList title="NEGOZI VICINO A TE (sviluppare)" products={products} buttonName={"mario"} />
          </>
        ) : userType == "AmmA" ? (
          <>
          </>
        ) : userType == "NegA" ? (
          <>
            <CategoryCardList title="CATEGORIE NEGOZIO" categories={categories} />
            <ProductList title="PRODOTTI IN VENDITA" products={products} />
            <ProductList title="PRODOTTI IN PROMOZIONE (verificare come)" products={products} buttonName={"Modifica"} />
            <ProductList title="LE TUE ULTIME PRENTOAZIONI (sviluppare)" products={products} buttonName={"Modifica"} />
            <ProductList title="STATISTICHE? (sviluppare)" products={products} buttonName={"mario"} />
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
