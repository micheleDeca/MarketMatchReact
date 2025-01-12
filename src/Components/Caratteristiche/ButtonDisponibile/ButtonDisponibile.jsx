/**
 * Componente ButtonDisponibile
 * 
 * Descrizione:
 * `ButtonDisponibile` è un pulsante che indica la disponibilità del prodotto. Include un'icona e un testo.
 * 
 * Struttura:
 * - Mostra un'icona di verifica (`check-876.svg`) accanto al testo "Disponibile".
 * - Stile personalizzato tramite la classe CSS `buttonDisp`.
 * 
 * Comportamento:
 * - Il componente è attualmente statico e non gestisce alcun evento clic o stato dinamico.
 * 
 * Esempio di utilizzo:
 * ```jsx
 * import ButtonDisponibile from './ButtonDisponibile';
 * 
 * <ButtonDisponibile />
 * ```
 */

import './ButtonDisponibile.css'

export default function ButtonDisponibile(value) {
    const isDisponibile = value.disponibile;
    return (
        <button className="buttonDisp" style={{ backgroundColor: isDisponibile ? "rgb(11, 144, 35)" : "red", }}>
            {isDisponibile ? (
                <>
                    <img className="image" src="src\Components\Caratteristiche\ButtonDisponibile\assets\check-876.svg" width="30px" height="30px" />
                    Disponibile
                </>) : (
                <>
                    Non Disponibile
                </>
            )
            }

        </button>
    );
}
