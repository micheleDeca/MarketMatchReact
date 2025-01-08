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
    const [loading, setLoading] = useState(false); // Stato per il caricamento
    const [error, setError] = useState(null); // Stato per gli errori

    const [updateCounter, setUpdateCounter] = useState(false);
    const [contatore, setContatore] = useState(initialQuantity);
    const incrementa = () => {
        setContatore((prev) => prev + 1);
        setUpdateCounter(true);
    };
    const decrementa = () => {
        setContatore((prev) => (prev > 0 ? prev - 1 : 0));
        setUpdateCounter(true);
    };


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

        if (updateCounter) {
            let isMounted = true; // Flag per evitare aggiornamenti su componenti smontati
            console.log("sto caricando");
            const modifyQuantity = async () => {
                try {
                    if (isMounted) {

                        const result = await updateQuantity(); // Usa la funzione per l'aggiornamento della quantità
                        console.log(result);
                        onChangeQuantity(contatore);
                        setUpdateCounter(false);


                    }
                } catch (err) {
                    if (isMounted) {
                        setError(err.message); // Gestisci l'errore
                    }
                }
            };

            modifyQuantity();

            return () => {
                isMounted = false;
            };
        }

    }, [contatore])


    const test = () => {

    }

    if (loading) return <div><LoadingPage /></div>;
    if (error) return <div>Errore: {error}</div>;

    return (
        <>
            <div className="CounterBox">
                <img src={Sub} alt="sub" className="ImgCounter" onClick={decrementa} />
                <p className="value">{contatore}</p>
                <img src={Add} alt="add" className="ImgCounter" onClick={incrementa} />
            </div>
        </>
    );
}

export default Counter;
