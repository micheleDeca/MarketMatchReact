import { useState } from "react";
import FilterElement from "./FilterElement/FilterElement";
import "./FilterPopUp.css";
import SearchBar from "../../SearchBar/SearchBar";
import PositionButton from "./PositionButton/PositionButton";
import ShowButton from "./ShowButton/ShowButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import '../../../../node_modules/swiper/swiper-bundle.min.css';

export default function FilterPopUp(elements) {

    //ISA FORSE lo slider per la posizione, deve apparire quando si seleziona il filtro "più vicino a te"

    const isWideRange = elements.type == "Neg, Prod" || elements.type == "ConA, Prod";  //range per il prezzo

    // Funzione per chiudere la popup
    const closePopup = () => {
        elements.setState((prev) => !prev);
    };

    /* Gestione dello Slider per il prezzo */
    const [minValue, setMinValue] = useState(1); // Valore minimo
    const [maxValue, setMaxValue] = useState(isWideRange ? 100 : 5); // Valore massimo

    /* Gestione dello Slider per la distanza */
    const [minValueDistance, setMinValueDistance] = useState(0.1); // Valore minimo
    const [maxValueDistance, setMaxValueDistance] = useState(10); // Valore massimo

    // Event handler per i valori di prezzo
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

    // Event handler per i valori di distanza
    const handleMinChangeDistance = (event) => {
        let value = parseFloat(event.target.value); // Usa parseFloat per supportare i decimali
        if (value >= maxValueDistance - 0.1) {
            value = maxValueDistance - 0.1;
        }
        setMinValueDistance(parseFloat(value.toFixed(1))); // Arrotonda a 1 decimale
    };

    const handleMaxChangeDistance = (event) => {
        let value = parseFloat(event.target.value); // Usa parseFloat per supportare i decimali
        if (value <= minValueDistance + 0.1) {
            value = minValueDistance + 0.1;
        }
        setMaxValueDistance(parseFloat(value.toFixed(1))); // Arrotonda a 1 decimale
    };

    const priceTypes = ["ConA, Prod", "ConA, Ric", "Neg, Prod"];
    const distanceTypes = ["ConA, Prod", "ConA, Neg"];


    return (
        <div className="popUpContainer">
            <div className="filterHeader">
                <h1>Seleziona filtri</h1>
                <img
                    src="src\\Components\\ButtonFilter\\FilterPopUp\\assets\\x-10329.svg"
                    width="20px"
                    height="20px"
                    onClick={closePopup}
                    alt="Chiudi"
                />
            </div>

            {/* Slider Ordina */}
            <div className="orderTitle">
                <h2>Ordina per:</h2>
            </div>
             <Swiper
                modules={[Pagination]}
                spaceBetween={20}
                slidesPerView="3"
                pagination={{ clickable: true }}
                breakpoints={{
                    600: { slidesPerView: "5" }
                }}
                className="filterSwiper"
            >
                {elements.order.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="swiper-slide">
                            <FilterElement name={item} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
 
            {/* Slider Filtra */}
            <div className="filterTitle">
                <h2>Filtra per:</h2>
            </div>
            <Swiper
                modules={[Pagination]}
                spaceBetween={20}
                slidesPerView="3"
                pagination={{ clickable: true }}
                breakpoints={{
                    600: { slidesPerView: "5" }
                }}
                className="filterSwiper"
            >
                {elements.filter.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="swiper-slide">
                            <FilterElement name={item} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Filtri prezzo */}
            {priceTypes.includes(elements.type) && (
                <>
                    <div className="priceTitle">
                        <h2>Prezzo:</h2>
                        <div className="slider-values">
                            <h3>
                                {isWideRange ? `${minValue} € - ${maxValue} €` : `${minValue} - ${maxValue}`}
                            </h3>
                        </div>
                    </div>
                    <div className="range-slider">
                        <input
                            type="range"
                            min="1"
                            max={isWideRange ? 99 : 4}
                            value={minValue}
                            onChange={handleMinChange}
                            className="slider-min"
                        />
                        <input
                            type="range"
                            min="2"
                            max={isWideRange ? 100 : 5}
                            value={maxValue}
                            onChange={handleMaxChange}
                            className="slider-max"
                        />
                        <div
                            className="slider-track"
                            style={{
                                left: `${((minValue - 1) / (isWideRange ? 99 - 1 : 4)) * 100 }%`,
                                right: `${100 - ((maxValue - 1) / (isWideRange ? 99 - 1 : 4)) * 100 + 1}%`
                            }}
                        ></div>
                    </div>
                </>
            )}

            {/* Filtri distanza */}
            {distanceTypes.includes(elements.type) && (
                <>
                    <div className="distanceTitle">
                        <h2>Distanza:</h2>
                        <div className="slider-values">
                            <h3>
                                {minValueDistance} Km - {maxValueDistance} Km
                            </h3>
                        </div>
                    </div>
                    <div className="range-slider">
                        <input
                            type="range"
                            min="0.1"
                            max="9"
                            step="0.1"
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
                            className="slider-track"
                            style={{
                                left: `${((minValueDistance - 0.1) / (10 - 0.1)) * 100}%`,
                                width: `${((maxValueDistance - minValueDistance) / (10 - 0.1)) * 100}%`
                            }}
                        ></div>
                    </div>

                    {/* Posizione */}
                    <div className="position">
                        <div className="manualPosition">
                            <SearchBar placeholder="Inserisci l'indirizzo" />
                        </div>
                        <div className="autoPosition">
                            <PositionButton />
                        </div>
                    </div>
                </>)}

            {/* Bottone finale */}
            <div className="finalButton">
                <ShowButton onclick={closePopup} />
            </div>
        </div>
    );
}
