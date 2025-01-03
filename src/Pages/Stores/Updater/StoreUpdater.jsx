import axios from 'axios';
import { BASE_URL, IS_MOCKKED } from '../../../config';
import { getToken } from '../../../LocalStorage/TokenStorage';

// Simulazione del database di negozi: un array di oggetti rappresenta i negozi
// con informazioni come id, nome, posizione geografica (latitudine, longitudine),
// punteggio (rating), indirizzo e categorie di appartenenza.
const allStores = [
    { id: 1, name: "Vegan Café La Sorgente", latitude: 41.125, longitude: 16.868, rating: 4.5, address: "Corso Vittorio Emanuele II, 10", city: "Bari", categories: ["Vegan", "Bio"], image: "http://4.232.65.20/assets/negozio/2.jpg" },
    { id: 2, name: "Green Bites Bistro", latitude: 41.128, longitude: 16.871, rating: 4.2, address: "Piazza San Nicola, 15", city: "Bari", categories: ["Vegetariano", "Bio"], image: "http://4.232.65.20/assets/negozio/9.webp" },
    { id: 3, name: "Bio e Vegan Delights", latitude: 41.123, longitude: 16.873, rating: 4.7, address: "Via Sparano, 30", city: "Bari", categories: ["Senza Glutine", "Bio"], image: "https://via.placeholder.com/150" },
    { id: 4, name: "Naturalia Market", latitude: 41.121, longitude: 16.869, rating: 4.8, address: "Via Argiro, 15", city: "Bari", categories: ["Vegano", "Ecologico"], image: "https://via.placeholder.com/150" },
    { id: 5, name: "Puro Organic Food", latitude: 41.116, longitude: 16.874, rating: 4.6, address: "Piazza Garibaldi, 20", city: "Bari", categories: ["Biologico", "Km0"], image: "https://via.placeholder.com/150" },
    { id: 6, name: "EcoGusto Store", latitude: 41.118, longitude: 16.876, rating: 4.4, address: "Via Melo, 40", city: "Bari", categories: ["Vegan", "Sostenibile"], image: "https://via.placeholder.com/150" },
    { id: 7, name: "Fresh Green Hub", latitude: 41.119, longitude: 16.868, rating: 4.3, address: "Corso Cavour, 12", city: "Bari", categories: ["Naturale", "Eco"], image: "https://via.placeholder.com/150" },
    { id: 8, name: "The Veggie Place", latitude: 41.117, longitude: 16.873, rating: 4.9, address: "Via Amendola, 60", city: "Bari", categories: ["Vegetariano", "Organico"], image: "https://via.placeholder.com/150" },
    { id: 9, name: "Eden Vegan Shop", latitude: 41.118, longitude: 16.877, rating: 4.5, address: "Via De Rossi, 18", city: "Bari", categories: ["Vegano", "Gourmet"], image: "https://via.placeholder.com/150" },
    { id: 10, name: "Bari Bio Market", latitude: 41.115, longitude: 16.870, rating: 4.8, address: "Via Manzoni, 25", city: "Bari", categories: ["Bio", "Tradizionale"], image: "https://via.placeholder.com/150" },
    { id: 11, name: "Il Germoglio Verde", latitude: 41.110, longitude: 16.865, rating: 4.7, address: "Via Putignani, 35", city: "Bari", categories: ["Sostenibile", "Vegan"], image: "https://via.placeholder.com/150" },
    { id: 12, name: "NaturBio Emporium", latitude: 41.122, longitude: 16.872, rating: 4.6, address: "Via Quintino Sella, 12", city: "Bari", categories: ["Km0", "Naturale"], image: "https://via.placeholder.com/150" },
    { id: 13, name: "Sapori Sostenibili", latitude: 41.123, longitude: 16.875, rating: 4.8, address: "Via Carulli, 5", city: "Bari", categories: ["Eco", "Vegan"], image: "https://via.placeholder.com/150" },
    { id: 14, name: "BioSapori Bari", latitude: 41.126, longitude: 16.869, rating: 4.5, address: "Corso Vittorio Emanuele II, 25", city: "Bari", categories: ["Tradizionale", "Bio"], image: "https://via.placeholder.com/150" },
    { id: 15, name: "Cibo Vivo Store", latitude: 41.113, longitude: 16.867, rating: 4.9, address: "Via Crisanzio, 80", city: "Bari", categories: ["Gourmet", "Vegan"], image: "https://via.placeholder.com/150" },
    { id: 16, name: "Green Harmony", latitude: 41.127, longitude: 16.869, rating: 4.6, address: "Piazza Ferrarese, 12", city: "Bari", categories: ["Vegan", "Bio"], image: "https://via.placeholder.com/150" },
    { id: 17, name: "Naturalmente Bio", latitude: 41.126, longitude: 16.871, rating: 4.7, address: "Via Sparano, 20", city: "Bari", categories: ["Bio", "Km0"], image: "https://via.placeholder.com/150" },
    { id: 18, name: "Sapori di Natura", latitude: 41.124, longitude: 16.873, rating: 4.8, address: "Via Argiro, 8", city: "Bari", categories: ["Vegetariano", "Bio"], image: "https://via.placeholder.com/150" },
    { id: 19, name: "EcoVeg", latitude: 41.122, longitude: 16.872, rating: 4.5, address: "Corso Vittorio Emanuele, 5", city: "Bari", categories: ["Vegan", "Senza Glutine"], image: "https://via.placeholder.com/150" },
    { id: 20, name: "Bari Organic Store", latitude: 41.121, longitude: 16.874, rating: 4.6, address: "Piazza Mercantile, 3", city: "Bari", categories: ["Bio", "Km0"], image: "https://via.placeholder.com/150" },
    { id: 21, name: "Gusto Vegetale", latitude: 41.118, longitude: 16.876, rating: 4.7, address: "Via Melo, 50", city: "Bari", categories: ["Vegetariano", "Senza Lattosio"], image: "https://via.placeholder.com/150" },
    { id: 22, name: "Il Bio Angolo", latitude: 41.119, longitude: 16.873, rating: 4.9, address: "Via De Rossi, 22", city: "Bari", categories: ["Bio", "Naturale"], image: "https://via.placeholder.com/150" },
    { id: 23, name: "Naturale e Sano", latitude: 41.116, longitude: 16.874, rating: 4.6, address: "Via Quintino Sella, 10", city: "Bari", categories: ["Senza Lattosio", "Km0"], image: "https://via.placeholder.com/150" },
    { id: 24, name: "Sapori Bio", latitude: 41.117, longitude: 16.871, rating: 4.8, address: "Via Amendola, 15", city: "Bari", categories: ["Bio", "Senza Glutine"], image: "https://via.placeholder.com/150" },
    { id: 25, name: "Sole e Natura", latitude: 41.118, longitude: 16.868, rating: 4.5, address: "Corso Cavour, 18", city: "Bari", categories: ["Vegetariano", "Km0"], image: "https://via.placeholder.com/150" },
    { id: 26, name: "Km0 Bari", latitude: 41.115, longitude: 16.869, rating: 4.7, address: "Piazza Garibaldi, 8", city: "Bari", categories: ["Km0", "Senza Glutine"], image: "https://via.placeholder.com/150" },
    { id: 27, name: "Bio Delizie", latitude: 41.120, longitude: 16.875, rating: 4.6, address: "Via Putignani, 25", city: "Bari", categories: ["Bio", "Senza Lattosio"], image: "https://via.placeholder.com/150" },
    { id: 28, name: "Natura e Gusto", latitude: 41.123, longitude: 16.877, rating: 4.5, address: "Piazza San Nicola, 12", city: "Bari", categories: ["Vegan", "Km0"], image: "https://via.placeholder.com/150" },
    { id: 29, name: "Veggie Bari", latitude: 41.114, longitude: 16.870, rating: 4.9, address: "Via Manzoni, 35", city: "Bari", categories: ["Vegetariano", "Bio"], image: "https://via.placeholder.com/150" },
    { id: 30, name: "Bio in Tavola", latitude: 41.112, longitude: 16.865, rating: 4.6, address: "Via Carulli, 40", city: "Bari", categories: ["Bio", "Vegan"], image: "https://via.placeholder.com/150" },
    { id: 31, name: "Vita Verde", latitude: 41.124, longitude: 16.871, rating: 4.7, address: "Via Venezia, 15", city: "Bari", categories: ["Senza Glutine", "Km0"], image: "https://via.placeholder.com/150" },
    { id: 32, name: "Green Taste", latitude: 41.122, longitude: 16.870, rating: 4.6, address: "Piazza Umberto I, 5", city: "Bari", categories: ["Bio", "Vegetariano"], image: "https://via.placeholder.com/150" },
    { id: 33, name: "Eco Bio Store", latitude: 41.119, longitude: 16.869, rating: 4.8, address: "Corso Vittorio Emanuele, 22", city: "Bari", categories: ["Bio", "Naturale"], image: "https://via.placeholder.com/150" },
    { id: 34, name: "Vegan Friendly", latitude: 41.120, longitude: 16.873, rating: 4.9, address: "Via Argiro, 50", city: "Bari", categories: ["Vegan", "Bio"], image: "https://via.placeholder.com/150" },
    { id: 35, name: "Sapori Senza Confini", latitude: 41.118, longitude: 16.867, rating: 4.8, address: "Via Sparano, 18", city: "Bari", categories: ["Km0", "Vegan"], image: "https://via.placeholder.com/150" },
    { id: 37, name: "Bio Fasano Market", latitude: 40.835000, longitude: 17.368500, rating: 4.2, address: "Via Bari 10", city: "Fasano", categories: ["Bio", "Vegetariano"], image: "https://via.placeholder.com/150" },
    { id: 38, name: "Green Fasano Bistro", latitude: 40.837000, longitude: 17.370000, rating: 4.8, address: "Via Lecce 15", city: "Fasano", categories: ["Bio", "Senza Glutine"], image: "https://via.placeholder.com/150" },
    { id: 39, name: "Fasano Organic Place", latitude: 40.830000, longitude: 17.362000, rating: 4.6, address: "Via Napoli 20", city: "Fasano", categories: ["Bio", "Km0"], image: "https://via.placeholder.com/150" },
    { id: 40, name: "Vegan Food Paradise", latitude: 40.832500, longitude: 17.365500, rating: 4.9, address: "Via Venezia 8", city: "Fasano", categories: ["Vegan", "Bio"], image: "https://via.placeholder.com/150" },
    { id: 41, name: "Fasano Healthy Haven", latitude: 40.836000, longitude: 17.371500, rating: 4.7, address: "Piazza Garibaldi", city: "Fasano", categories: ["Vegetariano", "Senza Lattosio"], image: "https://via.placeholder.com/150" },
];

// Funzione per calcolare la distanza, in versione mock tra due coordinate geografiche usando la formula dell'haversine
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Conversione dei gradi in radianti
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // Raggio terrestre in km
    const dLat = toRad(lat2 - lat1); // Differenza di latitudine in radianti
    const dLon = toRad(lon2 - lon1); // Differenza di longitudine in radianti
    // Calcolo del quadrato della metà della corda sferica
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    // Calcolo dell'angolo centrale
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distanza in km
};



// Funzione per ottenere i prodotti (mock o database)
export const fetchStore = async (userCordinate, mapCordinate, maxDistanceLimit, requestParams) => {
    if (IS_MOCKKED) {

        const nearbyStores = allStores
            .map((store) => ({
                ...store, // Copia i dati del negozio
                distanceFromCenter: calculateDistance(
                    mapCordinate[0], // Latitudine del centro
                    mapCordinate[1], // Longitudine del centro
                    store.latitude, // Latitudine del negozio
                    store.longitude // Longitudine del negozio
                ), // Calcola la distanza tra il centro e il negozio
                distance: calculateDistance(
                    userCordinate[0], // Latitudine dell'utente
                    userCordinate[1], // Longitudine dell'utente
                    store.latitude, // Latitudine del negozio
                    store.longitude // Longitudine del negozio
                ), // Calcola la distanza tra l'utente e il negozio
            }))
            .filter((store) => store.distanceFromCenter <= maxDistanceLimit) // Ritorna solo i negozi entro la distanza massima dal centro
            .sort((a, b) => a.distanceFromCenter - b.distanceFromCenter); // Ordina per distanza dal centro

        // Simula un ritardo per i dati mock
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(nearbyStores);
            }, 100); // Ritardo simulato di 100ms
        });
    } else {
        const token = getToken();
        try {
            const response = await axios.post(
                `${BASE_URL}/api/store/filtered`,
                {
                    userLatitude: userCordinate[0],
                    userLongitude: userCordinate[1],
                    maxDistance: (requestParams.maxDistance > maxDistanceLimit) ? maxDistanceLimit : requestParams.maxDistance,
                    mapLatitude: mapCordinate[0],
                    mapLongitude: mapCordinate[1],
                    categories: requestParams.categories,
                    sortOrder: requestParams.sortOrder,
                    searchName: requestParams.searchName,

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