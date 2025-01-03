import axios from 'axios';
import { BASE_URL, IS_MOCKKED } from '../../../config';
import { getToken } from '../../../LocalStorage/TokenStorage';
import { useUserContext } from '../../../Context/UserContext';

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

// Funzione per gestire la paginazione nei mock
const getMockRecipesByPage = (page, productsPerPage) => {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return mockRecipes.slice(startIndex, endIndex);
};



// Funzione per ottenere i prodotti (mock o database)
export const fetchRecipeFilteredUpdater = async (currentPage, productsPerPage, props) => {
    const requestParam = props;


    if (IS_MOCKKED) {
        // Simula un ritardo per i dati mock
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = getMockRecipesByPage(currentPage, productsPerPage);
                resolve(data);
            }, 100); // Ritardo simulato di 100ms
        });
    } else {
        const token = getToken();

        try {
            const response = await axios.post(
                `${BASE_URL}/api/recipe/filtered`,
                {
                    categories: requestParam.categories,
                    minCost: requestParam.minCost,
                    maxCost: requestParam.maxCost,
                    minDifficulty: requestParam.minDifficulty,
                    maxDifficulty: requestParam.maxDifficulty,
                    sortOrder: requestParam.sortOrder,
                    currentPage: currentPage,
                    recipesPerPage: productsPerPage,
                    searchName: requestParam.searchName

                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Token di autenticazione
                    },
                }
            );


            const filteredData = response.data.filter((item) => item.name);
            return filteredData;
        } catch (error) {
            console.error('Errore durante il recupero delle ricette:', error);
            throw error;
        }
    }
};



/**
 TEORIA:

1. Promise
Le Promise sono oggetti che rappresentano il risultato di un'operazione asincrona. Una volta che l'operazione è completata, la Promise può essere:

risolta (resolved) con un risultato,
rifiutata (rejected) con un errore.
Sintassi delle Promise
Esempio con axios:

const fetchData = () => {
  axios.get('https://api.example.com/data')
    .then((response) => {
      console.log('Dati ricevuti:', response.data);
    })
    .catch((error) => {
      console.error('Errore durante la richiesta:', error);
    });
};
then(): Usato per gestire il risultato della promessa (se la richiesta ha successo).
catch(): Usato per gestire gli errori (se la richiesta fallisce).


2. Async/Await
Il costrutto async/await è una sintassi più moderna introdotta in ECMAScript 2017 (ES8). Serve per scrivere codice asincrono in modo simile al codice sincrono, rendendolo più leggibile.

Sintassi di async/await
Esempio con axios:

const fetchData = async () => {
  try {
    const response = await axios.get('https://api.example.com/data');
    console.log('Dati ricevuti:', response.data);
  } catch (error) {
    console.error('Errore durante la richiesta:', error);
  }
};
async: Indica che una funzione contiene codice asincrono e restituisce automaticamente una Promise.
await: Pausa l'esecuzione della funzione fino a quando la Promise non è risolta o rifiutata, permettendo di ottenere direttamente il risultato.


 */