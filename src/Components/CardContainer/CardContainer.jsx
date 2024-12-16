import React from 'react'
import './CardContainer.css'
import Card from '../Card/Card'

const CardContainer = (props) => {
    const isMobile = window.innerWidth <= 768; // Controlla se lo schermo è mobile


    return (
        <div className="container-product">
            {props.products.map((product) => (
                <Card
                    key={product.id}
                    straight={isMobile ? "false" : "false"}
                    name={product.name}
                    detail={product.detail}
                    currentPrice={product.currentPrice}
                    originalPrice={product.originalPrice}
                    image={product.image}
                    button={"Prenota"}

                />
            ))}
        </div>
    )
}

export default CardContainer
