import "./Counter.css";
import { useState, useEffect, useRef } from 'react';
import Add from "./add.png";
import Sub from "./sub.png";
import { getToken } from "../../LocalStorage/TokenStorage";
import { useUserContext } from "../../Context/UserContext";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";
import axios from "axios";
import { BASE_URL } from "../../config";
import Popup from "../Popup/Popup";


function Counter(props) {
    const { databaseKey } = useUserContext();
    const [loading, setLoading] = useState(false); // Stato per il caricamento
    const [error, setError] = useState(null); // Stato per gli errori
    const [operation, setOperation] = useState(null); // Stato per gestire incremento o decremento
    const [updateCounter, setUpdateCounter] = useState(false); // stato per gestire l'interazione col contatore
    const [contatore, setContatore] = useState(props.initialQuantity); // stato per gestire il valore del contatore
    const [showPopupAccept, setshowPopupAccept] = useState(false); // stato per gestire il pop-up per l'eliminazione
    const [responseAccept, setResponseAccept] = useState(null); // stato per gestire la risposta nel pop-up

    const incrementa = () => {
        setContatore((prev) => prev + 1);
        setOperation("increment");
        setUpdateCounter(true);
    };

    const decrementa = () => {
        setContatore((prev) => (prev > 0 ? prev - 1 : 0));
        console.log(contatore);
        if ((contatore -1) === 0) {
            setshowPopupAccept(true);
        }
        setOperation("decrement");
        setUpdateCounter(true);
    };

    const handlePopupAcceptClose = (result) => {
        setResponseAccept(result);
        setshowPopupAccept(false);
    };

    // funzione per eliminare un prodotto dal carrello
    const deleteProducts = async () => {
        const token = getToken();

        if (!token || !databaseKey) {
            throw new Error("Token o databaseKey mancanti");
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/api/cart/deleteProducts`,
                {
                    idUser: databaseKey,
                    prodotti: props.productId,
                    importo: props.price
                }, // Corpo della richiesta
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Token di autenticazione
                    },
                }
            );

            const result = response.data;
            console.log(result);

            props.setUpdatePage();

        } catch (error) {
            console.error("Errore durante il recupero dei prodotti:", error);
            throw error; // Propaga l'errore
        }
    };


    // useEffect per eliminare il prodotto dopo la conferma
    useEffect(() => {
        if (responseAccept) {
            deleteProducts();
        }
    }, [responseAccept]);

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
                    idProduct: props.productId,
                    newQuantity: contatore,
                    price: props.price,
                    operation: operation
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
            const modifyQuantity = async () => {
                try {
                    if (isMounted) {

                        const result = await updateQuantity(); // Usa la funzione per l'aggiornamento della quantità
                        console.log(result);
                        props.onChangeQuantity(contatore);
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


    if (loading) return <div><LoadingPage /></div>;
    if (error) return <div>Errore: {error}</div>;

    return (
        <>
            <div className="CounterBox">
                <img src={Sub} alt="sub" className="ImgCounter" onClick={decrementa} />
                <p className="value">{contatore}</p>
                <img src={Add} alt="add" className="ImgCounter" onClick={incrementa} />
            </div>

            
        <div className='slider-popup'>
        {showPopupAccept && ( 
            <Popup importantText="Sei sicuro di voler RIMUOVERE questo prodotto dal carrello?"
            subText="Questa azione è irreversibile."
            confirmText="CONFERMA"
            cancelText="Torna indietro"
            onClose={handlePopupAcceptClose}
        />
        )}
        </div>
        </>
    );
}

export default Counter;
