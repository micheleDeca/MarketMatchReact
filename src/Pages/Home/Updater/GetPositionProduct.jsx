import axios from 'axios';
import { BASE_URL, IS_MOCKKED } from '../../../config';
import { getToken } from '../../../LocalStorage/TokenStorage';
import { useUserContext } from '../../../Context/UserContext';

const products = [
  { id: 1, name: "Prodotto 1", originalPrice: "10.00€", currentPrice: "80.00€", image: "/test/4.jpeg", detail: "Un prodotto di alta qualità per ogni esigenza." },
  { id: 2, name: "Prodotto 2", currentPrice: "20.00€", image: "/test/9.jpg", detail: "Un prodotto versatile e ideale per tutta la famiglia." },
  { id: 3, name: "Prodotto 3", originalPrice: "20.00€", currentPrice: "25.00€", image: "/test/2.webp", detail: "Perfetto per soddisfare ogni tuo desiderio di qualità." },
  { id: 4, name: "Prodotto 4", originalPrice: "1.00€", currentPrice: "10.00€", image: "/test/6.png", detail: "Un'ottima scelta per il tuo benessere quotidiano." },
  { id: 5, name: "Prodotto 5", currentPrice: "20.00€", image: "http://4.232.65.20/assets/test/7.webp", detail: "Prodotto naturale e sostenibile per ogni occasione." },
  { id: 6, name: "Prodotto 6", currentPrice: "30.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641783795_000100023617_1.jpg", detail: "Qualità e gusto in un unico prodotto." },
  { id: 7, name: "Prodotto 7", currentPrice: "10.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1705579086_000100022608_1.jpg", detail: "Ideale per prendersi cura di sé ogni giorno." },
  { id: 8, name: "Prodotto 8", currentPrice: "20.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1711003172_000100023121_1.jpg", detail: "Prodotto ricco di benefici naturali." },
  { id: 9, name: "Prodotto 9", currentPrice: "30.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641640213_000100023796_1.jpg", detail: "Un'ottima scelta per una vita sana e attiva." },
  { id: 10, name: "Prodotto 10", currentPrice: "10.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1705579086_000100022608_1.jpg", detail: "Un prodotto pensato per offrirti il massimo comfort." },
];
// Funzione per ottenere i prodotti (mock o database)
export const getPositionProduct = async (props) => {
  const requestParam = props;


  if (IS_MOCKKED) {
    // Simula un ritardo per i dati mock
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = products;
        resolve(data);
      }, 100); // Ritardo simulato di 100ms
    });
  } else {
    const token = getToken();

    try {
      const response = await axios.get(
        `${BASE_URL}/api/product/getProductListPosition`,
         
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token di autenticazione
            productLimit: 10,
            userLatitude: requestParam.userLatitude,
            userLongitude: requestParam.userLongitude,
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