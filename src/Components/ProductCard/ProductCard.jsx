import React from 'react'
import './ProductCard.css'

const ProductCard = (props) => {

    const straightContent = props.straight === true;    
    return (
        <div
        className="card"
        style={{
                flexDirection: props.straight === "false" ? "" : "column",
            }}
      >
      
            <img className="card-image" src={props.image} />
            <div className="card-info">
                <h3 className="card-name">{props.name}</h3>
                <p className="card-detail">{props.detail}</p>  
                <p className="card-price">€{props.price}</p>
                <button className="card-button">{props.button}</button>
            </div>
        </div>
    )
}

export default ProductCard
