/**
 * Componente ButtonSave
 * 
 * Descrizione:
 * `ButtonSave` è un pulsante di tipo submit per i form.
 * 
 * Props:
 * - `name` {string}: Il testo da visualizzare sul pulsante. (es. "Salva")
 * 
 * Comportamento:
 * - Mostra un pulsante con la classe CSS `buttonSave` che agisce come un pulsante di submit.
 * 
 * Esempio di utilizzo:
 * <ButtonSave name="Salva" />
 * 
 */

import { useEffect, useState } from 'react';
import { useUserContext } from '../../Context/UserContext';
import { getToken } from '../../LocalStorage/TokenStorage';
import Popup from '../Popup/Popup';
import './ButtonSave.css'
import axios from 'axios';
import { BASE_URL } from '../../config';

export default function ButtonSave(elements) {
    const type = elements.type;
    const { databaseKey } = useUserContext();
    const [showPopupAccept, setshowPopupAccept] = useState(false);
    const [responseAccept, setResponseAccept] = useState(null);
    const [notification, setNotification] = useState(null); // Stato per la notifica

    const handlePopupAcceptClose = (result) => {
        setResponseAccept(result);
        setshowPopupAccept(false);
    };

    const handleAddClick = (message) => {

        setNotification(message);

        // Rimuovi la notifica dopo 3 secondi
        setTimeout(() => {
            setNotification(null);
        }, 2000);
    };

     // useEffect per effettuare la prenotazione dopo la conferma
     useEffect(() => {
        if (responseAccept) {
            prenoteOrder();
        }
    }, [responseAccept]);

     // Funzione delay
     const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // funzione per elimianare i prodotti dal carrello dopo la prenotazione 
    const deleteProducts = async () => {
        const token = getToken();

        console.log(databaseKey);
        if (!token || !databaseKey) {
            throw new Error("Token o databaseKey mancanti");
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/api/cart/deleteProducts`,
                {
                    idUser: databaseKey,
                    prodotti: elements.prodottiId,
                    importo: elements.importo
                }, // Corpo della richiesta
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Token di autenticazione
                    },
                }
            );

            const result = response.data;
            console.log(result);

            elements.setUpdatePage();

        } catch (error) {
            console.error("Errore durante il recupero dei prodotti:", error);
            throw error; // Propaga l'errore
        }
    };

    // funzione per creare la prenotazione 
    const prenoteOrder = async () => {
        const token = getToken();

        console.log(databaseKey);
        if (!token || !databaseKey) {
            throw new Error("Token o databaseKey mancanti");
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/api/cart/createOrder`,
                {
                    idUser: databaseKey,
                    idNegozio: elements.idNegozio,
                    prodotti: elements.prodottiIdQuantity,
                    importo: elements.importo
                }, // Corpo della richiesta
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Token di autenticazione
                    },
                }
            );

            const prenotation = response.data;
            console.log(prenotation);

            if(prenotation.successCode === "RESERVATION_CREATED"){
                handleAddClick('Prenotazione avvenuta con successo');
                await delay(3000);
                deleteProducts();
            } else {
                handleAddClick('Prenotazione non andata a buon fine');
            }

        } catch (error) {
            console.error("Errore durante il recupero dei prodotti:", error);
            throw error; // Propaga l'errore
        }
    };

    console.log("prodotti",elements.prodottiIdQuantity);

    return (
        <>
        <input className="buttonSave" type="submit" value={elements.name} 
        onClick={type === "prenotation" ? () => { setshowPopupAccept(true) } : null} />

        <div className='slider-popup'>
        {showPopupAccept && ( 
            <Popup importantText="Sei sicuro di voler CONFERMARE la prenotazione?"
            subText="Questa azione è irreversibile."
            confirmText="CONFERMA"
            cancelText="Torna indietro"
            onClose={handlePopupAcceptClose}
        />
        )}
        </div>

        {/* Popup di notifica */}
        {notification && (
                <div className="notification-popup">
                    {notification}
                </div>
            )}

        </>
    )
}