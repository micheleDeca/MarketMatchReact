import "./GreenPointsCO2.css";
import CO2 from "../C02/CO2.jsx";
import GreenPoints from "../GreenPoints/GreenPoints.jsx";

function GreenPointsCO2(props) {

    return (
        <>
            <div className="GreenPointsCO2Box">
                <GreenPoints points={props.points}/>
                <CO2 points={props.points}/>
            </div>
        </>
    );
}

export default GreenPointsCO2;
