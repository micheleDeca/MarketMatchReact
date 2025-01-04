import PrenotazioneCarrello from "../../Components/PrenotazioneCarrello/PrenotazioneCarrello";
import { BASE_URL } from "../../config";
import { getToken } from "../../LocalStorage/TokenStorage";
import './Carrello.css'
import axios from 'axios';
import { useUserContext } from "../../Context/UserContext";

const Carrello = () => {

    const products = [
        {
            image: 'https://via.placeholder.com/100',
            quantity: 1,
            productName: 'Prodotto 1',
            detail: 'Descrizione Prodotto, Descrizione Prodotto, Descrizione Prodotto',
            currentPrice: "5.99€",
            badges: ['Bio'],
        },
        {
            image: 'https://via.placeholder.com/100',

            productName: 'Prodotto 2',
            detail: 'Descrizione Prodotto, Descrizione Prodotto, Descrizione Prodotto',
            currentPrice: "5.99€",
            originalPrice: "4.26€",
            badges: ['Bio', 'Senza lattosio'],
        },
        {
            image: 'https://via.placeholder.com/100',
            quantity: 8,
            productName: 'Prodotto 3',
            detail: 'Descrizione Pro asdasdasdas das das dasdsa dasdotto, Descrsaaaaaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaas izione Prodotto, Descrizione Prodotto',
            currentPrice: "5.99€",
            badges: ['Senza Glutine'],
        },

    ];

    const luogoDataInfo = {
        provincia: 'BT',
        citta: 'Barletta',
        cap: '76121',
        indirizzo: 'Via della Repubblica',
        civico: '12',
        contatti: '3279876573',
        data: '12/11/23',
        descrizione: '3 giorni dalla preparazione dell\'ordine',
        orari: '9:00-16:00 dal lunedì al venerdì'
    };

    const { databaseKey } = useUserContext();

    // Funzione per ottenere i prodotti 
    const fetchProductInCart = async () => {
        const token = getToken();

        console.log(databaseKey);
    if (!token || !databaseKey) {
        console.error("Token o databaseKey mancanti");
        return;
    }

        try {
            const response = await axios.get(`${BASE_URL}/api/cart/products`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    idUser: databaseKey,
                },
            });

            const products = response.data;
            return products;
        } catch (error) {
            console.error('Errore durante il recupero dei prodotti:', error);
            throw error;
        }
    };

    return (
        <>
            <div className="cartTitle">
                <h1>Carrello</h1>
            </div>
            <div>
            {fetchProductInCart()};
            </div>
        </>
    )
}

export default Carrello