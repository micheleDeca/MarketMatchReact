/**
 * Componente Caratteristiche
 * 
 * Descrizione:
 * Il componente `Caratteristiche` rappresenta una sezione per visualizzare e modificare le caratteristiche di un prodotto, come peso, dimensioni e quantità.
 * 
 * Props:
 * - `peso` {string|number}: Il peso del prodotto da visualizzare. (es. "1kg", "500g")
 * - `dimensioni` {string|number}: Le dimensioni del prodotto da visualizzare. (es. "20x30x40 cm")
 * - `quantita` {string|number}: La quantità del prodotto disponibile. (es. 10)
 * 
 * Componenti utilizzati:
 * - `ZigZag`: Un componente che sembra gestire l'organizzazione visiva delle caratteristiche e include un pulsante per modificarle.
 * - `ButtonDisponibile`: Un pulsante che indica se il prodotto è disponibile.
 * 
 * Struttura del contenuto:
 * - Titolo: "Caratteristiche".
 * - Sezione delle caratteristiche organizzata in una lista descrittiva (`<dl>`), con termini (`<dt>`) e descrizioni (`<dd>`).
 * - Pulsante "Modifica caratteristiche" fornito tramite il componente `ZigZag`.
 * 
 * Esempio di utilizzo:
 * ```jsx
 * import Caratteristiche from './Caratteristiche';
 * 
 * <Caratteristiche 
 *   peso="1kg" 
 *   dimensioni="20x30x40 cm" 
 *   quantita={10} 
 * />
 * ```
 */

import ZigZag from '../zig-zag/zig-zag'
import ButtonDisponibile from './ButtonDisponibile/ButtonDisponibile'
import './Caratteristiche.css';

export default function Caratteristiche(value) {
  return (
    <div className="container">
      <h1 className="CaratteristicheTitle">Caratteristiche</h1>
      <hr />
      <div className="box">
        {value.tipo == "neg" ? (
        <ZigZag pulsante="Modifica Caratteristiche" modify={value.modify}>
            <div className="disponibile"><ButtonDisponibile/></div>
            <div>
          <dl className="list">
            <dt>
              Peso
              <dd>{value.peso}</dd>
            </dt>
            <dt>
              Dimensioni
              <dd>{value.dimensioni}</dd>
            </dt>
            <dt>
              Quantità
              <dd>{value.quantita}</dd>
            </dt>
          </dl>
          </div>
        </ZigZag>
        ) : (
          <>
          <div className="disponibile"><ButtonDisponibile/></div>
            <div>
          <dl className="list">
            <dt>
              Peso
              <dd>{value.peso}</dd>
            </dt>
            <dt>
              Dimensioni
              <dd>{value.dimensioni}</dd>
            </dt>
            <dt>
              Quantità
              <dd>{value.quantita}</dd>
            </dt>
          </dl>
          </div>
          </>
        )}
      </div>
    </div>
  );
}