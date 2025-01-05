import React, { useState, useEffect } from 'react';
import './Reservation.css'
import SliderContainer from '../../Components/SliderContainer/SliderContainer';
import ProductLongList from '../../Components/CardLongList/CardLongList';
import DettaglioPrenotazione from '../../Components/DettaglioPrenotazione/DettaglioPrenotazione';
import DataRitiro from '../../Components/DataRitiro/DataRitiro';
import { fetchReservationUpdater } from './Updater/ReservationUpdater';
import LoadingPage from '../LoadingPage/LoadingPage';
import { useUserContext } from '../../Context/UserContext';
import { useLocation } from "react-router-dom";
import LuogoDataRitiro from '../../Components/PrenotazioneCarrello/Luogo/LuogoDataRitiro';

const Reservation = () => {
    const [reservationData, setReservationData] = useState([]); // Dati della prenotazione
    const [products, setProducts] = useState([]); // Lista dei prodotti
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { databaseKey, userType } = useUserContext();

    const isConsumer = userType === "ConA";
    const isStore = userType === "NegA";
    const location = useLocation();
    const { id } = location.state || {}; // Fallback se `state` è null

    useEffect(() => {
        let isMounted = true; // Flag per evitare aggiornamenti su componenti smontati
        const getReservation = async () => {
            try {
                const reservationData = await fetchReservationUpdater(id); // Usa la funzione dal modulo
                const { prodotti, ...reservationDataWithoutProducts } = reservationData; // Escludi 'prodotti'

                if (isMounted) {
                    setReservationData(reservationDataWithoutProducts);
                    setProducts(prodotti);
                    setLoading(false); // Ferma il caricamento
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message); // Gestisci l'errore
                    setLoading(false);
                }
            }
        };

        getReservation();

        // Cleanup: evita aggiornamenti su componenti smontati
        return () => {
            isMounted = false;
        };


    }, []);

    useEffect(() => {
        console.log(reservationData);

        console.log(products);
    }, [products])

    const getStylesByStatus = (status) => {
        switch (status) {
            case "ritirato":
                return { text: "RITIRATO", date: "In data: " };
            case "da_ritirare":
                return { text: "DA RITIRARE", date: "Entro: " };
            case "accettato":
                return { text: "ACCETTATO", date: "In data: " };
            case "prenotato":
                return { text: "PRENOTATO", date: "In data: " };
            case "rifiutato":
                return { text: "RIFIUTATO", date: "In data: " };
            case "annullato":
                return { text: "ANNULLATO", date: "In data: " };
            default:
                return { text: "Sconosciuto", date: "Stato della prenotazione non riconosciuto." };
        }
    };

    if (loading) return <div><LoadingPage /></div>;
    if (error) return <div>Errore: {error}</div>;


    return (
        <div>
            <div className="reservation-header">
                <h1>Prenotazione</h1>
            </div>
            <div className='dettaglioPrenotazione-container'>
                <DettaglioPrenotazione
                    codice={reservationData.id}
                    client={(isConsumer ? reservationData.storeName :
                        (isStore ? reservationData.customerFirstName + " " + reservationData.customerLastName : ""))}
                    date={reservationData.reservationDate} />
            </div>
            <div className="svg-divider">
                <svg width="100%" height="2" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="1" x2="100%" y2="1" stroke="#CAC4D0" />
                </svg>
            </div>
            <div className="user-reservation-state-info">
                <div className="user-reservation-state">Stato: {getStylesByStatus(reservationData.status).text}</div>
                <div className="user-reservation-date">{getStylesByStatus(reservationData.status).date + reservationData.infoDate}</div>
            </div>
            <SliderContainer />

            <div className="store-info-reservation">
                <LuogoDataRitiro nameNeg={reservationData.storeName}
                    provincia={reservationData.provincia}
                    citta={reservationData.citta}
                    cap={reservationData.cap}
                    indirizzo={reservationData.indirizzo}
                    contatti={reservationData.mail + " - " + reservationData.cellulare}
                    orari={reservationData.orario} />
            </div>
            <div className="store-code-reservation-container">
                <div className="user-reservation-code">Codice Ritiro: {getStylesByStatus(reservationData.status).text}</div>
            </div>
            <div className="codice-ritiro-container">
                <span className="codice-ritiro-label">Codice ritiro:</span>
                <div className="codice-ritiro-box">
                    <span className="codice-ritiro">AABBGG</span>
                </div>
            </div>

            {isStore && <div className="dataLabel-reservation">
                <DataRitiro />
            </div>}
            <div className="svg-divider">
                <svg width="100%" height="2" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="1" x2="100%" y2="1" stroke="#CAC4D0" />
                </svg>
            </div>
            <ProductLongList
                title="Riepilogo Prenotazione"
                products={products}
                type={"product"} />
        </div>
    )
}

export default Reservation
