import React, { useState, useEffect } from 'react';
import Slider from './Slider/Slider';
import './SliderContainer.css';
import Popup from '../Popup/Popup';
import { useUserContext } from '../../Context/UserContext';
import { useLocation } from 'react-router-dom';
import LoadingPage from '../../Pages/LoadingPage/LoadingPage';
import { cancelReservationUpdater } from './UpdaterOperation/CancelReservation';
import { refuseReservationUpdater } from './UpdaterOperation/RefuseReservation';
import { acceptReservationUpdater } from './UpdaterOperation/AcceptReservation';
import PopupError from '../PopupError/PopupError';
import { pickUpReservationUpdater } from './UpdaterOperation/PikUpReservation';
import { deliverReservationUpdater } from './UpdaterOperation/DeliverReservation';
import { backToPickUpReservationUpdater } from './UpdaterOperation/BackToPickUpReservation';
import { backToAcceptReservationUpdater } from './UpdaterOperation/BackToAcceptReservation';

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

const SliderContainer = ({ reservationData, onPageUpdater, pickupDate, reservationCode}) => {


    const [mainValue, setMainValue] = useState(0);
    const [totalData, setTotalData] = useState([]);
    const [mainStates, setMainStates] = useState([]);
    const { userType } = useUserContext();   // Contesto dell'utente, determina userType

    const [showPopupReject, setshowPopupReject] = useState(false);
    const [response, setResponse] = useState(null);
    const [buttonVisibility, setbuttonVisibility] = useState(true);

    const [showPopupRejectConsumer, setshowPopupRejectConsumer] = useState(false);
    const [responseConsumer, setResponseConsumer] = useState(false);
    const [buttonVisibilityConsumer, setbuttonVisibilityConsumer] = useState(true);

    const [showPopupError, setShowPopupError] = useState(false);
    const [contentPopupError, setContentPopupError] = useState([]);

    const [showPopupAccept, setshowPopupAccept] = useState(false);
    const [responseAccept, setResponseAccept] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        console.log("Dati arrivati in slider");
        setTotalData(reservationData);
    }, [reservationData]);

    const getMainValueFromStatus = (status) => {
        const statusToValueMap = {
            prenotato: 0,
            accettato: 1,
            da_ritirare: 2,
            ritirato: 3,
            annullato: 3,
            rifiutato: 1,
        };

        return statusToValueMap[status] || 0;
    };


    // Funzione per popolare `mainStates` in base ai dati ricevuti
    useEffect(() => {

        const value = getMainValueFromStatus(totalData.status);
        console.log(totalData);
        let states = [];
        switch (totalData.status) {
            case 'annullato':
                states = [
                    { key: 'prenotato', label: 'Prenotato', date: totalData.reservationDate },
                    { key: 'accettato', label: 'Accettato', date: totalData.confirmationDate },
                    { key: 'da_ritirare', label: 'Da ritirare', date: totalData.expectedPickupDate },
                    { key: 'annullato', label: 'Cancellato', date: totalData.expirationDate },
                ];
                break;

            case 'rifiutato':
                states = [
                    { key: 'prenotato', label: 'Prenotato', date: totalData.reservationDate },
                    { key: 'rifiutato', label: 'Rifiutato', date: totalData.expirationDate },
                ];
                break;

            default:
                states = [
                    { key: 'prenotato', label: 'Prenotato', date: totalData.reservationDate },
                    { key: 'accettato', label: 'Accettato', date: totalData.confirmationDate },
                    { key: 'da_ritirare', label: 'Da ritirare', date: totalData.expectedPickupDate },
                    { key: 'ritirato', label: 'Ritirato', date: totalData.actualPickupDate },
                ];
                break;
        }
        setMainStates(states);
        setMainValue(value);
        if (states)
            setLoading(false);

    }, [totalData]);



    const handlePopupClose = (result) => {
        setResponse(result);
        if (result)
            refuseReservationUpdater(totalData.id, onPageUpdater);


        setshowPopupReject(false);
    };

    const handlePopupAcceptClose = (result) => {
        setResponseAccept(result);

        if (result)
            acceptReservationUpdater(totalData.id, onPageUpdater);
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

    const updateSecureState = (state) => {
        console.log("stato ARRIVATO:", state);
    
        if (state === "da_ritirare") {
            const today = new Date(); // Data di oggi
            const [day, month, year] = pickupDate.date.split("/").map((val) => parseInt(val, 10)); // Converte la data in componenti numerici
            const selectedDate = new Date(year, month - 1, day); // Crea un oggetto Date dalla data selezionata
    
            // Controlla se uno dei campi è vuoto
            if (!pickupDate.date || !pickupDate.time || !pickupDate.maxBookingTime) {
                setContentPopupError({
                    mainText: "Errore: Compila tutti i campi richiesti!",
                    secondText: "Per favore, verifica che tutti i campi siano completi e riprova."
                });
                setShowPopupError(true);  
            } 
            // Controlla se la data è inferiore a oggi
            else if (selectedDate < today) {
                setContentPopupError({
                    mainText: "La data non può essere inferiore a quella di oggi!",
                    secondText: "Per favore, verifica che tutti i campi siano completi e riprova."
                });
                setShowPopupError(true);
             } 
            // Controlla se i giorni sono negativi
            else if (pickupDate.maxBookingTime < 0) {
                setContentPopupError({
                    mainText: "I giorni non possono essere negativi!",
                    secondText: "Per favore, verifica che tutti i campi siano completi e riprova."
                });
                setShowPopupError(true);
            } 
            else {
                // Esegui l'operazione di aggiornamento se tutti i controlli sono validi
                pickUpReservationUpdater(
                    {
                        reservationUuid: totalData.id,
                        data: pickupDate.date,
                        ora: pickupDate.time,
                        giorni: pickupDate.maxBookingTime,
                    },
                    onPageUpdater
                );
            }
        }
        else if (state === "ritirato") {
            if(reservationCode.length !== 6){
                setContentPopupError({
                    mainText: "Il codice deve essere di 6 caratteri!",
                    secondText: "Per favore, verifica che tutti il campo codice ritiro sia corretto."
                });
                setShowPopupError(true);
            }
            else{
                deliverReservationUpdater(
                    {
                        reservationUuid: totalData.id,
                        reservationCode: reservationCode,
                    },
                    onPageUpdater
                );
            }
        }
        else if (state === "da_ritirareS"){
            backToPickUpReservationUpdater(totalData.id, onPageUpdater);
        }
        else if (state === "accettatoS"){
            backToAcceptReservationUpdater(totalData.id, onPageUpdater);
        }
    };
    

    const popuopErrorDateHandleClose = () =>{
        setShowPopupError(false);
    }

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
            cancelReservationUpdater(totalData.id, onPageUpdater);
            setbuttonVisibilityConsumer(false);
            setMainStates((prevStates) => [
                ...prevStates.slice(0, 3), // Mantiene i primi tre step
                { key: 'annullato', label: 'Cancellato', date: null } // Aggiunge il nuovo record
            ]);
            setMainValue(3);
        }
    }, [responseConsumer]); // Osserva il valore di mainValue


    if (loading) return <div><LoadingPage /></div>;
    if (error) return <div>Errore: {error}</div>;

    return (
        <div className="slider-wrapper">
            {userType === "NegA" && <span className='slider-text'><h4>Trascina la pallina sullo stato desiderato</h4></span>}
            <Slider
                mainValue={mainValue}
                mainStates={mainStates}
                onValueChange={setMainValue}
                onStateChange={setMainStates}
                showPopupReject={setshowPopupReject}
                popUpResponseReject={response}
                showPopupAccept={setshowPopupAccept}
                popUpResponseAccept={responseAccept}
                updateSecureState={updateSecureState}
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
                    (userType === "ConA") &&
                    mainValue === 0) &&
                    (<button className="refuse-button" onClick={() => { setshowPopupRejectConsumer(true) }}>Annulla prenotazione</button>)}
            </span>

            <div className='slider-popup'>
                {showPopupReject && (
                    <Popup
                        importantText="Sei sicuro di voler RIFIUTARE la prenotazione?"
                        subText="Questa azione è irreversibile."
                        confirmText="RIFIUTA"
                        cancelText="Torna indietro"
                        onClose={handlePopupClose}
                    />
                )}

                {showPopupAccept && (
                    <Popup
                        importantText="Sei sicuro di voler ACCETTARE la prenotazione?"
                        subText="Questa azione è irreversibile."
                        confirmText="ACCETTA"
                        cancelText="Torna indietro"
                        onClose={handlePopupAcceptClose}
                    />
                )}

                {showPopupRejectConsumer && (
                    <Popup
                        importantText="Sei sicuro di voler ANNULLARE la prenotazione?"
                        subText="Questa azione è irreversibile."
                        confirmText="ANNULLARE"
                        cancelText="Torna indietro"
                        onClose={handleRejectConsumer}
                    />
                )}

                {showPopupError && <PopupError
                    errorMessage={contentPopupError.mainText}
                    subText={contentPopupError.secondText}
                    handleClose = {popuopErrorDateHandleClose}
                />}

            </div>
        </div>
    );
};

export default SliderContainer;
