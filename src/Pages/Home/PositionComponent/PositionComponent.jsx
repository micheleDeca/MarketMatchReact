import React, { useState, useEffect } from "react";
import "./PositionComponent.css";

import Lottie from "react-lottie-player";
import leafAnimation from "./assets/positionAnimation.json"; // Animazione decorativa JSON

const PositionComponent = ({onPositionUpdate}) => {
    const mobileSize = 1050;
    const [location, setLocation] = useState(""); // Stato per salvare la posizione
    const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize); // Stato per la larghezza della finestra
    const [error, setError] = useState(""); // Stato per eventuali errori


    const getPositionBr = () =>{
        return setLocation();
    };

    /** Funzione per ottenere la posizione dell'utente
      Utilizza l'API Geolocation del browser per rilevare latitudine e longitudine*/
    const handleGetLocation = () => {
        if (!navigator.geolocation) {   // Controlla se il browser supporta l'API Geolocation
            setError("Geolocalizzazione non supportata dal browser.");
            return;
        }


        // Richiede la posizione dell'utente
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords; // Estrae latitudine e longitudine dall'oggetto position.coords
                setLocation({ latitude, longitude });
                onPositionUpdate({ latitude, longitude }); // Passa la posizione al padre

                setError(""); // Resetta eventuali errori
            },
            (err) => {
                setError("Consenti i permessi per la geolocalizzazione nel browser.");
            }
        );
    };

    // Gestione del ridimensionamento della finestra
    useEffect(() => {       //consente di eseguire del codice aggiuntivo dopo che il componente è stato montato nel DOM.
        const handleResize = () => {
            setIsMobile(window.innerWidth <= mobileSize);   // controlla la larghezza della finestra con window.innerWidth.
        };

        window.addEventListener('resize', handleResize); // Aggiungi listener per il resize della finestra.
        return () => {
            window.removeEventListener('resize', handleResize); // Rimuovi il listener quando il componente si smonta (quando <WelcomeBanner /> non è più visibile o usato nella pagina.)
        };
    }, []);

    /*
    Le parentesi quadre vuote come secondo argomento di useEffect indicano che il codice all'interno 
    di useEffect viene eseguito solo una volta, quando il componente è montato.
    Non viene rieseguito a meno che il componente non venga smontato e rimontato.
   */

    return (
        <section className="welcome-banner">
            <div className="welcome-content">
                <h1 className="welcome-title">BENVENUTI IN MARKETMATCH</h1>
                <p className="welcome-subtitle">
                    Trova prodotti unici e sostenibili vicino a te
                </p>
                <div>
                    {!location && (
                        <button onClick={handleGetLocation} className="welcome-button">
                            Ottieni la tua posizione
                        </button>
                    )}
                    {location && (
                        <p className="location-info">
                            Posizione rilevata: Latitudine {location.latitude.toFixed(2)}, Longitudine {location.longitude.toFixed(2)}
                        </p>
                    )}
                    {error && <p className="location-error">{error}</p>}
                </div>        </div>
            <div className="welcome-animation">
                <Lottie
                    loop
                    animationData={leafAnimation}
                    play
                    className="position-animation"
                />
            </div>
        </section>
    );
};

export default PositionComponent;
