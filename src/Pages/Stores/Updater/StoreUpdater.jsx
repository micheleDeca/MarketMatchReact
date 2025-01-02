import axios from 'axios';
import { BASE_URL, IS_MOCKKED } from '../../../config';
import { getToken } from '../../../LocalStorage/TokenStorage';


 

// Funzione per ottenere i prodotti (mock o database)
export const fetchStore = async (userCordinate, mapCordinate,maxDistanceLimit) => {
    if (IS_MOCKKED) {
        // Simula un ritardo per i dati mock
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = null;
                resolve(data);
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
                    maxDistance: maxDistanceLimit,
                    mapLatitude: mapCordinate[0],
                    mapLongitude: mapCordinate[1],

                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Token di autenticazione
                    },
                }
            );

            const filteredData = response.data.filter((item) => item.name);
            console.log(filteredData);
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