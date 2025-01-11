import "./GreenPointsCO2.css";
import CO2 from "../C02/CO2.jsx";
import GreenPoints from "../GreenPoints/GreenPoints.jsx";

/**
 * Componente React che visualizza sia i Green Points che la quantità di CO2 risparmiata.
 *
 * Questo componente combina i componenti `GreenPoints` e `CO2` per mostrare i punti
 * accumulati e il risparmio di CO2 corrispondente, utilizzando lo stesso valore di punti
 * passato come prop.
 *
 * @component
 * @example
 * // Esempio di utilizzo del componente
 * <GreenPointsCO2 points={500} />
 *
 * @param {Object} props - Le proprietà passate al componente.
 * @param {number} props.points - Il numero di Green Points dell'utente, usato per calcolare sia i punti che il risparmio di CO2.
 *
 * @returns {JSX.Element} Un componente che visualizza sia i Green Points che la CO2 risparmiata.
 */

function GreenPointsCO2(props) {
  return (
    <>
      <div className="GreenPointsCO2Box">
        <GreenPoints points={props.points} />
        <CO2 points={props.points} />
      </div>
    </>
  );
}

export default GreenPointsCO2;
