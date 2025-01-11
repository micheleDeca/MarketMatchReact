import "./AddGood.css";
import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../../LocalStorage/TokenStorage.jsx";
import { BASE_URL, IS_MOCKKED } from "../../config.js";

/**
 * Componente React per aggiungere un prodotto al carrello.
 *
 * Questo componente si occupa di inviare una richiesta al server per aggiungere un prodotto al carrello dell'utente.
 * Utilizza il token di autenticazione e la chiave del database per effettuare la richiesta e visualizzare una notifica
 * di successo quando l'operazione va a buon fine.
 *
 * @component
 * @example
 * // Utilizzo del componente
 * <AddGood databaseKey="12345" prodotto="67890" />
 *
 * @param {Object} props - Le proprietà passate al componente.
 * @param {string} props.databaseKey - La chiave unica dell'utente nel database.
 * @param {string} props.prodotto - L'ID del prodotto da aggiungere al carrello.
 */

function AddGood(props) {
  const token = getToken();

  const [notification, setNotification] = useState(null); // Stato per la notifica

  /**
   * Funzione per inserire un prodotto nel carrello.
   *
   * Effettua una richiesta HTTP per aggiungere un prodotto al carrello dell'utente utilizzando l'ID utente e l'ID prodotto.
   * Gestisce il risultato della richiesta e invia una notifica in caso di successo.
   *
   * @throws {Error} Se il token o la databaseKey mancano.
   */

  const insertProductInCart = async () => {
    if (!token || !props.databaseKey) {
      throw new Error("Token o databaseKey mancanti");
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/cart/insertProducts`,
        { idUser: props.databaseKey, idProdotto: props.prodotto }, // Corpo della richiesta
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token di autenticazione
          },
        }
      );

      const result = response.data;
      console.log(result);

      if (result.esito === true) {
        handleAddClick();
      }
    } catch (error) {
      console.error("Errore durante il recupero dei prodotti:", error);
      throw error; // Propaga l'errore
    }
  };

  /**
   * Funzione che gestisce il clic sul pulsante di aggiunta al carrello.
   *
   * Mostra una notifica di conferma dell'aggiunta del prodotto al carrello.
   * La notifica viene nascosta dopo 3 secondi.
   */

  const handleAddClick = () => {
    setNotification(`Prodotto aggiunto al carrello`);

    // Rimuovi la notifica dopo 3 secondi
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  return (
    <>
      <input
        type="button"
        value={"Aggiuni al carello"}
        className="AddGoodButton"
        onClick={insertProductInCart}
      />
      {/* Popup di notifica */}
      {notification && <div className="notification-popup">{notification}</div>}
    </>
  );
}

export default AddGood;
