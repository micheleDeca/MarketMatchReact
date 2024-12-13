import React, { useRef } from 'react';
import './Home.css';
import ProductList from '../../Components/ProductList/ProductList';
import CategoryCardList from '../../Components/CategoryCardList/CategoryCardList';
import WelcomeBanner from '../../Components/WelcomeBanner/WelcomeBanner';
import { useUserContext } from '../../Context/UserContext';


const Home = (props) => {

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
            <CategoryCardList title="LE NOSTRE MIGLIORI CATEGORIE" categories={categories}/>
            <WelcomeBanner />
            <ProductList title="SCOPRI I NOSTRI PRODOTTI" products={products} />
            <ProductList title="VICINO A TE" products={products} />
          </>

        ) : userType == "ConA" ? (
          <>
          <CategoryCardList title="LE TUE CATEGORIE PREFERITE" categories={categories}/>
            <WelcomeBanner />
            <ProductList title="SCOPRI I NOSTRI PRODOTTI" products={products} />
            <ProductList title="PRODOTTI VICINO A TE" products={products} />
            <ProductList title="RICETTE PER I TUOI GUSTI (sviluppare)" products={products} />
            <ProductList title="NEGOZI VICINO A TE (sviluppare)" products={products} />
          </>
        ) : userType == "AmmA" ? (
          <>
          </>
        ) : userType == "NegA" ? (
          <>
          <CategoryCardList title="CATEGORIE NEGOZIO" categories={categories}/>
            <ProductList title="PRODOTTI IN VENDITA" products={products} />
            <ProductList title="PRODOTTI IN PROMOZIONE (verificare come)" products={products} />
            <ProductList title="LE TUE ULTIME PRENTOAZIONI (sviluppare)" products={products} />
            <ProductList title="STATISTICHE? (sviluppare)" products={products} />
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
