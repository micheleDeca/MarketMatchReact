import axios from 'axios';
import { BASE_URL } from '../../../config';
import { getToken } from '../../../LocalStorage/TokenStorage';


// Funzione per ottenere i prodotti (mock o database)
export const insertDatabaseKeyUpdater = async (userType, databaseKey, goToHome) => {

    const token = getToken();
    const requestUrl = userType === "ConA"? "consumerUser/databaseKey" : (userType === "NegA"? "storeUser/databaseKey" : "");
    try {
        const response = await axios.patch(
            `${BASE_URL}/api/` + requestUrl,
            {
                "databaseKey": databaseKey

            },

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

        );


        const data = response.data;

        goToHome();
        return data;

    } catch (error) {
        console.error('Errore operazione:', error);
        throw error;
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