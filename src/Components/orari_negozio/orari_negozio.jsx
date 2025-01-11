import "./orari_negozio.css";
import ZigZag from "../zig-zag/zig-zag";

/**
 * Componente React per visualizzare e modificare gli orari di un negozio e le sue informazioni.
 * Il comportamento del componente varia in base alla modalità specificata tramite la prop `mode`.
 *
 * @param {Object} props - Le proprietà passate al componente.
 * @param {string} props.mode - La modalità del componente. Valori possibili:
 *   - "NegA": Mostra gli orari e le informazioni del negozio con la possibilità di modificarli.
 *   - "ConA": Mostra gli orari e le informazioni del negozio in sola lettura.
 * @param {function} [props.modify] - Funzione di callback da eseguire quando si vuole modificare le informazioni
 *   (solo per la modalità "NegA").
 * @param {string} props.lunedi - Orari per il lunedì.
 * @param {string} props.martedi - Orari per il martedì.
 * @param {string} props.mercoledi - Orari per il mercoledì.
 * @param {string} props.giovedi - Orari per il giovedì.
 * @param {string} props.venerdi - Orari per il venerdì.
 * @param {string} props.sabato - Orari per il sabato.
 * @param {string} props.domenica - Orari per la domenica.
 * @param {string} props.posizione - La posizione del negozio.
 * @param {string} props.contatti - I contatti del negozio.
 *
 * @returns {JSX.Element} Un componente React che visualizza gli orari e le informazioni del negozio,
 *   con o senza opzioni di modifica a seconda della modalità.
 */

function Orari(props) {
  if (props.mode === "NegA") {
    return (
      <>
        <div className="OrariNegozioBox">
          <ZigZag pulsante="Modifica orari" modify={props.modify}>
            <div className="OrariNegozioContainer">
              <div className="OrariNegozioRowTitle">
                <p className="OrariNegozioTitle">Orari Ritiro</p>
              </div>
              <div className="OrariNegozioRow">
                <div className="OrariNegozioCol">
                  <div className="OrariNegozioRow">
                    <p className="day">Lunedì</p>
                    <p className="hours">{props.lunedi}</p>
                  </div>
                  <div className="OrariNegozioRow">
                    <p className="day">Martedì</p>
                    <p className="hours">{props.martedi}</p>
                  </div>
                  <div className="OrariNegozioRow">
                    <p className="day">Mercoledì</p>
                    <p className="hours">{props.mercoledi}</p>
                  </div>
                  <div className="OrariNegozioRow">
                    <p className="day">Giovedì</p>
                    <p className="hours">{props.giovedi}</p>
                  </div>
                </div>
                <div className="OrariNegozioCol">
                  <div className="OrariNegozioRow">
                    <p className="day">Venerdì</p>
                    <p className="hours">{props.venerdi}</p>
                  </div>
                  <div className="OrariNegozioRow">
                    <p className="day">Sabato</p>
                    <p className="hours">{props.sabato}</p>
                  </div>
                  <div className="OrariNegozioRow">
                    <p className="day">Domenica</p>
                    <p className="hours">{props.domenica}</p>
                  </div>
                </div>
              </div>
            </div>
          </ZigZag>
          <ZigZag pulsante="Modifica Informazioni" modify={props.modify}>
            <div className="OrariNegozioContainer">
              <div className="OrariNegozioRowTitle">
                <p className="OrariNegozioTitle">Informazioni Negozio</p>
              </div>
              <div className="OrariNegozioRow">
                <div className="OrariNegozioCol">
                  <div className="OrariNegozioRow">
                    <p className="day">Posizione</p>
                    <p className="hours">{props.posizione}</p>
                  </div>
                  <div className="OrariNegozioRow">
                    <p className="day">Contatti</p>
                    <p className="hours">{props.contatti}</p>
                  </div>
                </div>
              </div>
            </div>
          </ZigZag>
        </div>
      </>
    );
  } else if (props.mode === "ConA") {
    return (
      <>
        <div className="OrariNegozioBox">
          <div className="OrariNegozioContainer">
            <div className="OrariNegozioRowTitle">
              <p className="OrariNegozioTitle">Orari Ritiro</p>
            </div>
            <div className="OrariNegozioRow">
              <div className="OrariNegozioCol">
                <div className="OrariNegozioRow">
                  <p className="day">Lunedì</p>
                  <p className="hours">{props.lunedi}</p>
                </div>
                <div className="OrariNegozioRow">
                  <p className="day">Martedì</p>
                  <p className="hours">{props.martedi}</p>
                </div>
                <div className="OrariNegozioRow">
                  <p className="day">Mercoledì</p>
                  <p className="hours">{props.mercoledi}</p>
                </div>
                <div className="OrariNegozioRow">
                  <p className="day">Giovedì</p>
                  <p className="hours">{props.giovedi}</p>
                </div>
              </div>
              <div className="OrariNegozioCol">
                <div className="OrariNegozioRow">
                  <p className="day">Venerdì</p>
                  <p className="hours">{props.venerdi}</p>
                </div>
                <div className="OrariNegozioRow">
                  <p className="day">Sabato</p>
                  <p className="hours">{props.sabato}</p>
                </div>
                <div className="OrariNegozioRow">
                  <p className="day">Domenica</p>
                  <p className="hours">{props.domenica}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="OrariNegozioContainer">
            <div className="OrariNegozioRowTitle">
              <p className="OrariNegozioTitle">Informazioni Negozio</p>
            </div>
            <div className="OrariNegozioRow">
              <div className="OrariNegozioCol">
                <div className="OrariNegozioRow">
                  <p className="day">Posizione</p>
                  <p className="hours">{props.posizione}</p>
                </div>
                <div className="OrariNegozioRow">
                  <p className="day">Contatti</p>
                  <p className="hours">{props.contatti}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Orari;
