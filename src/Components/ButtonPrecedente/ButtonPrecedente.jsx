/**
 * Componente ButtonPrecedente
 * 
 * Descrizione:
 * `ButtonPrecedente` è un pulsante che permette di tornare allo stato precedente. Include un'icona accanto al testo "Precedente".
 * 
 * Props:
 * - `onclick` {function}: Una funzione chiamata quando il pulsante viene cliccato.
 * 
 * Struttura:
 * - Mostra un pulsante con il testo "Precedente" e un'icona.
 * 
 * Comportamento:
 * - Quando il pulsante viene cliccato, esegue la funzione passata tramite `onclick`.
 * 
 * Esempio di utilizzo:
 * ```jsx
 * import ButtonPrecedente from './ButtonPrecedente';
 * 
 * <ButtonPrecedente onclick={() => console.log("Pulsante cliccato!")} />
 * ```
 */

import './ButtonPrecedente.css'

export default function ButtonPrecedente(value){

    return(
    <button className="precElement" onClick={value.onclick}>
        <img src="src\Components\ButtonPrecedente\assets\previous-svgrepo-com.svg" width="10px" height="10px"/>
        Precedente
    </button>
    )
}