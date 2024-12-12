import React from 'react'
import './FeatureCardMedium.css'

const FeatureCardMedium = () => {
    return (
        <div class="small-card">
          <img 
            src="https://static.vecteezy.com/system/resources/previews/049/114/401/non_2x/sliced-salami-with-fresh-tomatoes-and-herbs-png.png" 
            alt="Prodotto 1" 
            class="featured-image-small" 
          />
          <div class="content">
            <h4 class="featured-title-medium">Prodotto 1</h4>
            <p class="featured-description-medium">ssss</p>
            <p class="featured-price-medium">€20.00</p>
            <button class="featured-button">Prenota</button>
          </div>
        </div>
      )
      
}

export default FeatureCardMedium
