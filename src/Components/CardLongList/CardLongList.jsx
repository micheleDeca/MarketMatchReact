import React from 'react'
import CardLong from '../CardLong/CardLong';
import './CardLongList.css'

const CardLongList = (props) => {
  const cardShop = props.type === "shop";

  return (
    <div className="product-long-list-container">
      <h2 className="product-long-list-title">{props.title}</h2>
      {!cardShop && <span className="product-list-long">
        {props.products.map((product, index) => (
          <CardLong
            key={index}
            image={product.image}
            quantity={product.quantity}
            productName={product.productName}
            detail={product.detail}
            currentPrice={product.currentPrice}
            originalPrice={product.originalPrice}
            badges={product.badges}
          />
        ))}
      </span>}
      {cardShop && (<span className="product-list-long">
        {props.shops.map((shop, index) => (
          <CardLong
            key={index}
            image={shop.image}
            productName={shop.name}
            detail2={"Distante: " + shop.distance.toFixed(2) + " Km da te"}
            detail={shop.city + ", " + shop.address}
            badges={shop.categories}
          />
        ))}
      </span>)}



    </div>
  );
};

export default CardLongList
