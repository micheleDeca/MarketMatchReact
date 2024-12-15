/**
 * Componente Label
 * 
 * Descrizione:
 * `Label` è un componente che rappresenta un'etichetta con un input di testo associato.
 * 
 * Props:
 * - `text` {string}: Il placeholder per l'input. (es. "Inserisci la data")
 * 
 * Stato interno:
 * - `name` {string}: Il valore attuale dell'input.
 * 
 * Comportamento:
 * - Mostra un input di testo con un placeholder e aggiorna lo stato interno ad ogni modifica.
 * 
 * Esempio di utilizzo:
 * <Label text="Inserisci il nome" />
 * 
 */
 
import { memo, useState } from "react";
import './Label.css'

const Label = (elements) =>  {
    const [name, setName] = useState("");

    return( 
    <label>
        <input className="input-label"
            type="text"
            placeholder={elements.text}
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
    </label>
    )
}


export default memo (Label);