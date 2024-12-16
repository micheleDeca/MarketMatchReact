import "./GreenPoints.css";

function GreenPoints(props) {

  const calculateNextLimit = (range) => {
    return Math.ceil(range / 200) * 200;
  };

  // Calcolo del prossimo limite
  const nextLimit = calculateNextLimit(props.range);

  const nextPoints = nextLimit - props.range;

// Calcolo della percentuale
const percentage = ((props.range % 200) / 200) * 100;

  return (
    <>
      <div className="GreenPointsBox">
        <p className="GreenPointsTitle">Green Points</p>
        <p className="GreenPointsRange">
          {props.range}/{nextLimit}
        </p>
        <progress value={Math.round(percentage)} max="100" className="bar"></progress>
        <p className="GreenPointsNext">Soli {nextPoints} punti per risparmiare 2kg di CO2</p>
      </div>
    </>
  );
}

export default GreenPoints;
