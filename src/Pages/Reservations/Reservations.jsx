import { useEffect, useState } from 'react';
import './Reservations.css'
import PrenotationSearch from '../../Components/PrenotationSearch/PrenotationSearch';
import ButtonPrecedente from '../../Components/ButtonPrecedente/ButtonPrecedente';
import ButtonSucessivo from '../../Components/ButtonSucessivo/ButtonSucessivo';
import OperationLongContainer from '../../Components/OperationLongContainer/OperationLongContainer';

const mockPrenotations = Array.from({ length: 50 }, (_, index) => {
    const reservationStatuses = ["prenotato", "accettato", "rifiutato", "daRitirare", "ritirato", "scaduto"];
    const randomStatus = reservationStatuses[Math.floor(Math.random() * reservationStatuses.length)];
    const randomDate = (offset = 0) => {
        const date = new Date();
        date.setDate(date.getDate() + offset);
        return date.toLocaleDateString("it-IT");
    };
    return {
        id: `#${100000 + index}`, // ID univoco
        status: randomStatus, // Stato casuale
        reservationDate: randomDate(-index), // Data prenotazione (retroattiva rispetto all'indice)
        infoDate: randomDate(-(index - 1)), // Data info successiva
        shopId: `${Math.floor(Math.random() * 10) + 1}`, // ID negozio casuale
        customerId: `${Math.floor(Math.random() * 10) + 1}`, // ID negozio casuale
    };
});

const Prenotazioni = () => {

    const [prenotations, setPrenotations] = useState([]); // Stato per le prenotazioni
    const [currentPage, setCurrentPage] = useState(1); // Stato per la pagina attuale
    const prenotationsPerPage = 5; // Numero di prenotazioni per pagina

    const fetchPrenotations = (page) => {
        // Recupera le prenotazioni per la pagina attuale
        const startIndex = (page - 1) * prenotationsPerPage;
        const endIndex = startIndex + prenotationsPerPage;
        const pagePrenotations = mockPrenotations.slice(startIndex, endIndex);

        setPrenotations(pagePrenotations);
    };

    // Effetto per caricare le prenotazioni quando cambia la pagina
    useEffect(() => {
        fetchPrenotations(currentPage);
    }, [currentPage]);
    
    return (
        <>
            <div className="prenHeader">
                <h1>Prenotazioni</h1>
            </div>
            <div className="prenBar">
                <PrenotationSearch first="Tutto" second="Accettato" third="Rifiutato" fourth="Prenotato" fifth="Da Ritirare" sixth="Ritirato" />
            </div>
            <div className="prenotations">
                <OperationLongContainer operations={prenotations} type={"reservation"} />
                

            </div>
            <div className="prenButton">
                {currentPage >= 2 && (
                    <ButtonPrecedente onclick={() => setCurrentPage(currentPage - 1)} />
                )}

                {currentPage < (mockPrenotations.length / prenotationsPerPage) && (
                    <ButtonSucessivo name="Successivo" onclick={() => setCurrentPage(currentPage + 1)} />
                )}
            </div>

        </>
    )
}

export default Prenotazioni
