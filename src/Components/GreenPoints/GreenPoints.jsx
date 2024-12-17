import "./GreenPoints.css";

function GreenPoints(props) {

  const calculateNextLimit = (points) => {
    return Math.ceil(points / 200) * 200;
  };

  // Calcolo del prossimo limite
  const nextLimit = calculateNextLimit(props.points);

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
        <progress value={Math.round(percentage)} max="100" className="bar"></progress>
        <p className="GreenPointsNext">Soli {nextPoints} punti per risparmiare 2kg di CO2</p>
      </div>
    </>
  );
}

export default GreenPoints;
