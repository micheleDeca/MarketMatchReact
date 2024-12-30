import ButtonFilter from "../../Components/ButtonFilter/ButtonFilter"
import CardContainer from "../../Components/CardContainer/CardContainer";
import SearchBar from "../../Components/SearchBar/SearchBar"
import './Recipes.css'
import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-pagination-bar';
import { useCategoryContext } from "../../Context/CategoryContex";

// Funzione per generare categorie casuali rispettando le regole
const generateCategories = () => {
    const categoriesList = [
        "Bio",
        "Vegano",
        "Vegetariano",
        "Senza glutine",
        "Senza lattosio",
        "Km0",
    ];

    // Numero casuale di categorie da assegnare (tra 1 e 4)
    const numberOfCategories = Math.floor(Math.random() * 4) + 1;

    // Seleziona categorie casuali
    let selectedCategories = categoriesList.sort(() => 0.5 - Math.random()).slice(0, numberOfCategories - 1);

    // Aggiungi "Vegan" o "Vegetariano" (non entrambi)
    if (Math.random() > 0.5 && !selectedCategories.includes("Vegetariano")) {
        selectedCategories.push("Vegano");
    } else if (!selectedCategories.includes("Vegano")) {
        selectedCategories.push("Vegetariano");
    }

    // Assicurati che il numero massimo sia 4
    return selectedCategories.slice(0, 4);
};

// Funzione per generare un valore casuale tra 1 e 5
const randomRating = () => Math.floor(Math.random() * 5) + 1;

// Simula un database di ricette
const mockRecipes = Array.from({ length: 50 }, (_, index) => {
    return {
        id: index + 1,
        name: `Ricetta ${index + 1}`,
        detail: `Descrizione della ricetta ${index + 1}`,
        categories: generateCategories(), // Genera le categorie dinamicamente
        image: `https://via.placeholder.com/150?text=Ricetta+${index + 1}`,
        difficulty: randomRating(), // Difficoltà (1 a 5)
        prepTime: randomRating(), // Tempo di preparazione (1 a 5)
        cookTime: randomRating(), // Tempo di cottura (1 a 5)
        cost: randomRating() // Costo (1 a 5)
    };
});

console.log(mockRecipes);



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

    const recipesPerPage = 15; // Numero di ricette per pagina

    // Funzione per simulare il recupero delle ricette
    const fetchRecipes = (page) => {
        const startIndex = (page - 1) * recipesPerPage;
        const endIndex = startIndex + recipesPerPage;
        const pageRecipes = mockRecipes.slice(startIndex, endIndex);

        setRecipes(pageRecipes);
    };

    // Effetto per caricare le ricette quando cambia la pagina
    useEffect(() => {
        fetchRecipes(currentPage);

        // Salva la pagina corrente nel sessionStorage
        sessionStorage.setItem('currentPageRecepies', currentPage);
    }, [currentPage]);

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
                        totalItems={mockRecipes.length}
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
