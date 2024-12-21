/**
 * Componente SezioneAccount
 * 
 * Descrizione:
 * `SezioneAccount` è un pulsante personalizzato che rappresenta una sezione dell'account utente o del negozio. Mostra un'immagine, un nome, e una descrizione associati.
 * 
 * Props:
 * - `onclick` {function}: Una funzione da eseguire quando il pulsante viene cliccato.
 * - `info` {Object}: Un oggetto che contiene le seguenti proprietà:
 *    - `img` {string}: L'URL dell'immagine da mostrare. (es. "https://example.com/immagine.jpg")
 *    - `name` {string}: Il nome da visualizzare. (es. "Mario Rossi")
 *    - `descrizione` {string}: Una descrizione o un'informazione aggiuntiva da mostrare sotto il nome. (es. "Account personale")
 * 
 * Struttura:
 * - **Sezione 1:** Include l'immagine (`img`) e il nome (`name`) all'interno di un div con classe CSS `sezAccount1`.
 * - **Sezione 2:** Mostra la descrizione (`descrizione`) all'interno di un div con classe CSS `sezAccount2`.
 * 
 * Comportamento:
 * - Quando il pulsante viene cliccato, esegue la funzione passata tramite `onclick`.
 * 
 * Esempio di utilizzo:
 * ```jsx
 * import SezioneAccount from './SezioneAccount';
 * 
 * const handleClick = () => {
 *   console.log("Sezione cliccata!");
 * };
 * 
 * const accountInfo = {
 *   img: "https://example.com/avatar.jpg",
 *   name: "Mario Rossi",
 *   descrizione: "Account personale"
 * };
 * 
 * <SezioneAccount onclick={handleClick} info={accountInfo} />
 * ```
 */

import Lottie from 'react-lottie-player'
import './SezioneAccount.css'

export default function SezioneAccount(buttonComponents) {

    return (
        <button id="buttonNegozio" onClick={buttonComponents.onclick}>
            <div className="sezAccount1">
                <div className="feature-box-account">
                    <Lottie
                        loop
                        animationData={buttonComponents.info.animation}
                        play
                        className="feature-animation-account"
                    />
                </div>
                <div className="sezName">
                    {buttonComponents.info.name}
                </div>
            </div>
            <div className="sezAccount2">
                {buttonComponents.info.descrizione}
            </div>

        </button>
    )
}
