import "./SearchBar.css";
import SearchIcon from './search.svg';
import MenuIcon from './menu.svg';

/**
 * A component that displays a search bar with a menu icon and a search icon.
 *
 * @component
 * @returns {JSX.Element} A search bar component with input and accompanying icons.
 */

function SearchBar() {
  return (
    <>
      <div className="SearchBarBox">
        <img src={MenuIcon} alt="menu" className="SearchBarImg"/>
        <input type="text" className="SearchBarInput" placeholder="Cerca..."/>
        <img src={SearchIcon} alt="search" className="SearchBarImg"/>
      </div>
    </>
  );
}

export default SearchBar;