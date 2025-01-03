import ButtonFilter from "../../Components/ButtonFilter/ButtonFilter"
import CardContainer from "../../Components/CardContainer/CardContainer";
import SearchBar from "../../Components/SearchBar/SearchBar"
import './Recipes.css'
import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-pagination-bar';
import { useCategoryContext } from "../../Context/CategoryContex";
import LoadingPage from '../LoadingPage/LoadingPage';
import { fetchRecipeFilteredUpdater } from "./Uploader/RecipeUpdater";
import '../../ExternalContent/PaginationBar.css';
import { getNumberRecipeFiltered } from "./Uploader/NumRecipeUpdater";






const Recipes = () => {

    const { category: categoryList } = useCategoryContext();

    const orderNames = ["Prezzo crescente", "Prezzo decrescente", "Nome", "Rilevanza", "Cottura Crescente", "Cottura Decrescente",
        "Preparazione Crescente", "Preparazione Decrescente", "Difficoltà Crescente", "Difficoltà Decrescente"];
    const filterNames = [...categoryList.map((cat) => cat.categoryName)];



    const [recipes, setRecipes] = useState([]); // Stato per le ricette
    const [currentPage, setCurrentPage] = useState(() => {
        // Recupera la pagina corrente da sessionStorage, di default 1
        const savedPage = sessionStorage.getItem('currentPageRecepies');
        return savedPage ? parseInt(savedPage, 10) : 1;
    });
    const [loading, setLoading] = useState(true); // Stato per il caricamento
    const [error, setError] = useState(null); // Stato per gli errori
    const [totalItems, setTotalItems] = useState(0);
    const [requestParams, setRequestParams] = useState({
        categories: null,
        minCost: null,
        maxCost: null,
        minDifficulty: null,
        maxDifficulty: null,
        sortOrder: "PrezzoDecrescente",
        currentPage: 1,
        recipesPerPage: 15,
        searchName: null
    });

    const recipesPerPage = 15; // Numero di ricette per pagina

    // Effetto per richiedere quantità ricette per pagination
    useEffect(() => {
        let isMounted = true; // Flag per evitare aggiornamenti su componenti smontati
        const getNumProducts = async () => {
            try {
                const recipesData = await getNumberRecipeFiltered(requestParams); // Usa la funzione dal modulo
                if (isMounted) {
                    setTotalItems(recipesData); // Aggiorna lo stato
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message); // Gestisci l'errore
                }
            }
        };

        getNumProducts();

        // Cleanup: evita aggiornamenti su componenti smontati
        return () => {
            isMounted = false;
        };
    }, [requestParams]); //inserire prossimamente, aggiornamento in base ai filtri scelti


    // Effetto per caricare le ricette quando cambia la pagina
    useEffect(() => {
        let isMounted = true; // Flag per evitare aggiornamenti su componenti smontati

        const getRecipes = async () => {
            try {
                const recipesData = await fetchRecipeFilteredUpdater(currentPage, recipesPerPage, requestParams); // Usa la funzione dal modulo
                if (isMounted) {
                    setRecipes(recipesData); // Aggiorna lo stato
                    setLoading(false); // Ferma il caricamento
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message); // Gestisci l'errore
                    setLoading(false);
                }
            }
        };

        getRecipes();

        // Salva la pagina corrente nel sessionStorage
        sessionStorage.setItem('currentPageRecepies', currentPage);

        // Cleanup: evita aggiornamenti su componenti smontati
        return () => {
            isMounted = false;
        };


    }, [currentPage, requestParams]);



    if (loading) return <div><LoadingPage /></div>;
    if (error) return <div>Errore: {error}</div>;

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

            <div className="content-container">
                <div className="container-product">
                    <CardContainer card={recipes} type={"recipe"} />
                </div>
                <div className="pagination-container">
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalItems}
                        itemsPerPage={recipesPerPage}
                        onPageChange={(page) => setCurrentPage(page)}
                        pageNeighbours={1}
                    />
                </div>
            </div>
        </div>
    );
};

export default Recipes;
