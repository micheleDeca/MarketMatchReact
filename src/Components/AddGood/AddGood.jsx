import "./AddGood.css";
import React, {useState} from 'react';
import axios from "axios";
import { getToken } from "../../LocalStorage/TokenStorage.jsx";
import { BASE_URL, IS_MOCKKED } from "../../config.js";

function AddGood(props) {

    console.log("ddd",props);

    const token = getToken();

    const [notification, setNotification] = useState(null); // Stato per la notifica

    const insertProductInCart = async () => {

        if (!token || !props.databaseKey) {
            throw new Error("Token o databaseKey mancanti");
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/api/cart/insertProducts`,
                { idUser: props.databaseKey,
                    idProdotto: props.prodotto
                 }, // Corpo della richiesta
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Token di autenticazione
                    },
                }
            );

            const result = response.data;
            console.log(result);

            if(result.esito === true){
                handleAddClick();
            }

        } catch (error) {
            console.error("Errore durante il recupero dei prodotti:", error);
            throw error; // Propaga l'errore
        }
    };

    const handleAddClick = () => {

        setNotification(`Prodotto aggiunto al carrello`);

        // Rimuovi la notifica dopo 3 secondi
        setTimeout(() => {
            setNotification(null);
        }, 2000);
    };

    return (
        <>
            <input type="button" value={"Aggiuni al carello"} className="AddGoodButton" onClick={insertProductInCart}/>
            {/* Popup di notifica */}
        {notification && (
                <div className="notification-popup">
                    {notification}
                </div>
            )}
        </>
    );
}

export default AddGood;
