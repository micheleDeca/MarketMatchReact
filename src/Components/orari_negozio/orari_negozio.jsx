import "./orari_negozio.css";
import ZigZag from "../zig-zag/zig-zag";

/**
 * A component to display and manage store hours and additional store information.
 *
 * @component
 * @param {Object} props - The props object for the Orari component.
 * @param {string} props.mode - Determines the display mode ("neg" for editable mode, otherwise read-only mode).
 * @param {string} props.lunedi - The opening hours for Monday.
 * @param {string} props.martedi - The opening hours for Tuesday.
 * @param {string} props.mercoledi - The opening hours for Wednesday.
 * @param {string} props.giovedi - The opening hours for Thursday.
 * @param {string} props.venerdi - The opening hours for Friday.
 * @param {string} props.sabato - The opening hours for Saturday.
 * @param {string} props.domenica - The opening hours for Sunday.
 * @param {string} props.posizione - The store location information.
 * @param {string} props.contatti - The store contact information.
 *
 * @returns {JSX.Element} A component that displays store hours and information.
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
  } else if (props.mode === "ConA"){
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
