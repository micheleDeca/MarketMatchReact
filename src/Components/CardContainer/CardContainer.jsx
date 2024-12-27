import React from 'react'
import './CardContainer.css'
import Card from '../Card/Card'
 
const CardContainer = (props) => {
    const isMobile = window.innerWidth <= 768; // Controlla se lo schermo è mobile

    return (
        <div className="container-product">
            {props.card.map((card) => (
                <Card
                    key={card.id}
                    id={card.id}
                    straight={isMobile ? "false" : "false"}
                    name={card.name}
                    detail={card.detail}
                    currentPrice={card.currentPrice + "€"}
                    originalPrice={(card.originalPrice)? card.originalPrice+"€" : ""}
                    image={"http://4.232.65.20/assets/"+card.image}
                    button={props.button}
                    categories={card.categories}
                    difficulty={card.difficulty}
                    prepTime={card.prepTime}
                    cookTime={card.cookTime}
                    cost={card.cost}
                    type={props.type}
                />
            ))}
        </div>
    )
}

export default CardContainer
