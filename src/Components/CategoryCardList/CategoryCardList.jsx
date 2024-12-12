import React from 'react'
import './CategoryCardList.css'
const categories = [
    { name: "Senza Lattosio", logo: "🥤", color: "#D6F5FF" },
    { name: "Senza Glutine", logo: "🍞", color: "#FFF5D6" },
    { name: "Biologico", logo: "🍎", color: "#FFDFDF" },
    { name: "Vegenariano", logo: "🥦", color: "#DFFFD6" },
    
    
    

];

/* SE utente ha poche categorie, inserire categorie consiglate. o fin eo fatte bene con raccomander system */

const CategoryCardList = (props) => {
    return (
        <section className="category-section">
            {/* Titolo */}
            <a className="section-title-category">LE TUE CATEGORIE PREFERITE {String.fromCharCode(0x25B6)}</a>

            {/* Divisione decorativa in SVG */}
            <div className="svg-divider">
                <svg width="100%" height="2" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="1" x2="100%" y2="1" stroke="#CAC4D0" />
                </svg>
            </div>

            <div className="category-cards">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="category-card"
                        style={{ backgroundColor: category.color }}
                    >
                        <div className="category-logo">{category.logo}</div>
                        <h3 className="category-name">{category.name}</h3>
                        <button className="category-button">Scopri {String.fromCharCode(0x25B6)}</button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CategoryCardList
