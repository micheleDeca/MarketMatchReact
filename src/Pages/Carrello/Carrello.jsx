import PrenotazioneCarrello from "../../Components/PrenotazioneCarrello/PrenotazioneCarrello";
import './Carrello.css'

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
            quantity: 3,
            productName: 'Prodotto 2',
            detail: 'Descrizione Prodotto, Descrizione Prodotto, Descrizione Prodotto',
            currentPrice: "5.99€",
            originalPrice: "4.26€",
            badges: ['Bio', 'Senza lattosio'],
        },
        {
            image: 'https://via.placeholder.com/100',
            quantity: 1,
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


    return (
        <>
            <div className="cartTitle">
                <h1>Carrello</h1>
            </div>
            <div className="container-prenotationsBox">
                <div className="prenotationsBox">
                    <PrenotazioneCarrello numNeg="1" products={products} luogoDataInfo={luogoDataInfo} />
                    <PrenotazioneCarrello numNeg="3" products={products} luogoDataInfo={luogoDataInfo} />
                    <PrenotazioneCarrello numNeg="7" products={products} luogoDataInfo={luogoDataInfo} />
                </div>
            </div>
        </>
    )
}

export default Carrello