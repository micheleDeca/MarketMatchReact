import "./Counter.css";
import { useState, useEffect, useRef } from 'react';
import Add from "./add.png";
import Sub from "./sub.png";
import { getToken } from "../../LocalStorage/TokenStorage";
import { useUserContext } from "../../Context/UserContext";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";
import axios from "axios";
import { BASE_URL } from "../../config";


function Counter({ productId, initialQuantity, getCounter, onChangeQuantity, price }) {
    const { databaseKey } = useUserContext();
    const [loading, setLoading] = useState(true); // Stato per il caricamento
    const [error, setError] = useState(null); // Stato per gli errori

    const [contatore, setContatore] = useState(initialQuantity);
    const incrementa = () => { setContatore((prev) => prev + 1); };
    const decrementa = () => { setContatore((prev) => (prev > 0 ? prev - 1 : 0)); };


    //Funzione per aggiornare la quantità nel db
    const updateQuantity = async () => {
        const token = getToken();

        if (!token || !databaseKey) {
            throw new Error("Token o databaseKey mancanti");
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/api/cart/setQuantity`,
                {
                    idUser: databaseKey,
                    idProduct: productId,
                    newQuantity: contatore,
                    price: price
                }, // Corpo della richiesta
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Token di autenticazione
                    },
                }
            );

            const data = response.data;
            return data;
        } catch (error) {
            console.error("Errore durante il recupero dei prodotti:", error);
            throw error; // Propaga l'errore
        }
    };

    useEffect(() => {

        onChangeQuantity(contatore);





    }, [contatore]);


    const test = () => {
        let isMounted = true; // Flag per evitare aggiornamenti su componenti smontati
        const modifyQuantity = async () => {
            try {
                if (isMounted) {
                    const result = await updateQuantity(); // Usa la funzione per l'aggiornamento della quantità
                    console.log(result);
                    setLoading(false); // Ferma il caricamento
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message); // Gestisci l'errore
                    setLoading(false);
                }
            }
        };

        modifyQuantity();

        // Cleanup: evita aggiornamenti su componenti smontati
        return () => {
            isMounted = false;
        };
    }

    if (loading) return <div><LoadingPage /></div>;
    if (error) return <div>Errore: {error}</div>;

    return (
        <>
            <div className="CounterBox">
                <img src={Sub} alt="sub" className="ImgCounter" onClick={() => { decrementa, test }} />
                <p className="value">{contatore}</p>
                <img src={Add} alt="add" className="ImgCounter" onClick={() => { decrementa, test }} />
            </div>
        </>
    );
}

export default Counter;
