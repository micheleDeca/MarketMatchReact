import "./GreenPoints.css";

/**
 * Componente React che visualizza i Green Points dell'utente e il progresso verso il prossimo limite.
 *
 * Questo componente prende un numero di punti come prop, calcola il prossimo limite di punti
 * e mostra il progresso sotto forma di barra di avanzamento. Inoltre, visualizza quanti punti mancano
 * per risparmiare 2 kg di CO2.
 *
 * @component
 * @example
 * // Utilizzo del componente
 * <GreenPoints points={450} />
 *
 * @param {Object} props - Le proprietà passate al componente.
 * @param {number} props.points - Il numero di Green Points attuali dell'utente.
 *
 * @returns {JSX.Element} Il componente che mostra il progresso verso il prossimo limite di Green Points.
 */

function GreenPoints(props) {
  /**
   * Calcola il prossimo limite di Green Points.
   * Il limite successivo è il multiplo di 200 più vicino al numero di punti correnti.
   *
   * @param {number} points - Il numero di punti correnti.
   * @returns {number} Il prossimo limite di punti (multiplo di 200).
   */
  const calculateNextLimit = (points) => {
    return Math.ceil(points / 200) * 200; //arrotonda per eccesso all'intero più vicino
  };

  // Calcolo del prossimo limite
  const nextLimit = calculateNextLimit(props.points);

  // Calcolo dei punti mancanti
  const nextPoints = nextLimit - props.points;

  // Calcolo della percentuale
  const percentage = ((props.points % 200) / 200) * 100;

  return (
    <>
      <div className="GreenPointsBox">
        <p className="GreenPointsTitle">Green Points</p>
        <p className="GreenPointsRange">
          {props.points}/{nextLimit}
        </p>
        <progress
          value={Math.round(percentage)}
          max="100"
          className="bar"
        ></progress>
        <p className="GreenPointsNext">
          Soli {nextPoints} punti per risparmiare 2kg di CO2
        </p>
      </div>
    </>
  );
}

export default GreenPoints;
