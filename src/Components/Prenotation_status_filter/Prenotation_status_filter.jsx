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

  return (
    <>
      <select className="SelectFilter">
        <option className="option1">{props.first}</option>
        <option>{props.second}</option>
        <option>{props.third}</option>
        <option>{props.fourth}</option>
        <option>{props.fifth}</option>
        <option>{props.sixth}</option>
        <option>{props.seventh}</option>
      </select>
    </>
  );
}

export default PrenStatusFilter;
