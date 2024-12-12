import React, { useRef } from 'react';
import './Home.css';
import ProductList from '../../Components/ProductList/ProductList';
import CategoryCardList from '../../Components/CategoryCardList/CategoryCardList';
import CategoryLabelList from '../../Components/CategoryLabelList/CategoryLabelList';
import WelcomeBanner from '../../Components/WelcomeBanner/WelcomeBanner';




const Home = (props) => {
  
  props.setNavColor("white");
  return (
  <>
  <div className="background"></div>
  <CategoryCardList />
  <WelcomeBanner />
  <ProductList title="SCOPRI I NOSTRI PRODOTTI"/>
  <ProductList title="I TUOI PRODOTTI PREFERITI"/>
  
 
  </>
  
);
};

export default Home;
