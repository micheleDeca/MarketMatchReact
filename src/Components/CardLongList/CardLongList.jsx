import React from 'react'
import CardLong from '../CardLong/CardLong';
import './CardLongList.css'

const CardLongList = (props) => {
    return (
      <div className="product-long-list-container">
        <h2 className="product-long-list-title">{props.title}</h2>
        <span className="product-list-long">
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
        </span>
      </div>
    );
  };

export default CardLongList
