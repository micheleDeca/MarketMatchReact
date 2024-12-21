import React, { useState } from 'react'
import './OperationLong.css'
import { useUserContext } from '../../Context/UserContext';
import { Link } from 'react-router';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import PlusIcon from './assets/plus.svg';



/**
 * Props da passare al componente ReservationLong per richiamarlo correttamente:
 * 
 * @prop {string} userType - Il tipo di utente, usato per determinare quali informazioni mostrare. Possibili valori:
 *    - "AmmA" (Amministratore)
 *    - "NegA" (Negoziante)
 *    - "ConA" (Consumatore)
 * 
 * @prop {string} status - Lo stato della prenotazione, usato per determinare colore e testo. Possibili valori:
 *    - "ritirato" - "daRitirare" - "accettato"  - "prenotato" - "rifiutato" - Default: Colore grigio, testo "Sconosciuto"
 * 
 * @prop {string|number} id - L'identificativo della prenotazione. (es. "12345")
 * @prop {string} reservationDate - La data della prenotazione. (es. "01/12/2024")
 * @prop {string} infoDate - Data specifica legata allo stato della prenotazione. (es. "01/12/2024")
 * @prop {string|number} customerId - L'identificativo del cliente, visibile solo per "AmmA" e "NegA". (es. "56789")
 * @prop {string|number} shopId - L'identificativo del negozio, visibile per "ConA" e "AmmA". (es. "98765")
 * 
 * Esempio di utilizzo:
 * <ReservationLong 
 *   userType="AmmA" 
 *   status="ritirato" 
 *   id="12345" 
 *   reservationDate="2024-12-01" 
 *   infoDate="2024-12-05" 
 *   customerId="56789" 
 *   shopId="98765" 
 * />
 */

/*
Tipologia:
-reservation;
-pointPlus
-pointMinus
*/

const OperationLong = (props) => {
    const { userType } = useUserContext();
    const operation = props;


    const isVisibleForUserType = (types) => types.includes(userType);
    const isVisibleForOperationType = (types) => types.includes(operation.type);

    // Funzione per determinare colore e testo in base allo stato
    const getStylesByStatus = (status) => {
        switch (status) {
            case "ritirato":
                return { iconColor: "#4CAF50", colorDate: "", text: "Ritirato il:", meaning: "La prenotazione è stata ritirata." }; // Verde
            case "daRitirare":
                return { iconColor: "#FF9800", colorDate: "#F44336", text: "Da ritirare entro:", meaning: "La prenotazione è pronta per essere ritirata." }; // Arancione
            case "accettato":
                return { iconColor: "#2196F3", colorDate: "", text: "Accettato il:", meaning: "La prenotazione è stata accettata dal negozio." }; // Blu
            case "prenotato":
                return { iconColor: "#F3D700", colorDate: "", text: "Prenotato il:", meaning: "La prenotazione è stata creata." }; // Giallo
            case "rifiutato":
                return { iconColor: "#F44336", colorDate: "", text: "Rifiutato il:", meaning: "La prenotazione è stata rifiutata." }; // Rosso
            case "scaduto":
                return { iconColor: "#8000af", colorDate: "", text: "Annullato il:", meaning: "La prenotazione è scaduta." }; // Viola
            default:
                return { iconColor: "#9E9E9E", colorDate: "", text: "Sconosciuto", meaning: "Stato della prenotazione non riconosciuto." }; // Grigio
        }
    };

    // Ottieni il colore e il testo in base ai props
    const { iconColor, colorDate, text, meaning } = getStylesByStatus(operation.status);


    return (
        <div className="reservation-long">

            {isVisibleForOperationType("reservation") ? (<svg
                className={`reservation-icon-long ${operation.status === "daRitirare" ? "pulse" : ""}`}
                data-tooltip-id={`tooltip-${operation.id}`} // ID unico del tooltip
                data-tooltip-content={meaning} // Contenuto del tooltip
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 17C13.3833 17 14.5625 16.5125 15.5375 15.5375C16.5125 14.5625 17 13.3833 17 12C17 10.6167 16.5125 9.4375 15.5375 8.4625C14.5625 7.4875 13.3833 7 12 7C10.6167 7 9.4375 7.4875 8.4625 8.4625C7.4875 9.4375 7 10.6167 7 12C7 13.3833 7.4875 14.5625 8.4625 15.5375C9.4375 16.5125 10.6167 17 12 17ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
                    fill={iconColor}
                />
            </svg>) : (isVisibleForOperationType("pointPlus") ? (<svg xmlns="http://www.w3.org/2000/svg" className='reservation-icon-long' fill="#41c562" viewBox="0 0 24 24" fill-rule="evenodd"><path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z" /></svg>
            ) : (isVisibleForOperationType("pointMinus") ? (<svg className='reservation-icon-long' viewBox="0 0 24 24" fill="#bf1515" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L18 12" stroke="#bf1515" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>) : (<></>))
            )}

            <Link
                to={
                    isVisibleForOperationType("reservation")
                        ? `/prenotazione/${operation.id}`
                        : isVisibleForOperationType(["pointPlus", "pointMinus"])
                            ? `/greenPoint/${operation.id}`
                            : "#"
                }
                className="reservation-link"
            >                <div className="reservation-info-long">
                    <div className="reservation-name-date-long">
                        <span className="reservation-name-long">{operation.id}</span>
                        <span className="reservation-a-long">-</span>
                        <span className="reservation-date-long">{operation.operationDate}</span>
                    </div>
                    {isVisibleForOperationType("reservation") && <div className="reservation-state-date-long">
                        <span className="reservation-state-long">{text}</span>
                        <span className="reservation-date-state-long" style={{ color: colorDate }}>
                            {operation.infoDate}
                        </span>
                    </div>}
                    {isVisibleForOperationType("reservation") && <div className="reservation-bigInfo-long">
                        {isVisibleForUserType(["AmmA", "NegA"]) && <span className="reservation-bigInfo-uno-long">Consumatore: {operation.customerId}</span>}
                        {isVisibleForUserType(["ConA", "AmmA"]) && <span className="reservation-bigInfo-due-long">Negozio: {operation.shopId}</span>}
                    </div>}
                    {isVisibleForOperationType(["pointPlus", "pointMinus"]) && <div className="reservation-bigInfo-long">
                        <span className="reservation-bigInfo-points">{operation.value} Green Points</span>
                    </div>}
                </div>

                <span className="reservation-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6 12L8 7.4L9.4 6L15.4 12L9.4 18L8 16.6L12.6 12Z" fill="#1D1B20" />
                    </svg>
                </span>
            </Link>

        </div>
    );
};

export default OperationLong
