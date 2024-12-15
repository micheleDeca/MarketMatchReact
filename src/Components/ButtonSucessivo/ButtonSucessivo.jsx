/**
 * Componente ButtonSucessivo
 * 
 * Descrizione:
 * `ButtonSucessivo` è un pulsante che permette di avanzare allo stato successivo. Include un'icona accanto al testo "Successivo".
 * 
 * Props:
 * - `onclick` {function}: Una funzione chiamata quando il pulsante viene cliccato.
 * 
 * Struttura:
 * - Mostra un pulsante con il testo "Successivo" e un'icona.
 * 
 * Comportamento:
 * - Quando il pulsante viene cliccato, esegue la funzione passata tramite `onclick`.
 * 
 * Esempio di utilizzo:
 * ```jsx
 * import ButtonSucessivo from './ButtonSucessivo';
 * 
 * <ButtonSucessivo onclick={() => console.log("Pulsante cliccato!")} />
 * ```
 */

import './ButtonSucessivo.css'

export default function ButtonSucessivo(value){

    return(
    <button className="buttonElement" onClick={value.onclick}>
        Successivo
        <img src="src\Components\ButtonSucessivo\assets\nextsvgrepo-com.svg" width="10px" height="10px"/>
    </button>
    )
}