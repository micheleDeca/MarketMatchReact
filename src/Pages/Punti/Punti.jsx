import "./Punti.css";
import GreenPointsCO2 from "../../Components/GreenPointsCO2/GreenPointsCO2.jsx";
import OperationLongContainer from "../../Components/OperationLongContainer/OperationLongContainer.jsx";

const operations = [];

const startDate = new Date(2024, 11, 15); // Months are 0-indexed in JavaScript

for (let i = 0; i < 50; i++) {
    const operation = {
        id: `Motivo Accredito ${i + 1}`,
        reservationDate: new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000).toLocaleDateString("it-IT"),
        pointValue: Math.floor(Math.random() * 50) + 1,
        pointType: Math.random() > 0.5 ? "plus" : "minus",
    };

    operations.push(operation);
}

function Punti() {
    const punti = 1080;

    return (
        <>
            <div className="PuntiBox">
                <GreenPointsCO2 points={punti} />
            </div>
            <div className="point-operation-container" >
                <OperationLongContainer operations={operations} type={"point"} />
            </div>
        </>
    );
}

export default Punti;
