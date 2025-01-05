import axios from 'axios';
import { BASE_URL, IS_MOCKKED } from '../../../config';
import { getToken } from '../../../LocalStorage/TokenStorage';


const mockReservation = Array.from({ length: 50 }, (_, index) => {
  const reservationStatuses = ["prenotato", "accettato", "rifiutato", "da_ritirare", "ritirato", "annullato"];
  const randomStatus = reservationStatuses[Math.floor(Math.random() * reservationStatuses.length)];
  const randomDate = (offset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toLocaleDateString("it-IT");
  };
  return {
    id: `#${100000 + index}`, // ID univoco
    status: randomStatus, // Stato casuale
    reservationDate: randomDate(-index), // Data prenotazione (retroattiva rispetto all'indice)
    infoDate: randomDate(-(index - 1)), // Data info successiva
    shopId: `${Math.floor(Math.random() * 10) + 1}`, // ID negozio casuale
    customerId: `${Math.floor(Math.random() * 10) + 1}`, // ID negozio casuale
  };
});



// Funzione per ottenere i prodotti (mock o database)
export const fetchReservationFilteredUpdater = async (currentPage, productsPerPage, props, uuidParamStore, uuidParamConsumer) => {
  const requestParam = props;


  if (IS_MOCKKED) {
    // Simula un ritardo per i dati mock
    return new Promise((resolve) => {
      setTimeout(() => {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const pagePrenotations = mockReservation.slice(startIndex, endIndex);
        resolve(pagePrenotations);
      }, 100); // Ritardo simulato di 100ms
    });
  } else {
    const token = getToken();
    const queryType = uuidParamConsumer ? "consumer" : (uuidParamStore ? "store" : null);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/reservation/` + queryType,
        {
          uuidConsumer: uuidParamConsumer,
          uuidStore: uuidParamStore,
          state: requestParam.state,
          searchReservation: requestParam.searchReservation,
          currentPage: currentPage,
          recipesPerPage: productsPerPage,

        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token di autenticazione
          },
        }
      );


      const filteredData = response.data.filter((item) => item.id);

      return filteredData;
    } catch (error) {
      console.error('Errore durante il recupero delle prenotazioni:', error);
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