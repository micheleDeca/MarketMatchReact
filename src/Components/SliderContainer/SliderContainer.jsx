import React, { useState, useEffect  } from 'react';
import Slider from './Slider/Slider';
import './SliderContainer.css';
import Popup from '../Popup/Popup';

const SliderContainer = () => {

    const [mainValue, setMainValue] = useState(0);
    const [mainStates, setMainStates] = useState([
        { key: 'prenotato', label: 'Prenotato', date: "12/12/2024, 11:36" },
        { key: 'accettato', label: 'Accettato', date: "12/12/2024, 11:36" },
        { key: 'da_ritirare', label: 'Da ritirare', date: null },
        { key: 'ritirato', label: 'Ritirato', date: null },
    ]);

    const [showPopup, setShowPopupRefuse] = useState(false);
    const [response, setResponse] = useState(null);
    const [buttonVisibility, setbuttonVisibility] = useState(true);


    const handlePopupClose = (result) => {
        setResponse(result);
        setShowPopupRefuse(false);
    };

    // Funzione per gestire il rifiuto
    const handleReject = () => {
        setMainStates([
            { key: 'prenotato', label: 'Prenotato', date: "12/12/2024, 11:36" },
            { key: 'rifiutato', label: 'Rifiutato', date: null },
        ]);
        setMainValue(0); // Imposta lo slider sullo stato "Rifiutato"
    };

    // useEffect per reagire ai cambiamenti di mainValue e settare la visilità del tasto rifiuta
    useEffect(() => {
        if (mainValue != 0) {
            setbuttonVisibility(false);
        }
    }, [mainValue]); // Osserva il valore di mainValue

    // useEffect per reagire ai cambiamenti di response e settare i MainValue
    useEffect(() => {
        if (response === true) {
            handleReject();
        }
    }, [response]); // Osserva il valore di response


    return (
        <div className="slider-wrapper">
            <span className='slider-text'><h4>Trascina la pallina sullo stato desiderato</h4></span>
            <Slider
                mainValue={mainValue}
                mainStates={mainStates}
                onValueChange={setMainValue}
                onStateChange={setMainStates}
                canGoBack={false}
            />            
            <span className="slider-button">
                {(!response && buttonVisibility) &&(<button className="refuse-button" onClick={() => {setShowPopupRefuse(true) }}>Rifiuta prenotazione</button>)}
            </span>

            <div className='slider-popup'>
                {showPopup && (
                    <Popup
                        importantText="Sei sicuro di voler RIFIUTARE la prenotazione?"
                        subText="Questa azione è irreversibile."
                        confirmText="RIFIUTA"
                        cancelText="Annulla"
                        onClose={handlePopupClose}
                    />
                )}
            </div>
        </div>
    );
};

export default SliderContainer;
