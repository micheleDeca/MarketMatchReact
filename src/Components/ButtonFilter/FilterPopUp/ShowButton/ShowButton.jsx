import { useState } from 'react';
import './ShowButton.css'

export default function ShowButton(value) {
    const [isSend, setIsSend] = useState(false);

    const sendHandler = () => {
        // Aggiorna lo stato di `isSend`
        setIsSend((prev) => {
            const newIsSend = !prev; // Calcola il nuovo valore
            value.onSendChange('send', newIsSend); // Passa il valore aggiornato al genitore
            value.onclick();
            return newIsSend; // Aggiorna lo stato
        })
    }

    return (
        <button type="submit" className="showButton" onClick={sendHandler}> 
            Mostra tutti i risultati
        </button>
    )
}