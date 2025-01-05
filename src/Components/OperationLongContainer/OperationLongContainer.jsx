import React from 'react'
import OperationLong from '../OperationLong/OperationLong'
/**
 * Componente OperationLongContainer
 * 
 * Descrizione:
 * `OperationLongContainer` è un contenitore che visualizza una lista di operazioni tramite il componente figlio `OperationLong`.
 * È utile per gestire e mostrare un insieme di operazioni come prenotazioni o accrediti punti.
 * 
 * Props:
 * - `operations` {Array<Object>}: Un array di oggetti che rappresentano le operazioni. Ogni oggetto deve contenere:
 *   - `status` {string}: Lo stato dell'operazione. (es. "prenotato", "ritirato")
 *   - `id` {string|number}: L'identificativo unico dell'operazione. (es. 12345)
 *   - `reservationDate` {string}: La data associata alla prenotazione. (es. "15/12/2024")
 *   - `infoDate` {string}: Una data aggiuntiva relativa all'operazione. (es. "16/12/2024")
 *   - `shopId` {string|number}: L'identificativo del negozio associato. (es. "SHOP123")
 *   - `customerId` {string|number}: L'identificativo del cliente associato. (es. "CUST456")
 *   - `pointValue` {number}: Il valore dei punti associati all'operazione. (es. 50)
 * 
 * - `type` {string}: Specifica il tipo di operazione visualizzata. Possibili valori:
 *   - "reservation": Per operazioni relative alle prenotazioni.
 *   - "pointPlus": Per accrediti di punti.
 *   - "pointMalus": Per sottrazioni di punti.
 *  
 * ESEMPIO PER PRENOTAZIONI
 * const operations = [
 *   {
 *     status: "prenotato",
 *     id: 12345,
 *     reservationDate: "15/12/2024",
 *     infoDate: "16/12/2024",
 *     shopId: "SHOP123",
 *     customerId: "CUST456",
 *   }
 * ];
 * 
 * <OperationLongContainer operations={operations} type="reservation" />
 * 
 * ESEMPIO PER PUNTI
 * const operations = [
 *   {
 *     id: "Motivo Accredito",
 *     reservationDate: "15/12/2024",
 *     value: "23"
 *   }
 * ];
 * 
 * <OperationLongContainer operations={operations} type="pointPlus" />
 *  
 * 
  
 */


const OperationLongContainer = ({operations, type}) => {
    return (
        <div>

            <div className="operations">

                {operations.map((operation) => (
                    <OperationLong
                        key={operation.id} 
                        status={operation.status} //Prenotazione
                        id={(type === "reservation"? "#":"") + operation.id} //Prenotazione e Motivo accredito punti
                        operationDate={operation.reservationDate} //Prenotazione e punti
                        infoDate={operation.infoDate} //Prenotazione
                        shopId={operation.storeName} //Prenotazione
                        customerId={operation.customerFirstName + " " + operation.customerLastName} //Prenotazione
                        value={operation.pointValue} //punti
                        pointType={operation.pointType} //punti  plus, minus
                        type={type} //reservation, point
                    />
                ))}

            </div>

        </div>
    )
}

export default OperationLongContainer
