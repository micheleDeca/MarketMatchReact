import "./Punti.css";
import GreenPointsCO2 from "../../Components/GreenPointsCO2/GreenPointsCO2.jsx";
import OperationLongContainer from "../../Components/OperationLongContainer/OperationLongContainer.jsx";
import { useEffect, useState } from "react";
import ButtonSucessivo from "../../Components/ButtonSucessivo/ButtonSucessivo.jsx";
import ButtonPrecedente from "../../Components/ButtonPrecedente/ButtonPrecedente.jsx";

const mockOperations = [];

const startDate = new Date(2024, 11, 15); // Months are 0-indexed in JavaScript

for (let i = 0; i < 50; i++) {
    const operation = {
        id: `Motivo Accredito ${i + 1}`,
        reservationDate: new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000).toLocaleDateString("it-IT"),
        pointValue: Math.floor(Math.random() * 50) + 1,
        pointType: Math.random() > 0.5 ? "plus" : "minus",
    };

    mockOperations.push(operation);
}

function Punti() {
    const punti = 1080;

    const [operations, setOperations] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1); 
    const operationsPerPage = 5; 

    const fetchOperations = (page) => {
        // Recupera le prenotazioni per la pagina attuale
        const startIndex = (page - 1) * operationsPerPage;
        const endIndex = startIndex + operationsPerPage;
        const pageOperations = mockOperations.slice(startIndex, endIndex);

        setOperations(pageOperations);
    };


    useEffect(() => {
        fetchOperations(currentPage);
    }, [currentPage]);

    return (
        <>
            <div className="PuntiBox">
                <GreenPointsCO2 points={punti} />
            </div>
            <div className="point-operation-container" >
                <OperationLongContainer operations={operations} type={"point"} />
            </div>
            <div className="prenButton">
                {currentPage >= 2 && (
                    <ButtonPrecedente onclick={() => setCurrentPage(currentPage - 1)} />
                )}

                {currentPage < (mockOperations.length / operationsPerPage) && (
                    <ButtonSucessivo name="Successivo" onclick={() => setCurrentPage(currentPage + 1)} />
                )}
            </div>

        </>
    );
}

export default Punti;
