import React, { useState, useEffect } from 'react';
import ProductContainer from '../../Components/CardContainer/CardContainer';
import './Product.css';
import '../../ExternalContent/PaginationBar.css';
import { Pagination } from 'react-pagination-bar';
import SearchBar from '../../Components/SearchBar/SearchBar';
import ButtonFilter from '../../Components/ButtonFilter/ButtonFilter';
import Button from '../../Components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../Context/UserContext';
import { fetchProductUpdater } from './Updater/ProductUpdater';
import LoadingPage from '../LoadingPage/LoadingPage';
import { getNumberProductUnfiltered } from './Updater/NumProductUpdater';

const Product = () => {

    const { userType } = useUserContext();

    const navigate = useNavigate();

    const goToProduct = () => {
        navigate('/prodotto');
    };

    const [products, setProducts] = useState([]); // Stato per i prodotti
    const [currentPage, setCurrentPage] = useState(() => {
        // Recupera la pagina corrente da sessionStorage, di default 1
        const savedPage = sessionStorage.getItem('currentPage');
        return savedPage ? parseInt(savedPage, 10) : 1;
    });
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true); // Stato per il caricamento
    const [error, setError] = useState(null); // Stato per gli errori

    const productsPerPage = 15; // Numero di prodotti per pagina



    // Effetto per richiedere quantità prodotti per pagination
    useEffect(() => {
        let isMounted = true; // Flag per evitare aggiornamenti su componenti smontati

        const getNumProducts = async () => {
            try {
                const productsData = await getNumberProductUnfiltered(); // Usa la funzione dal modulo
                if (isMounted) {
                    setTotalItems(productsData); // Aggiorna lo stato
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message); // Gestisci l'errore
                }
            }
        };

        getNumProducts();
 
        // Cleanup: evita aggiornamenti su componenti smontati
        return () => {
            isMounted = false;
        };


 
    }, []); //inserire prossimamente, aggiornamento in base ai filtri scelti

    // Effetto per caricare i prodotti quando cambia la pagina
    useEffect(() => {
        let isMounted = true; // Flag per evitare aggiornamenti su componenti smontati

        const getProducts = async () => {
            try {
                const productsData = await fetchProductUpdater(currentPage, productsPerPage); // Usa la funzione dal modulo
                if (isMounted) {
                    setProducts(productsData); // Aggiorna lo stato
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

        // Salva la pagina corrente nel sessionStorage
        sessionStorage.setItem('currentPage', currentPage);
        
        // Cleanup: evita aggiornamenti su componenti smontati
        return () => {
            isMounted = false;
        };


        //fetchProducts(currentPage);

    }, [currentPage]);

    let orderNames = [];
    let filterNames = [];

    if (userType === "NegA") {
        orderNames = ["Prezzo crescente", "Prezzo decrescente", "Quantità", "Nome", "Rilevanza"];
        filterNames = ["Bio", "Senza Lattosio", "Senza Glutine", "Vegetariano", "Vegan", "Km0", "In promozione"];
    } else if (userType === "ConA") {
        orderNames = ["Prezzo crescente", "Prezzo decrescente", "Quantità", "Nome", "Rilevanza"];
        filterNames = ["Bio", "Senza Lattosio", "Senza Glutine", "Vegetariano", "Vegan", "Km0", "In promozione", "Più vicini a Te"];
    }

    if (loading) return <div><LoadingPage /></div>;
    if (error) return <div>Errore: {error}</div>;

    return (
        <div className="products-page">
            <div className="product-header">
                {userType === "NegA" && (
                    <div className="newProduct">
                        <Button name="Inserisci prodotto" function={goToProduct} />
                    </div>)}
                <div className="searchBar">
                    <SearchBar />
                </div>
                <div className="filterButton">
                    <ButtonFilter order={orderNames} filter={filterNames} type={userType === "NegA" ? "Neg, Prod" : "ConA, Prod"}
                    />
                </div>
            </div>
            <div className="content-container">
                <div className="container-product">
                    <ProductContainer card={products} button={"Prenota"} type={"product"} />
                </div>
                <div className="pagination-container">
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalItems}
                        itemsPerPage={productsPerPage}
                        onPageChange={(page) => setCurrentPage(page)}
                        pageNeighbours={1}
                    />
                </div>
            </div>
        </div>
    );
};

export default Product;
/*

const fetchProducts = async (page) => {
  try {
    const response = await fetch(
      `/api/products?page=${page}&limit=${productsPerPage}`
    );
    const data = await response.json();
    setProducts(data.products);
    setTotalPages(data.totalPages);
  } catch (error) {
    console.error('Errore nel caricamento dei prodotti:', error);
  }
};


*/