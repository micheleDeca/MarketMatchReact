/**
 * Componente DataRitiro
 * 
 * Descrizione:
 * Il componente `DataRitiro` fornisce un'interfaccia per configurare la data, l'ora di ritiro e il tempo massimo per effettuare una prenotazione.
 * Include un modulo con campi descritti da etichette (`Label`) e pulsanti per salvare le configurazioni (`ButtonSave`).
 * 
 * Props:
 * - `submitFunction` {Object}: Un oggetto contenente la funzione `submit` da eseguire al momento del submit del modulo. (es. `{ submit: () => { ... } }`)
 * 
 * Comportamento:
 * - Ogni sezione del modulo è composta da un'etichetta (`Label`) e un pulsante di salvataggio (`ButtonSave`).
 * - Il modulo è stilizzato utilizzando la classe CSS `formDate`.
 * - Alla sottomissione del modulo, viene invocata la funzione `submitFunction.submit` (anche se nell'implementazione attuale sembra non eseguire correttamente la funzione).
 * 
 * Struttura del Modulo:
 * - **Data ritiro:** Campo associato all'etichetta "Data ritiro" con pulsante "Save".
 * - **Ora ritiro:** Campo associato all'etichetta "Ora ritiro" con pulsante "Save".
 * - **Tempo max prenotazione:** Campo associato all'etichetta "Tempo max prenotazione" con pulsante "Save".
 * 
 * Esempio di utilizzo:
 * ```jsx
 * import DataRitiro from './DataRitiro';
 * 
 * const submitFunction = {
 *   submit: () => {
 *     console.log('Modulo inviato!');
 *   },
 * };
 * 
 * <DataRitiro submitFunction={submitFunction} />
 * ```
 */
import ButtonSave from '../ButtonSave/ButtonSave';
import Label from "./Label/Label";
import './DataRitiro.css'

export default function DataRitiro(submitFunction) {

    return (
        <>
            <div className="headerDate">
                <h1>Data e ora ritiro</h1>
            </div>
            <div>
                <form className="formDate" onSubmit={ () => {submitFunction.submit}}>
                    <div className="labelBox">
                    <Label text="Data ritiro" />
                    <ButtonSave name="Save"  />
                    </div>
                    <div className="labelBox">
                    <Label text="Ora ritiro" />
                    <ButtonSave name="Save" />
                    </div>
                    <div className="labelBox">
                    <Label text="Tempo max prenotazione" />
                    <ButtonSave name="Save" />
                    </div>
                </form>
            </div>
        </>
    )
}

