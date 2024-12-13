import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import './Slider.css';

/**
  * 
 * @prop {Array<Object>} initialState - L'elenco degli stati iniziali da visualizzare nello slider. Ogni oggetto deve contenere:
 *    - {string|number} key - Chiave univoca per identificare lo stato. (es. "prenotato", 1)
 *    - {string} label - Etichetta descrittiva per lo stato. (es. "Prenotato", "Accettato")
 *    - {string} [date] - Data opzionale associata allo stato. (es. "12/12/2024, 10:00")
 * 
 * @prop {number} initialValue - Il valore iniziale dello slider, che rappresenta l'indice dello stato selezionato. (es. 0)
 * 
 * @prop {boolean} canGoBack - Indica se è possibile tornare indietro nello slider. Se `false`, impedisce di selezionare uno stato precedente al valore attuale. (es. true/false)
 * 
 * 
 * Esempio di utilizzo:
 * 1. Caso 1: Stati standard con "Prenotato", "Accettato", "Da ritirare", "Ritirato".
 * const initialStates = [
 *   { key: 'prenotato', label: 'Prenotato', date: "10/12/2024" },
 *   { key: 'accettato', label: 'Accettato', date: null },
 *   { key: 'da_ritirare', label: 'Da ritirare', date: null },
 *   { key: 'ritirato', label: 'Ritirato', date: null },
 * ];
 * 
 * 
 * 2. Caso 2: Stati con "Prenotato", "Accettato", "Da ritirare", "Annullato".
 * const initialStates = [
 *   { key: 'prenotato', label: 'Prenotato', date: "10/12/2024" },
 *   { key: 'accettato', label: 'Accettato', date: null },
 *   { key: 'da_ritirare', label: 'Da ritirare', date: null },
 *   { key: 'annullato', label: 'Annullato', date: null },
 * ];
 * 
 * 
 * 3. Caso 3: Stati con "Prenotato" e "Rifiutato".
 * const initialStates = [
 *   { key: 'prenotato', label: 'Prenotato', date: "10/12/2024" },
 *   { key: 'rifiutato', label: 'Rifiutato', date: null },
 * ];
 * 
 * <Slider initialState={initialStates} initialValue={0} canGoBack={true} />
 */


const Slider = (props) => {

    const mainValue = props.mainValue;
    const mainStates = props.mainStates;
    /**
     * Funzione chiamata quando il valore dello slider cambia
     * @param {number} val - Nuovo valore dello slider
     */
    const handleMainChange = (val) => {
        // Controlla se è permesso tornare indietro nello slider
        if (!props.canGoBack && val < mainValue) {
            console.log("Non è permesso tornare indietro!");
            return;
        }

        // Aggiorna il valore dello slider
        props.onValueChange(val);

        // Aggiorna lo stato corrispondente con la data corrente
        props.onStateChange((prevStates) =>
            prevStates.map((state, idx) => {
                // Aggiorna solo lo stato corrispondente all'indice attuale dello slider
                if (idx === val) {
                    return {
                        ...state, // Mantieni gli altri dati dello stato
                        date: new Date().toLocaleString('it-IT', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        }), // Aggiungi la data corrente in formato italiano
                    };
                }
                return state; // Restituisci gli stati non modificati
            })
        );

        // Simula un'operazione per aggiornare il database
        console.log(`Aggiornamento DB per stato: ${val}`);


    };

    return (
        <div className="slider-container">
            <br></br><br></br><br></br>



            {/* Contenitore principale dello slider */}
            <div className="main-track">
                <ReactSlider
                    className="horizontal-slider" // Classe CSS per lo stile dello slider
                    thumbClassName={`thumb-horizontal thumb-${((mainStates.length === 2) && (mainValue === 1)) ? '4' : (((mainStates[mainStates.length - 1].key === "annullato") && (mainValue === (mainStates.length - 1))) ? '5' : mainValue)}`} // Stile per il "thumb" (indicatore) 
                    //Il thumb è il "manopola" o "indicatore" che l'utente può trascinare per modificare il valore dello slider
                    trackClassName={`track-horizontal ${mainValue > 0 ? `filled-${mainValue}` : ''}`} // Stile per il "track" (barra dello slider)
                    min={0} // Valore minimo dello slider
                    max={mainStates.length - 1} // Valore massimo basato sul numero di stati
                    value={mainValue} // Valore attuale dello slider
                    onChange={handleMainChange} // Funzione chiamata al cambio di valore
                    //renderThumb={(props) => <div {...props} />} // Personalizzazione del "thumb"
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
