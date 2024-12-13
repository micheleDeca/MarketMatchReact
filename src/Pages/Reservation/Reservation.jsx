import React from 'react'
import './Reservation.css' 
import SliderContainer from '../../Components/SliderContainer/SliderContainer';
import ProductLongList from '../../Components/ProductLongList/ProductLongList';

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
            <SliderContainer />
            <ProductLongList products={products} />
        </div>
    )
}

export default Reservation
