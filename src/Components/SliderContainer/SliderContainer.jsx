import React, { useState, useEffect } from 'react';
import Slider from './Slider/Slider';
import './SliderContainer.css';
import Popup from '../Popup/Popup';

const SliderContainer = () => {

    const [mainValue, setMainValue] = useState(0);
    const [mainStates, setMainStates] = useState([
        { key: 'prenotato', label: 'Prenotato', date: "12/11/2024, 11:36" },
        { key: 'accettato', label: 'Accettato', date: null },
        { key: 'da_ritirare', label: 'Da ritirare', date: null },
        { key: 'ritirato', label: 'Ritirato', date: null },
    ]);

    const [showPopupReject, setshowPopupReject] = useState(false);
    const [response, setResponse] = useState(null);
    const [buttonVisibility, setbuttonVisibility] = useState(true);

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

    // Funzione per gestire annulla (sistema)
    const handleCancel = () => {
        setMainStates((prevStates) => [
            ...prevStates.slice(0, 3), // Mantiene i primi tre step
            { key: 'cancellato', label: 'Cancellato', date: null } // Aggiunge il nuovo record
        ]);
        setMainValue(3);
    };
    
    

     

    // useEffect per reagire ai cambiamenti di mainValue e settare la visilità del tasto rifiuta
    useEffect(() => {
        if (mainValue != 0) {
            setbuttonVisibility(false);
        }
    }, [mainValue]); // Osserva il valore di mainValue



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
                canGoBack={false}
                maxValueGoBack={1}
            />
            <span className="slider-button">
                {(!response && buttonVisibility) && (<button className="refuse-button" onClick={() => { handleReject() }}>Rifiuta prenotazione</button>)}
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
            </div>
        </div>
    );
};

export default SliderContainer;
