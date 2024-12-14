import "./PrenotationSearch.css";
import PrenStatusFilter from "../Prenotation_status_filter/Prenotation_status_filter";
import SearchBar from "../SearchBar/SearchBar";

/**
 * A component that combines a reservation status filter and a search bar.
 *
 * @component
 * @param {Object} props - The props object for the PrenotationSearch component.
 * @param {string} props.first - Label for the first filter option in PrenStatusFilter.
 * @param {string} props.second - Label for the second filter option in PrenStatusFilter.
 * @param {string} props.third - Label for the third filter option in PrenStatusFilter.
 * @param {string} props.fourth - Label for the fourth filter option in PrenStatusFilter.
 * @param {string} props.fifth - Label for the fifth filter option in PrenStatusFilter.
 *
 * @returns {JSX.Element} A component containing a reservation status filter and a search bar.
 */

function PrenotationSearch(props) {
  return (
    <>
      <div className="PrenotationSearchBox">
        <PrenStatusFilter
          first={props.first}
          second={props.second}
          third={props.third}
          fourth={props.fourth}
          fifth={props.fifth}
        />
        <span className="PrenotationSearchSpan"></span>
        <SearchBar />
      </div>
    </>
  );
}

export default PrenotationSearch;
