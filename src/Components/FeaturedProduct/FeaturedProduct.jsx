import React from 'react'
import './FeaturedProduct.css'
import FeaturedCardLarge from '../../Components/Card/FeaturedCardLarge/FeatureCardLarge';
import FeatureCardMedium from '../../Components/Card/FeatureCardMedium/FeatureCardMedium';

/* NON COMPLETO NON TANTO BELLO */

const FeaturedProduct = () => {
    return (
        <section class="featured-section">
            <h2 class="section-title">Prodotti in evidenza</h2>
            <div class="featured-container">
                <FeaturedCardLarge
                    color= "#DFFFD6"
                    image="https://static.vecteezy.com/system/resources/previews/049/114/401/non_2x/sliced-salami-with-fresh-tomatoes-and-herbs-png.png"
                    name="Prodotto in offerta"
                    description="Descrizione, descrizione"
                    price="15.00"
                />

                <div class="small-featured-cards">
                <FeatureCardMedium />
                <FeatureCardMedium />
                <FeatureCardMedium />
                <FeatureCardMedium />
                <FeatureCardMedium />
                <FeatureCardMedium />
                </div>
            </div>
        </section>


    )
}

export default FeaturedProduct
