import { useEffect, useState } from "react";
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
    const [minValueDistance] = useState(0.0); // Valore minimo
    const [maxValueDistance, setMaxValueDistance] = useState(10); // Valore massimo

    // Event handler per i valori di prezzo
    const handleMinChange = (event) => {
        let value = Number(event.target.value);
        if (value >= maxValue) {
            value = maxValue - 1; // Impedisce che il minimo superi il massimo
        }
        setMinValue(value);
        elements.onStateChange('minPrezzo', value); // Passa chiave e valore per notificare il padre della modifica dell'input
    };

    const handleMaxChange = (event) => {
        let value = Number(event.target.value);
        if (value <= minValue) {
            value = minValue + 1; // Impedisce che il massimo vada sotto il minimo
        }
        setMaxValue(value);
        elements.onStateChange('maxPrezzo', value); // Passa chiave e valore per notificare il padre della modifica dell'input
    };

    // Event handler per i valori di distanza
    const handleMaxChangeDistance = (event) => {
        let value = parseFloat(event.target.value); // Usa parseFloat per supportare i decimali
        if (value <= minValueDistance + 0.1) {
            value = minValueDistance + 0.1;
        }
        setMaxValueDistance(parseFloat(value.toFixed(1))); // Arrotonda a 1 decimale
        elements.onStateChange('maxDistance', parseFloat(value.toFixed(1))); // Passa chiave e valore per notificare il padre della modifica dell'input
    };

    const priceTypes = ["ConA, Prod", "ConA, Ric", "Neg, Prod"];
    const distanceTypes = ["ConA, Prod", "ConA, Neg"];

    const [selectedFilters, setSelectedFilters] = useState({
        ordinamento: "", // array per i filtri di ordinamento
        filtri: [] // array per gli altri filtri
    }); // Stato per i filtri selezionati

    const [filterVicinoAte, setFilterVicinoAte] = useState(false); // Stato per il filtro "Più vicini a te"

    useEffect(() => {
        if (elements.type === "ConA, Neg") {
            setFilterVicinoAte(true);
        }
    }, [elements.type]); // L'effetto viene eseguito solo quando cambia `elements.type`

    // Funzione per gestire la selezione dei filtri
    const handleFilterClick = (filterName) => {

        setSelectedFilters((prev) => {
            // Inizializziamo una variabile per il nuovo stato, con oggetto che contiene ordinamenti e filtri
            const newState = {
                ordinamento: prev.ordinamento,
                filtri: [...prev.filtri]
            };

            // Se il filtro è uno di quelli relativi all'ordinamento (prezzo, nome/rilevanza, quantità), escludiamo gli altri
            if (elements.order.includes(filterName)) {
                if (newState.ordinamento === filterName) {
                    newState.ordinamento = ""; // se l'ordinamento era già selezionato, lo si deseleziona
                } else {
                    // Se non è selezionato, Aggiungiamo il filtro ordinamento selezionato
                    newState.ordinamento = filterName;
                }

                elements.onStateChange('sortOrder', newState.ordinamento); // Passa chiave e valore per notificare il padre della modifica dell'input

            } else {
                // Gestione degli altri filtri (non di ordinamento), aggiungiamo o rimuoviamo senza restrizioni
                if (newState.filtri.includes(filterName)) {
                    newState.filtri = newState.filtri.filter((name) => name !== filterName); // Rimuoviamo il filtro se è già selezionato
                } else {
                    if(filterName === "Più vicini a Te"){
                        setFilterVicinoAte(true);  // Attiviamo il filtro "Più vicini a Te"
                    } else {
                        newState.filtri.push(filterName); // Aggiungiamo il filtro se non è già selezionato
                    }
                }

                if (newState.filtri.includes("In promozione")) {
                    elements.onStateChange('filterPrezzoOfferta', true); // Imposta il filtro per i prodotti in promozione
                } else {
                    elements.onStateChange('categories', newState.filtri); // Passa chiave e valore per notificare il padre della modifica dell'input
                }
            }
            return newState; // Restituiamo l'oggetto con gli ordinamenti e i filtri separati
        });

    };

    console.log(selectedFilters);
    //console.log(minValueDistance, maxValueDistance);


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
                            <FilterElement name={item} onFilterClick={() => handleFilterClick(item)} selectedOrder={selectedFilters.ordinamento}
                                order={elements.order} />
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
                            <FilterElement name={item} onFilterClick={() => handleFilterClick(item)} selectedFilters={selectedFilters.filtri}
                                order={elements.order} />
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
                                left: `${((minValue - 1) / (isWideRange ? 99 - 1 : 4)) * 100}%`,
                                right: `${100 - ((maxValue - 1) / (isWideRange ? 99 - 1 : 4)) * 100 + 1}%`
                            }}
                        ></div>
                    </div>
                </>
            )}

            {/* Filtri distanza */}
            {distanceTypes.includes(elements.type) && (filterVicinoAte === true) && (
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
                            max="10"
                            step="0.1"
                            value={maxValueDistance}
                            onChange={handleMaxChangeDistance}
                            className="slider-max"
                        />
                        <div
                            className="slider-track"
                            style={{
                                left: `${((minValueDistance - 0.1) / (10 - 0.1)) * 100 + 1}%`,
                                width: `${((maxValueDistance - minValueDistance) / (10 - 0.1)) * 100 - 1}%`
                            }}
                        ></div>
                    </div>

                    {/* Posizione */}
                    <div className="position">
                        <div className="manualPosition">
                            <SearchBar onStateChange={elements.onStateChange} placeholder="Inserisci l'indirizzo" type="posizione"/>
                        </div>
                        <div className="autoPosition">
                            <PositionButton onPosChange={elements.onStateChange} />
                        </div>
                    </div>
                </>)}

            {/* Bottone finale */}
            <div className="finalButton">
                <ShowButton onSendChange={elements.onStateChange} onclick={closePopup} />
            </div>
        </div>
    );
}
