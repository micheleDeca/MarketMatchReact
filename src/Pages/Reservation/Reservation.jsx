import React from 'react'
import './Reservation.css'
import SliderContainer from '../../Components/SliderContainer/SliderContainer';
import ProductLongList from '../../Components/ProductLongList/ProductLongList';
import DettaglioPrenotazione from '../../Components/DettaglioPrenotazione/DettaglioPrenotazione';
import DataRitiro from '../../Components/DataRitiro/DataRitiro';

const Reservation = () => {


    const products = [
        {
            image: 'https://via.placeholder.com/100',
            quantity: 1,
            productName: 'Prodotto 1',
            detail: 'Descrizione Prodotto, Descrizione Prodotto, Descrizione Prodotto',
            price: "5.99€",
            badges: [{ text: 'Bio', backgroundColor: '#4caf50' }],
        },
        {
            image: 'https://via.placeholder.com/100',
            quantity: 3,
            productName: 'Prodotto 2',
            detail: 'Descrizione Prodotto, Descrizione Prodotto, Descrizione Prodotto',
            price: "5.99€",
            priceDiscount: "4.26€",
            badges: [
                { text: 'Bio', backgroundColor: '#4caf50' },
                { text: 'Senza lattosio', backgroundColor: '#2196f3' },
                { text: 'Senza lattosio', backgroundColor: '#2196f3' },
            ],
        },
        {
            image: 'https://via.placeholder.com/100',
            quantity: 1,
            productName: 'Prodotto 3',
            detail: 'Descrizione Pro asdasdasdas das das dasdsa dasdotto, Descrsaaaaaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaas izione Prodotto, Descrizione Prodotto',
            price: "5.99€",
            badges: [{ text: 'Bio', backgroundColor: '#4caf50' }],
        },
    ];

    return (
        <div>
            <div className="reservation-header">
                <h1>Prenotazioni</h1>
            </div>
            <div className='dettaglioPrenotazione-container'>
                <DettaglioPrenotazione
                    codice="12345"
                    client="Mario Rossi"
                    date="15/12/2024" />
            </div>
            <div className="svg-divider">
                <svg width="100%" height="2" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="1" x2="100%" y2="1" stroke="#CAC4D0" />
                </svg>
            </div>
            <SliderContainer />
            <div className="dataLabel-reservation">
                <DataRitiro />
            </div>
            <div className="svg-divider">
                <svg width="100%" height="2" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="1" x2="100%" y2="1" stroke="#CAC4D0" />
                </svg>
            </div>
            <ProductLongList
                title="Riepilogo Prenotazione"
                products={products} />
        </div>
    )
}

export default Reservation
