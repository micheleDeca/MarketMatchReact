import "./CO2.css";

function CO2(props) {
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
