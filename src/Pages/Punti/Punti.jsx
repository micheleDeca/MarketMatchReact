import "./Punti.css";
import GreenPointsCO2 from "../../Components/GreenPointsCO2/GreenPointsCO2.jsx";
import OperationLongContainer from "../../Components/OperationLongContainer/OperationLongContainer.jsx";

const operazioni = [
    {
        tipoOperazione: "pointPlus",
        punti: {
            id: "Motivo Accredito 1",
            reservationDate: "15/12/2024",
            value: "23"
        }
    },
    {
        tipoOperazione: "pointMalus",
        punti: {
            id: "Motivo Accredito 2",
            reservationDate: "16/12/2024",
            value: "10"
        }
    },
    {
        tipoOperazione: "pointPlus",
        punti: {
            id: "Motivo Accredito 3",
            reservationDate: "17/12/2024",
            value: "35"
        }
    },
    {
        tipoOperazione: "pointMalus",
        punti: {
            id: "Motivo Accredito 4",
            reservationDate: "18/12/2024",
            value: "5"
        }
    }
];


function Punti() {
    const punti = 1080;

    return (
        <>
            <div className="PuntiBox">
                <GreenPointsCO2 points={punti}/>
                <OperationLongContainer />
            </div>
        </>
    );
}

export default Punti;
