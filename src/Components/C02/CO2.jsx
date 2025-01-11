import "./CO2.css";

/**
 * Componente React che visualizza la quantità di CO2 risparmiata in base ai punti.
 *
 * Questo componente prende un numero di punti come prop e calcola la quantità di CO2 risparmiata,
 * mostrando il risultato in chilogrammi. Il valore è calcolato come una proporzione dei punti.
 *
 * @component
 * @example
 * // Utilizzo del componente
 * <CO2 points={500} />
 *
 * @param {Object} props - Le proprietà passate al componente.
 * @param {number} props.points - Il numero di punti da utilizzare nel calcolo del risparmio di CO2.
 *
 * @returns {JSX.Element} Il componente che mostra la quantità di CO2 risparmiata.
 */

function CO2(props) {
  // Calcola il CO2 risparmiato in base ai punti, ogni 100 punti 1kg di CO2 risparmiato
  const co2Saved = (props.points / 200) * 2;

  return (
    <>
      <div className="CO2Box">
        <p className="CO2Title">CO2 risparmiato</p>
        <p className="CO2Range">{co2Saved.toFixed(2)} kg</p>
      </div>
    </>
  );
}

export default CO2;
