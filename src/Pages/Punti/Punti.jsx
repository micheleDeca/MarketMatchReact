import "./Punti.css";
import GreenPointsCO2 from "../../Components/GreenPointsCO2/GreenPointsCO2.jsx";
import OperationLongContainer from "../../Components/OperationLongContainer/OperationLongContainer.jsx";

const operazioni = [

    {
        id: "Motivo Accredito 1",
        reservationDate: "15/12/2024",
        pointValue: "23",
        pointType: "plus",
    },


    {
        id: "Motivo Accredito 2",
        reservationDate: "16/12/2024",
        pointValue: "10",
        pointType: "minus",
    },

    {
        id: "Motivo Accredito 3",
        reservationDate: "17/12/2024",
        pointValue: "35",
        pointType: "plus",
    },

    {
        id: "Motivo Accredito 4",
        reservationDate: "18/12/2024",
        pointValue: "5",
        pointType: "minus",
    },

];


function Punti() {
    const punti = 1080;

    return (
        <>
            <div className="PuntiBox">
                <GreenPointsCO2 points={punti} />
            </div>
            <div className="point-operation-container" >
                <OperationLongContainer operations={operazioni} type={"point"} />
            </div>
        </>
    );
}

export default Punti;
