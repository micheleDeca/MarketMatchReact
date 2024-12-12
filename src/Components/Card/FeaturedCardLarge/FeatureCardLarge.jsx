import React from 'react'
import './FeatureCardLarge.css'
const FeatureCardLarge = (props) => {
    return (
        <div class="large-featured-card" 
        style={{ backgroundColor:  props.color  }}
                    >
            <img src={props.image} alt={props.image} class="featured-image-large" />
            <h3 class="featured-title-large">{props.name}</h3>
            <p class="featured-description-large">{props.description}</p>
            <p class="featured-price-large">€{props.price}</p>
            <button class="featured-button">Prenota</button>
        </div>
    )
}

export default FeatureCardLarge
