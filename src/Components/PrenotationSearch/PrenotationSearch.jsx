import "./PrenotationSearch.css";
import PrenStatusFilter from "../Prenotation_status_filter/Prenotation_status_filter";
import SearchBar from "../SearchBar/SearchBar";

/**
 * PrenotationSearch component renders a search interface for managing prenotations.
 * It includes a status filter component and a search bar to filter and search prenotations.
 *
 * @param {Object} props - Component properties.
 * @param {function} props.onStateChange - Function to handle changes in the status filter.
 * @param {function} props.onSearchChange - Function to handle changes in the search bar input.
 * @param {boolean} props.first - Status filter for the first option.
 * @param {boolean} props.second - Status filter for the second option.
 * @param {boolean} props.third - Status filter for the third option.
 * @param {boolean} props.fourth - Status filter for the fourth option.
 * @param {boolean} props.fifth - Status filter for the fifth option.
 * @param {boolean} props.sixth - Status filter for the sixth option.
 * @param {boolean} props.seventh - Status filter for the seventh option.
 * @returns {JSX.Element} The rendered PrenotationSearch component.
 */

function PrenotationSearch(props) {
  return (
    <>
      <div className="PrenotationSearchBox">
        <PrenStatusFilter
          onChange={props.onStateChange}
          first={props.first}
          second={props.second}
          third={props.third}
          fourth={props.fourth}
          fifth={props.fifth}
          sixth={props.sixth}
          seventh={props.seventh}
        />
        <span className="PrenotationSearchSpan"></span>
        <span className="SearchBarWidth"><SearchBar type="ricerca" onStateChange={props.onSearchChange}/></span>
      </div>
    </>
  );
}

export default PrenotationSearch;
