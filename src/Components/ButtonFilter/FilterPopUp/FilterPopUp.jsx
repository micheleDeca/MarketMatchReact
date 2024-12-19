import { useState } from "react";
import FilterElement from "./FilterElement/FilterElement";
import './FilterPopUp.css'
import SearchBar from "../../SearchBar/SearchBar";
import PositionButton from "./PositionButton/PositionButton";
import ShowButton from "./ShowButton/ShowButton";
import { Swiper, SwiperSlide } from "swiper/react";

export default function FilterPopUp(elements) {

  // Funzione per chiudere la popup
  const closePopup = () => {
    elements.setState((prev) => !prev);
  };

    /* Gestione dello Slider per il prezzo */
    const [minValue, setMinValue] = useState(1); // Valore minimo
    const [maxValue, setMaxValue] = useState(100); // Valore massimo

    
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
                    spaceBetween={10} // Spazio tra gli slider
                    slidesPerView="5" // Imposta la visualizzazione automatica in base alla larghezza degli elementi
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
                    spaceBetween={10}
                    slidesPerView="5"
                    className="filterSwiper"
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
                        left: `${minValue - 1}%`,           /* definisce la lunghezza del track contenuto tra minValue e maxValue */
                        right: `${100 - maxValue}%`,
                    }}
                ></div>


                <div className="position">
                    <div className="manualPosition">
                    <SearchBar />
                    </div>
                    <div className="autoPosition">
                    <PositionButton />
                    </div>
                </div>
                <div className="finalButton">
                    <ShowButton onclick={closePopup}/>
                </div>
            </div>
        </div>
    )
}