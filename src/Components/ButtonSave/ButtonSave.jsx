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

import './ButtonSave.css'

export default function ButtonSave(elements){
    return(
        <input className="buttonSave" type="submit" value={elements.name} />
    )
}