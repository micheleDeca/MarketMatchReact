import PrenotazioneCarrello from "../../Components/PrenotazioneCarrello/PrenotazioneCarrello";
import { BASE_URL } from "../../config";
import { getToken } from "../../LocalStorage/TokenStorage";
import './Carrello.css'
import axios from 'axios';
import { useUserContext } from "../../Context/UserContext";
import { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";

const Carrello = () => {

    const [products, setProducts] = useState([]); // Stato per i prodotti nel carrello
    const [stores, setStores] = useState([]); // Stato per i prodotti nel carrello
    const [loading, setLoading] = useState(true); // Stato per il caricamento
    const [error, setError] = useState(null); // Stato per gli errori
    const [quantity, setQuantity] = useState(null); // Stato per le quantità

    /*const products = [
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

    ];*/

    /*const luogoDataInfo = {
        provincia: 'BT',
        citta: 'Barletta',
        cap: '76121',
        indirizzo: 'Via della Repubblica',
        civico: '12',
        contatti: '3279876573',
        data: '12/11/23',
        descrizione: '3 giorni dalla preparazione dell\'ordine',
        orari: '9:00-16:00 dal lunedì al venerdì'
    };*/

    const { databaseKey } = useUserContext();

    const updateQuantity = (newQuantity) => {
        setQuantity(newQuantity);  
      };

    const fetchProductInCart = async () => {
        const token = getToken();

        console.log(databaseKey);
        if (!token || !databaseKey) {
            throw new Error("Token o databaseKey mancanti");
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/api/cart/products`,
                { idUser: databaseKey }, // Corpo della richiesta
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Token di autenticazione
                    },
                }
            );

            const fetchedProducts = response.data;

            // Estrai stores
            const stores = fetchedProducts.flatMap((element) =>
                element.stores.map((store) => store.store)
            );

            // Estrai products
            const products = fetchedProducts.flatMap((element) =>
                element.stores.map((store) => ({
                    id: store.store.uuid,
                    products: store.products,
                }))
            );

            // Ritorna un oggetto con stores e products
            return { stores, products };
        } catch (error) {
            console.error("Errore durante il recupero dei prodotti:", error);
            throw error; // Propaga l'errore
        }
    };


    // Effetto per caricare i prodotti nel carrello
    useEffect(() => {
        let isMounted = true; // Flag per evitare aggiornamenti su componenti smontati

        const getProducts = async () => {
            try {
                const { stores, products } = await fetchProductInCart(); // Usa la funzione per il fetch dei prodotti
                console.log("stores", stores);
                console.log("products",products);
                if (isMounted) {
                    setProducts(products); // Aggiorna lo stato
                    setStores(stores); // Aggiorna lo stato
                    setLoading(false); // Ferma il caricamento
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message); // Gestisci l'errore
                    setLoading(false);
                }
            }
        };

        getProducts();

        // Cleanup: evita aggiornamenti su componenti smontati
        return () => {
            isMounted = false;
        };


    }, [quantity]);

    if (loading) return <div><LoadingPage /></div>;
    if (error) return <div>Errore: {error}</div>;

    return (
        <>
            <div className="cartTitle">
                <h1>Carrello</h1>
            </div>
            <div className="container-prenotationsBox">
                <div className="prenotationsBox">
                    {stores.map((store) => (
                        <PrenotazioneCarrello
                            key={store.uuid} 
                            nameNeg={store.name}
                            products={products.filter((product) => product.id === store.uuid).flatMap((product) => product.products)}
                            luogoDataInfo={store}
                            onChangeQuantity={updateQuantity}
                        />
                    ))}
                </div>

            </div>
        </>
    )
}

export default Carrello