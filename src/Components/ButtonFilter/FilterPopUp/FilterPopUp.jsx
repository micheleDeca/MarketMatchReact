import { useState } from "react";
import FilterElement from "./FilterElement/FilterElement";
import './FilterPopUp.css'
import SearchBar from "../../SearchBar/SearchBar";
import PositionButton from "./PositionButton/PositionButton";
import ShowButton from "./ShowButton/ShowButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";


export default function FilterPopUp(elements) {

    // Funzione per chiudere la popup
    const closePopup = () => {
        elements.setState((prev) => !prev);
    };

    /* Gestione dello Slider per il prezzo */
    const [minValue, setMinValue] = useState(1); // Valore minimo
    const [maxValue, setMaxValue] = useState(100); // Valore massimo

    const [minValueDistance, setMinValueDistance] = useState(0.1); // Valore minimo
    const [maxValueDistance, setMaxValueDistance] = useState(10); // Valore massimo


    const handleMinChange = (event) => {
        let value = Number(event.target.value);
        if (value >= maxValue) {
            value = maxValue - 1; // Impedisce che il minimo superi il massimo
        }
        setMinValue(value);
    };

    const handleMaxChange = (event) => {
        let value = Number(event.target.value);
        if (value <= minValue) {
            value = minValue + 1; // Impedisce che il massimo vada sotto il minimo
        }
        setMaxValue(value);
    };

    /* Gestione dello Slider per la distanza */
    const handleMinChangeDistance = (event) => {
        let value = parseFloat(event.target.value); // Usa parseFloat per supportare i decimali
        if (value >= maxValueDistance - 0.1) { // Assicura che ci sia almeno uno spazio di 0.1 tra min e max
            value = maxValueDistance - 0.1;
        }
        setMinValueDistance(parseFloat(value.toFixed(1))); // Arrotonda a 1 decimale
    };

    const handleMaxChangeDistance = (event) => {
        let value = parseFloat(event.target.value); // Usa parseFloat per supportare i decimali
        if (value <= minValueDistance + 0.1) { // Assicura che ci sia almeno uno spazio di 0.1 tra min e max
            value = minValueDistance + 0.1;
        }
        setMaxValueDistance(parseFloat(value.toFixed(1))); // Arrotonda a 1 decimale
    };


    return (
        <div className="popUpContainer">
            <div className="filterHeader">
                <h1>Seleziona filtri</h1>
                <img src="src\Components\ButtonFilter\FilterPopUp\assets\x-10329.svg" width="20px" height="20px" onClick={closePopup} />
            </div>
            <div className="orderTitle">
                <h2>
                    Ordina per:
                </h2>
            </div>
            <Swiper
                modules={[Pagination]} // Necessario per impostare i pallini
                spaceBetween={10} // Spazio tra gli slider
                slidesPerView="3" // Imposta la visualizzazione 
                pagination={{ clickable: true }} // Inserisci pallini sotto gli slides
                breakpoints={{
                    600: { slidesPerView: "5" }
                }}
                className="filterSwiper" // Classe per personalizzare lo stile
            >
                {elements.order.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="swiper-slide"><FilterElement name={item} /></div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="filterTitle">
                <h2>
                    Filtra per:
                </h2>
            </div>
            <Swiper
                modules={[Pagination]} // Necessario per impostare i pallini
                spaceBetween={10} // Spazio tra gli slider
                slidesPerView="3" // Imposta la visualizzazione 
                pagination={{ clickable: true }} // Inserisci pallini sotto gli slides
                breakpoints={{
                    600: { slidesPerView: "5" }
                }}
                className="filterSwiper" // Classe per personalizzare lo stile
            >
                {elements.filter.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="swiper-slide"><FilterElement name={item} /></div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="priceTitle">
                <h2>Prezzo: </h2>
                <div className="slider-values">
                    <h3>{minValue} € - {maxValue} €</h3>
                </div>
            </div>


            {/* Slider per il prezzo*/}
            <div className="range-slider">
                <input
                    type="range"
                    min="1"
                    max="99"
                    value={minValue}
                    onChange={handleMinChange}
                    className="slider-min"
                />
                <input
                    type="range"
                    min="2"
                    max="100"
                    value={maxValue}
                    onChange={handleMaxChange}
                    className="slider-max"
                />
                <div
                    className="slider-track"
                    style={{
                        left: `${minValue + 1}%`,           /* definisce la lunghezza del track contenuto tra minValue e maxValue */
                        right: `${100 - maxValue + 2}%`,
                    }}
                ></div>

                {/* Slider per la distanza */}
                <div className="distanceTitle">
                    <h2>Distanza: </h2>
                    <div className="slider-values">
                        <h3>{minValueDistance} Km - {maxValueDistance} Km</h3>
                    </div>
                </div>
                <div className="range-slider">
                    <input
                        type="range"
                        min="0.1"
                        max="9"
                        step="0.1"          // Imposta step per supportare decimali
                        value={minValueDistance}
                        onChange={handleMinChangeDistance}
                        className="slider-min"
                    />
                    <input
                        type="range"
                        min="0.2"
                        max="10"
                        step="0.1"
                        value={maxValueDistance}
                        onChange={handleMaxChangeDistance}
                        className="slider-max"
                    />
                    <div
                        className="slider-track"            //sistemare calcoli
                        style={{
                            left: `${((minValueDistance - 0.1) / (10 - 0.1)) * 100 + 2}%`,
                            width: `${((maxValueDistance - minValueDistance) / (10 - 0.1)) * 100 - 4}%`,
                        }}

                    ></div>
                </div>




                <div className="position">
                    <div className="manualPosition">
                        <SearchBar placeholder="Inserisci l'indirizzo" />
                    </div>
                    <div className="autoPosition">
                        <PositionButton />
                    </div>
                </div>
                <div className="finalButton">
                    <ShowButton onclick={closePopup} />
                </div>
            </div>
        </div>
    )
}