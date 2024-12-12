import React from 'react'
import './CategoryCardList.css'

/* SE utente ha poche categorie, inserire categorie consiglate. o fin eo fatte bene con raccomander system */

const CategoryCardList = (props) => {
    return (
        <section className="category-section">
            {/* Titolo */}
            <a className="section-title-category">{props.title}  {String.fromCharCode(0x25B6)}</a>

            {/* Divisione decorativa in SVG */}
            <div className="svg-divider">
                <svg width="100%" height="2" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="1" x2="100%" y2="1" stroke="#CAC4D0" />
                </svg>
            </div>

            <div className="category-cards">
                {props.categories.map((category, index) => (
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
