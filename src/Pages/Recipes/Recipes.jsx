import ButtonFilter from "../../Components/ButtonFilter/ButtonFilter"
import SearchBar from "../../Components/SearchBar/SearchBar"
import './Recipes.css'

const orderNames = ["Prezzo crescente", "Prezzo decrescente", "Nome", "Rilevanza", "Cottura Crescente", "Cottura Decrescente",
    "Preparazione Crescente", "Preparazione Decrescente", "Difficoltà Crescente", "Difficoltà Decrescente"];
const filterNames = ["Bio", "Senza Lattosio", "Senza Glutine", "Vegetariano", "Vegan", "Km0"];

const Recipes = () => {
    return (
        <div className="recipes-page">
            <div className="recipesTitle">
                <h1>Ricette</h1>
            </div>
            <div className="recipes-header">
                <div className="searchBar">
                    <SearchBar />
                </div>
                <div className="filterButton">
                    <ButtonFilter order={orderNames} filter={filterNames} type="ConA, Ric" />
                </div>
            </div>
        </div>
    )
}

export default Recipes;