import { useEffect, useState } from 'react';
import './Reservations.css'
import PrenotationSearch from '../../Components/PrenotationSearch/PrenotationSearch';
import ButtonPrecedente from '../../Components/ButtonPrecedente/ButtonPrecedente';
import ButtonSucessivo from '../../Components/ButtonSucessivo/ButtonSucessivo';
import OperationLongContainer from '../../Components/OperationLongContainer/OperationLongContainer';
import { fetchReservationFilteredUpdater } from './Updater/ReservationUpdater';
import LoadingPage from '../LoadingPage/LoadingPage';
import { useUserContext } from '../../Context/UserContext';
import { getNumberReservationFiltered } from './Updater/NumReservationUpdater';




const Prenotazioni = () => {

    const [reservation, setReservation] = useState([]); // Stato per le prenotazioni
    const [currentPage, setCurrentPage] = useState(1); // Stato per la pagina attuale
    const reservationPerPage = 5; // Numero di prenotazioni per pagina
    const [loading, setLoading] = useState(true); // Stato per il caricamento
    const [error, setError] = useState(null); // Stato per gli errori
    const [totalItems, setTotalItems] = useState(0); // Aggiunto in modo stabile
    const [requestParams, setRequestParams] = useState({
        state: null,
        searchName: "80ceae",
    });
    const { databaseKey, userType } = useUserContext();
    const uuidParamStore = (userType === "NegA") ? databaseKey : "";
    const uuidParamConsumer = (userType === "ConA") ? databaseKey : "";

    // Effetto per caricare le ricette quando cambia la pagina
    useEffect(() => {
        let isMounted = true; // Flag per evitare aggiornamenti su componenti smontati

        const getReservation = async () => {
            try {
                const reservationData = await fetchReservationFilteredUpdater(currentPage, reservationPerPage, requestParams, uuidParamStore, uuidParamConsumer); // Usa la funzione dal modulo
                if (isMounted) {
                    setReservation(reservationData); // Aggiorna lo stato
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


    }, [currentPage, requestParams]);

    // Effetto per richiedere quantità ricette per pagination
    useEffect(() => {
        let isMounted = true; // Flag per evitare aggiornamenti su componenti smontati
        const getNumReservation = async () => {
            try {
                const recipesData = await getNumberReservationFiltered(requestParams, uuidParamStore, uuidParamConsumer); // Usa la funzione dal modulo
                if (isMounted) {
                    setTotalItems(recipesData); // Aggiorna lo stato
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message); // Gestisci l'errore
                }
            }
        };

        getNumReservation();

        // Cleanup: evita aggiornamenti su componenti smontati
        return () => {
            isMounted = false;
        };
    }, [requestParams]); //inserire prossimamente, aggiornamento in base ai filtri scelti


    const handleStatusChange = () => {

    }

    if (loading) return <div><LoadingPage /></div>;
    if (error) return <div>Errore: {error}</div>;

    return (
        <>
            <div className="prenHeader">
                <h1>Prenotazioni</h1>
            </div>
            <div className="prenBar">
                <PrenotationSearch onChange={handleStatusChange} first="Tutto" second="Accettato" third="Rifiutato" fourth="Prenotato" fifth="Da Ritirare" sixth="Ritirato" />
            </div>
            <div className="prenotations">
                <OperationLongContainer operations={reservation} type={"reservation"} />


            </div>
            <div className="prenButton">
                {currentPage >= 2 && (
                    <ButtonPrecedente onclick={() => setCurrentPage(currentPage - 1)} />
                )}

                {currentPage < (totalItems / reservationPerPage) && (
                    <ButtonSucessivo name="Successivo" onclick={() => setCurrentPage(currentPage + 1)} />
                )}
            </div>

        </>
    )
}

export default Prenotazioni
