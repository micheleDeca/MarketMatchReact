/**
 * Componente DettaglioPrenotazione
 * 
 * Descrizione:
 * `DettaglioPrenotazione` visualizza i dettagli di una prenotazione, come il codice, il cliente e la data.
 * Include un pulsante per passare allo stato successivo della prenotazione.
 * 
 * Props:
 * - `codice` {string|number}: Il codice identificativo della prenotazione. (es. "12345")
 * - `client` {string}: Il nome del cliente associato alla prenotazione. (es. "Mario Rossi")
 * - `date` {string}: La data associata alla prenotazione. (es. "15/12/2024")
 * 
 * Componenti utilizzati:
 * - `ButtonSucessivo`: Un pulsante per passare allo stato successivo della prenotazione.
 * 
 * Struttura del contenuto:
 * - **Titolo:** "Dettaglio Prenotazione".
 * - **Info:** Mostra il codice, il cliente e la data separati da un'icona.
 * - **Pulsante Successivo:** Permette di avanzare allo stato successivo (funzione clic passata a `ButtonSucessivo` tramite la prop `onclick`).
 * 
 * Esempio di utilizzo:
 * ```jsx
 * import DettaglioPrenotazione from './DettaglioPrenotazione';
 * 
 * <DettaglioPrenotazione 
 *   codice="12345" 
 *   client="Mario Rossi" 
 *   date="15/12/2024" 
 * />
 * ```
 */

import ButtonSucessivo from "./ButtonSucessivo/ButtonSucessivo";
import './DettaglioPrenotazione.css'

export default function DettaglioPrenotazione(value){
    return(
        <>
        <div className="dettContainer">
            <div className="header">
                Dettaglio Prenotazione
            </div>
            <div className="buttonSucc">
                <ButtonSucessivo onclick={() => clickFunction} />
            </div>
            <div className="info">
                #{value.codice}
                <img src="src\assets\dettaglioPrenotazione\assets\line-xl-svgrepo-com.svg" width="20" height="20"/>
                {value.client}
                <img src="src\assets\dettaglioPrenotazione\assets\line-xl-svgrepo-com.svg" width="20" height="20" />
                {value.date}
            </div>
            <hr className="line"/>
        </div>
        </>
    )
}