import axios from 'axios';
import { BASE_URL, IS_MOCKKED } from '../../../config';
import { getToken } from '../../../LocalStorage/TokenStorage';



const categoriesList = [
    "Bio",
    "Vegano",
    "Vegetariano",
    "Senza glutine",
    "Senza lattosio",
    "Km0",
    "Sostenibile",
];

// Funzione per generare categorie casuali rispettando le regole
const generateCategories = () => {
    const possibleCategories = categoriesList.filter((category) => {
        return !(category === "Vegano" || category === "Vegetariano");
    });

    const numberOfCategories = Math.floor(Math.random() * 4) + 1;

    let selectedCategories = possibleCategories.sort(() => 0.5 - Math.random()).slice(0, numberOfCategories - 1);

    if (Math.random() > 0.5 && !selectedCategories.includes("Vegetariano")) {
        selectedCategories.push("Vegano");
    } else if (!selectedCategories.includes("Vegano")) {
        selectedCategories.push("Vegetariano");
    }

    return selectedCategories.slice(0, 4);
};

// Simula un database di prodotti
const mockProducts = Array.from({ length: 200 }, (_, index) => {
    const hasDiscount = Math.random() > 0.4;
    return {
        id: index + 1,
        name: `Prodotto ${index + 1}`,
        detail: `Dettaglio del prodotto ${index + 1}`,
        currentPrice: (Math.random() * 100).toFixed(2),
        originalPrice: hasDiscount ? (Math.random() * 100 + 100).toFixed(2) : null,
        image: `https://via.placeholder.com/150?text=Prodotto+${index + 1}`,
        categories: generateCategories(),
    };
});

// Funzione per gestire la paginazione nei mock
const getMockProductsByPage = (page, productsPerPage) => {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return mockProducts.slice(startIndex, endIndex);
};


// Funzione per ottenere i prodotti (mock o database)
export const fetchProductFilteredUpdater = async (currentPage, productsPerPage, props) => {
    const requestParam = props;

    
    if (IS_MOCKKED) {
        // Simula un ritardo per i dati mock
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = getMockProductsByPage(currentPage, productsPerPage);
                resolve(data);
            }, 100); // Ritardo simulato di 100ms
        });
    } else {
        const token = getToken();

        try {
            const response = await axios.post(
                `${BASE_URL}/api/product/filtered`,
                {
                    currentPage: currentPage,
                    productsPerPage: productsPerPage,
                    minPrezzo: requestParam.minPrezzo,
                    maxPrezzo: requestParam.maxPrezzo,
                    filterPrezzoOfferta: requestParam.filterPrezzoOfferta,
                    categories: requestParam.categories,
                    sortOrder: requestParam.sortOrder,
                    userLatitude: requestParam.userLatitude,
                    userLongitude: requestParam.userLongitude,
                    maxDistance: requestParam.maxDistance,
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
            console.error('Errore durante il recupero dei prodotti:', error);
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