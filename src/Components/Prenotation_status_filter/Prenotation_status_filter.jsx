import { useState } from "react";
import "./Prenotation_status_filter.css";

/**
 * A component to display a filter for reservation statuses with visual feedback.
 *
 * @component
 * @param {Object} props - The props object for the PrenStatusFilter component.
 * @param {string} props.first - Label for the first filter option.
 * @param {string} props.second - Label for the second filter option.
 * @param {string} props.third - Label for the third filter option.
 * @param {string} props.fourth - Label for the fourth filter option.
 * @param {string} props.fifth - Label for the fifth filter option.
 * @param {string} props.sixth - Label for the sixth filter option.
 * @param {string} props.seventh - Label for the seventh filter option.
 *
 * @returns {JSX.Element} A component displaying clickable filter options with styled borders.
 */

function PrenStatusFilter(props) {
  const border = (mode) => {
    const span = document.querySelectorAll(".PrenStatusFilterSpan");
  };

  // Stato per memorizzare l'opzione selezionata
  const [selectedOption, setSelectedOption] = useState("");

  // Funzione per gestire il cambio dell'opzione selezionata
  const handleChange = (event) => {
    const value = event.target.value; // Valore dell'opzione selezionata
    setSelectedOption(value); // Aggiorna lo stato
    props.onChange('state', value); // Notifica il padre del cambio stato
  };

  return (
    <>
      <select className="SelectFilter" value={selectedOption} onChange={handleChange} >
        <option className="option1">{props.first}</option>
        {props.second && <option>{props.second}</option>}
        {props.third && <option>{props.third}</option>}
        {props.fourth && <option>{props.fourth}</option>}
        {props.fifth && <option>{props.fifth}</option>}
        {props.sixth && <option>{props.sixth}</option>}
        {props.seventh && <option>{props.seventh}</option>}
      </select>
    </>
  );
}

export default PrenStatusFilter;
