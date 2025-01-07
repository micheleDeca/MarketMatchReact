import React, { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import './Slider.css';

/**
 * Props da passare al componente Slider per richiamarlo correttamente:
 * 
 * @prop {number} mainValue - Il valore attuale dello slider, che rappresenta l'indice dello stato selezionato. (es. 0)
 * @prop {Array<Object>} mainStates - L'elenco degli stati iniziali da visualizzare nello slider. Ogni oggetto deve contenere:
 *    - {string|number} key - Chiave univoca per identificare lo stato. (es. "prenotato", 1)
 *    - {string} label - Etichetta descrittiva per lo stato. (es. "Prenotato", "Accettato")
 *    - {string|null} date - Data associata allo stato. Se `null`, nessuna data è associata. (es. "12/12/2024, 10:00")
 * 
 * @prop {boolean} canGoBack - Indica se è possibile tornare indietro nello slider. Se `false`, impedisce di selezionare uno stato precedente al valore attuale. (es. true/false)
 * @prop {number} maxValueGoBack - Valore massimo consentito per tornare indietro nello slider. (es. 1)
 * 
 * @prop {function} showPopupReject - Funzione chiamata per mostrare il popup di rifiuto. (es. `showPopupReject(true)`)
 * @prop {function} showPopupAccept - Funzione chiamata per mostrare il popup di accettazione. (es. `showPopupAccept(true)`)
 * @prop {function} onValueChange - Funzione per aggiornare il valore dello slider. Riceve il nuovo valore come parametro. (es. `(val) => setValue(val)`)
 * @prop {function} onStateChange - Funzione per aggiornare gli stati dello slider. Riceve un callback con lo stato precedente come parametro. (es. `(callback) => setStates(callback)`)
 * 
 * @prop {boolean|null} popUpResponseReject - Risposta dell'utente al popup di rifiuto. `true` per accettare, `false` per annullare. (es. true/false/null)
 * @prop {boolean|null} popUpResponseAccept - Risposta dell'utente al popup di accettazione. `true` per accettare, `false` per annullare. (es. true/false/null)
 * 
 * Comportamento:
 * - Lo slider consente di cambiare stato selezionando un valore da `0` a `mainStates.length - 1`.
 * - Impedisce di saltare stati o tornare indietro se le condizioni non sono soddisfatte.
 * - Mostra popup per confermare le azioni di rifiuto o accettazione.
 * - Aggiorna la data associata a uno stato quando viene selezionato.
 * 
 * Esempio di utilizzo:
 * const mainStates = [
 *   { key: 'prenotato', label: 'Prenotato', date: "10/12/2024" },
 *   { key: 'accettato', label: 'Accettato', date: null },
 *   { key: 'da_ritirare', label: 'Da ritirare', date: null },
 *   { key: 'ritirato', label: 'Ritirato', date: null },
 * ];
 * 
 * <Slider
*    mainValue={mainValue}
*    mainStates={mainStates}
*    onValueChange={setMainValue}
*    onStateChange={setMainStates}
*    showPopupReject={setshowPopupReject}
*    popUpResponseReject={response}
*    showPopupAccept={setshowPopupAccept}
*    popUpResponseAccept={responseAccept}
*    canGoBack={false}
*    maxValueGoBack={1}
*  />
 */

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

        // Se canGoBack è false e si tenta di tornare indietro, impedisce il movimento
        if (!props.canGoBack && val < mainValue) {
            console.log("Non è permesso tornare indietro!");
            return;
        }

        // Se canGoForward è false e si tenta di andare avanti, impedisce il movimento
        if (props.canGoForward === false && val > mainValue) {
            console.log("Non è permesso andare avanti!");
            return;
        }

        if (props.canGoBack && val < mainValue && props.maxValueGoBack === (val + 1)) {
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
           console.log("indietro");
           props.updateSecureState(mainStates[val].key + "S");

        }
        else{
            props.updateSecureState(mainStates[val].key);
        }

        // Aggiorna il valore dello slider
        //props.onValueChange(val);

        /*
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
        ); */
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
                    thumbClassName={`thumb-horizontal thumb-${mainStates.length === 2 && mainValue === 1
                        ? '4'
                        : mainStates[mainStates.length - 1].key === "annullato" && mainValue === mainStates.length - 1
                            ? '5'
                            : mainValue
                        }`} // Stile per il "thumb" (indicatore)
                    trackClassName={`track-horizontal ${mainValue > 0 ? `filled-${mainValue}` : ''}`} // Stile per il "track" (barra dello slider)
                    min={0} // Valore minimo dello slider
                    max={mainStates.length - 1} // Valore massimo basato sul numero di stati
                    value={mainValue} // Valore attuale dello slider
                    onChange={handleMainChange} // Funzione chiamata al cambio di valore
                    renderTrack={({ key, ...rest }, state) => (
                        <div
                            key={key} // Passiamo esplicitamente il key
                            {...rest} // Spread degli altri props
                            className={`track-horizontal ${state.index === 0 && mainValue > 0
                                ? `filled-${mainStates.length === 2 && mainValue === 1
                                    ? '4'
                                    : mainStates[mainStates.length - 1].key === "annullato" && mainValue === mainStates.length - 1
                                        ? '5'
                                        : mainValue
                                }`
                                : ''
                                }`}
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
