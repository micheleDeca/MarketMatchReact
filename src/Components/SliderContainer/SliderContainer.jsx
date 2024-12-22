import React, { useState, useEffect } from 'react';
import Slider from './Slider/Slider';
import './SliderContainer.css';
import Popup from '../Popup/Popup';
import { useUserContext } from '../../Context/UserContext';
import { useLocation } from 'react-router-dom';

/**
 * Componente SliderContainer:
 * 
 * Descrizione:
 * SliderContainer gestisce uno slider che rappresenta lo stato di una prenotazione e include funzionalità per accettare o rifiutare la prenotazione.
 * Utilizza un componente `Slider` per il controllo dello stato e un componente `Popup` per confermare azioni importanti.
 * 
 * Stato locale (useState):
 * - `mainValue` {number}: Valore attuale dello slider (indice dello stato selezionato). (es. 0)
 * - `mainStates` {Array<Object>}: Array di stati della prenotazione. Ogni oggetto contiene:
 *   - {string} key: Identificatore unico dello stato. (es. "prenotato", "accettato")
 *   - {string} label: Etichetta descrittiva dello stato. (es. "Prenotato", "Accettato")
 *   - {string|null} date: Data associata allo stato (null se non definita).
 * - `showPopupReject` {boolean}: Controlla la visibilità del popup per rifiutare la prenotazione.
 * - `response` {boolean|null}: Risultato dell'azione di rifiuto (true per confermare, false/null per annullare).
 * - `buttonVisibility` {boolean}: Controlla la visibilità del pulsante "Rifiuta prenotazione".
 * - `showPopupAccept` {boolean}: Controlla la visibilità del popup per accettare la prenotazione.
 * - `responseAccept` {boolean|null}: Risultato dell'azione di accettazione (true per confermare, false/null per annullare).
 * 
 * Funzioni:
 * - `handlePopupClose(result)`: Gestisce la chiusura del popup di rifiuto e salva il risultato.
 * - `handlePopupAcceptClose(result)`: Gestisce la chiusura del popup di accettazione e salva il risultato.
 * - `handleReject()`: Aggiorna gli stati per impostare lo stato "Rifiutato".
 * - `handleCancel()`: Aggiunge lo stato "Cancellato" agli stati esistenti e aggiorna lo slider.
 * 
 * useEffect:
 * - Gestisce la visibilità del pulsante "Rifiuta prenotazione" in base a `mainValue`.
 * 
 * Componenti utilizzati:
 * - `Slider`: Componente personalizzato per lo slider.
 * - `Popup`: Componente personalizzato per la conferma di azioni.
 * 
 * Comportamento:
 * - Lo slider consente di cambiare lo stato selezionato.
 * - Il pulsante "Rifiuta prenotazione" consente di rifiutare la prenotazione se visibile.
 * - I popup vengono mostrati per confermare azioni di accettazione o rifiuto.
 * 
 * Esempio di utilizzo:
 * <SliderContainer />
 */

const SliderContainer = () => {

    const [mainValue, setMainValue] = useState(0);
    const [mainStates, setMainStates] = useState([
        { key: 'prenotato', label: 'Prenotato', date: "12/11/2024, 11:36" },
        { key: 'accettato', label: 'Accettato', date: null },
        { key: 'da_ritirare', label: 'Da ritirare', date: null },
        { key: 'ritirato', label: 'Ritirato', date: null },
    ]);

    const { userType } = useUserContext();   // Contesto dell'utente, determina userType

    const [showPopupReject, setshowPopupReject] = useState(false);
    const [response, setResponse] = useState(null);
    const [buttonVisibility, setbuttonVisibility] = useState(true);

    const [showPopupRejectConsumer, setshowPopupRejectConsumer] = useState(false);
    const [responseConsumer, setResponseConsumer] = useState(false);
    const [buttonVisibilityConsumer, setbuttonVisibilityConsumer] = useState(true);

    const [showPopupAccept, setshowPopupAccept] = useState(false);
    const [responseAccept, setResponseAccept] = useState(null);


    const handlePopupClose = (result) => {
        setResponse(result);
        setshowPopupReject(false);
    };

    const handlePopupAcceptClose = (result) => {
        setResponseAccept(result);
        setshowPopupAccept(false);
    };

    // Funzione per gestire il rifiuto
    const handleReject = () => {
        setMainStates((prevStates) => [
            prevStates[0], // Mantiene solo il primo record
            { key: 'rifiutato', label: 'Rifiutato', date: null } // Aggiunge il nuovo record
        ]);
    };

    const handleRejectConsumer = (result) => {
        setResponseConsumer(result);
        setshowPopupRejectConsumer(false);

    };

    // Funzione per gestire annulla (sistema)
    const handleCancel = () => {
        setMainStates((prevStates) => [
            ...prevStates.slice(0, 3), // Mantiene i primi tre step
            { key: 'annullato', label: 'Cancellato', date: null } // Aggiunge il nuovo record
        ]);
        setMainValue(3);
    };



    // useEffect per reagire ai cambiamenti di mainValue e settare la visilità del tasto rifiuta
    useEffect(() => {
        if (mainValue != 0) {
            setbuttonVisibility(false);
        }
    }, [mainValue]); // Osserva il valore di mainValue


    // useEffect per reagire ai cambiamenti di consumatore annulla prenotazione
    useEffect(() => {
        if (responseConsumer) {
            setbuttonVisibilityConsumer(false);
            setMainStates((prevStates) => [
                ...prevStates.slice(0, 3), // Mantiene i primi tre step
                { key: 'annullato', label: 'Cancellato', date: null } // Aggiunge il nuovo record
            ]);
            setMainValue(3);
        }
    }, [responseConsumer]); // Osserva il valore di mainValue


    

    return (
        <div className="slider-wrapper">
            <span className='slider-text'><h4>Trascina la pallina sullo stato desiderato</h4></span>
            <Slider
                mainValue={mainValue}
                mainStates={mainStates}
                onValueChange={setMainValue}
                onStateChange={setMainStates}
                showPopupReject={setshowPopupReject}
                popUpResponseReject={response}
                showPopupAccept={setshowPopupAccept}
                popUpResponseAccept={responseAccept}
                canGoBack={userType === "ConA" ? false : (userType === "NegA" ? true : false)}
                canGoForward={userType === "ConA" ? false : (userType === "NegA" ? true : false)}
                maxValueGoBack={1}
            />
            <span className="slider-button">
                {(!response &&
                    buttonVisibility &&
                    (userType === "NegA")) &&
                    (<button className="refuse-button" onClick={() => { handleReject() }}>Rifiuta prenotazione</button>)}
            </span>
            <span className="slider-button">
                {(!responseConsumer &&
                    buttonVisibilityConsumer &&
                    (userType === "ConA")&& 
                    mainValue === 0) &&
                    (<button className="refuse-button" onClick={() => { setshowPopupRejectConsumer(true) }}>Annulla prenotazione</button>)}
            </span>

            <div className='slider-popup'>
                {showPopupReject && (
                    <Popup
                        importantText="Sei sicuro di voler RIFIUTARE la prenotazione?"
                        subText="Questa azione è irreversibile."
                        confirmText="RIFIUTA"
                        cancelText="Annulla"
                        onClose={handlePopupClose}
                    />
                )}

                {showPopupAccept && (
                    <Popup
                        importantText="Sei sicuro di voler ACCETTARE la prenotazione?"
                        subText="Questa azione è irreversibile."
                        confirmText="ACCETTA"
                        cancelText="Annulla"
                        onClose={handlePopupAcceptClose}
                    />
                )}

                {showPopupRejectConsumer && (
                    <Popup
                        importantText="Sei sicuro di voler ANNULLARE la prenotazione?"
                        subText="Questa azione è irreversibile."
                        confirmText="ANNULLARE"
                        cancelText="Annulla"
                        onClose={handleRejectConsumer}
                    />
                )}

            </div>
        </div>
    );
};

export default SliderContainer;
