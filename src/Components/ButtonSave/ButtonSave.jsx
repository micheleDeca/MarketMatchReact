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

import { useUserContext } from '../../Context/UserContext';
import { getToken } from '../../LocalStorage/TokenStorage';
import './ButtonSave.css'

export default function ButtonSave(elements){
    const type = elements.type;

    const prenoteOrder = async () => {
        const { databaseKey } = useUserContext();
        const token = getToken();

        console.log(databaseKey);
        if (!token || !databaseKey) {
            throw new Error("Token o databaseKey mancanti");
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/api/cart/createOrder`,
                { idUser: databaseKey,
                   idNegozio: elements.idNegozio,
                   prodotti: elements.prodotti,
                 }, // Corpo della richiesta
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Token di autenticazione
                    },
                }
            );

            const prenotation = response.data;
            console.log(prenotation.proodotti);

            // Ritorna un oggetto con stores e products
            return prenotation;
        } catch (error) {
            console.error("Errore durante il recupero dei prodotti:", error);
            throw error; // Propaga l'errore
        }
    };

    return(
        <input className="buttonSave" type="submit" value={elements.name} onClick={type === "prenotation" ? prenoteOrder : null}/>
    )
}