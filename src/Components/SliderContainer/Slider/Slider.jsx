import React, { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import './Slider.css';

const Slider = (props) => {

    const mainValue = props.mainValue;
    const mainStates = props.mainStates;

    /**
     * Funzione chiamata quando il valore dello slider cambia
     * @param {number} val - Nuovo valore dello slider
     */
    const handleMainChange = (val) => {
        // Impedisce di saltare stati
        if (Math.abs(val - mainValue) > 1) {
            console.log("Non puoi saltare stati!");
            return;
        }

        if (!props.canGoBack && val < mainValue && props.maxValueGoBack === (val + 1)) {
            console.log("Non è permesso tornare indietro!");
            return;
        }

        // Quando lo stato è "rifiutato", mostra il popup
        if (mainStates[val].key === "rifiutato") {
            props.showPopupReject(true);
            return; // Esci dalla funzione per aspettare la risposta del popup
        }

        if ((mainStates[val].key === "accettato") && (mainValue < 1)) {
            props.showPopupAccept(true);
            return; // Esci dalla funzione per aspettare la risposta del popup
        }

        // Se si sposta indietro, cancella la data del campo associato
        if (val < mainValue) {
            props.onStateChange((prevStates) =>
                prevStates.map((state, idx) => {
                    if (idx > val && idx <= mainValue) {
                        return {
                            ...state,
                            date: null, // Rimuove la data
                        };
                    }
                    return state;
                })
            );
        }

        // Aggiorna il valore dello slider
        props.onValueChange(val);

        // Aggiorna gli stati con la data corrente
        props.onStateChange((prevStates) =>
            prevStates.map((state, idx) => {
                if (idx === val) {
                    return {
                        ...state,
                        date: new Date().toLocaleString('it-IT', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        }),
                    };
                }
                return state;
            })
        );

        console.log(`Aggiornamento DB per stato: ${val}`);
    };

    useEffect(() => {
        if (props.popUpResponseReject === true) {
            props.onValueChange(1);
            props.onStateChange((prevStates) =>
                prevStates.map((state) => {
                    if (state.key === "rifiutato") {
                        return {
                            ...state,
                            date: new Date().toLocaleString('it-IT', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            }),
                        };
                    }
                    return state;
                })
            );
        } else if (props.popUpResponseReject === false) {
            console.log("Popup annullato. Nessun aggiornamento dello stato.");
        }
    }, [props.popUpResponseReject]);

    useEffect(() => {
        if (props.popUpResponseAccept === true) {
            props.onValueChange(1);
            props.onStateChange((prevStates) =>
                prevStates.map((state) => {
                    if (state.key === "accettato") {
                        return {
                            ...state,
                            date: new Date().toLocaleString('it-IT', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            }),
                        };
                    }
                    return state;
                })
            );
        } else if (props.popUpResponseAccept === false) {
            console.log("Popup annullato. Nessun aggiornamento dello stato.");
        }
    }, [props.popUpResponseAccept]);

    return (
        <div className="slider-container">
            <br></br><br></br><br></br>

            {/* Contenitore principale dello slider */}
            <div className="main-track">
                <ReactSlider
                    className="horizontal-slider" // Classe CSS per lo stile dello slider
                    thumbClassName={`thumb-horizontal thumb-${((mainStates.length === 2) && (mainValue === 1)) ? '4' : (((mainStates[mainStates.length - 1].key === "annullato") && (mainValue === (mainStates.length - 1))) ? '5' : mainValue)}`} // Stile per il "thumb" (indicatore) 
                    trackClassName={`track-horizontal ${mainValue > 0 ? `filled-${mainValue}` : ''}`} // Stile per il "track" (barra dello slider)
                    min={0} // Valore minimo dello slider
                    max={mainStates.length - 1} // Valore massimo basato sul numero di stati
                    value={mainValue} // Valore attuale dello slider
                    onChange={handleMainChange} // Funzione chiamata al cambio di valore
                    renderTrack={(props, state) => (
                        <div
                            {...props}
                            className={`track-horizontal ${state.index === 0 && mainValue > 0 ? `filled-${((mainStates.length === 2) && (mainValue === 1)) ? '4' : (((mainStates[mainStates.length - 1].key === "annullato") && (mainValue === (mainStates.length - 1))) ? '5' : mainValue)}` : ''}`}
                        />
                    )} // Personalizzazione del "track"
                />

                {/* Contenitore delle etichette */}
                <div className="labels-container">
                    {mainStates.map((st, idx) => (
                        <div
                            key={st.key} // Chiave univoca per ogni etichetta
                            className={`label ${mainValue === idx ? 'active' : ''} ${st.key === "rifiutato" ? 'label-4' : `label-${idx}`}`} // Classe CSS dinamica
                        >
                            <span>{st.label}</span> {/* Mostra il testo dell'etichetta */}
                            {st.date && (
                                <div className="date">{st.date}</div> // Mostra la data se disponibile
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slider;
