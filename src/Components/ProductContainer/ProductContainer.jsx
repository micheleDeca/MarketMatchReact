import React from 'react'
import './ProductContainer.css'
import ProductCard from '../ProductCard/ProductCard'

const ProductContainer = (props) => {
    const isMobile = window.innerWidth <= 768; // Controlla se lo schermo è mobile


    return (
        <div className="container-product">
            {props.products.map((product) => (
                <ProductCard
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

export default ProductContainer
