import React, { useState, useEffect, useRef } from 'react';
import ProductContainer from '../../Components/CardContainer/CardContainer';
import './Product.css';
import { Pagination } from 'react-pagination-bar';
import '../../ExternalContent/PaginationBar.css';

import SearchBar from '../../Components/SearchBar/SearchBar';
import ButtonFilter from '../../Components/ButtonFilter/ButtonFilter';
import Button from '../../Components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../Context/UserContext';
import { fetchProductUpdater } from './Updater/ProductUpdater';
import LoadingPage from '../LoadingPage/LoadingPage';
import { getNumberProductUnfiltered } from './Updater/NumProductUpdater';
import { fetchProductFilteredUpdater } from './Updater/ProductUpdaterFiltered';
import { getNumberProductFiltered } from './Updater/NumProductUpdaterFiltered';
import { useCategoryContext } from '../../Context/CategoryContex';

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

    //IMPOSTARE come default sempre RILEVANZA
    //MOLTO IMPORTANTE @Isabella, quando si cambiano i filtri, impostare paginaCorrente = 1
    const [requestParams, setRequestParams] = useState({
        minPrezzo: null,
        maxPrezzo: null,
        filterPrezzoOfferta: null,
        categories: null,           //Es. ["Vegano", "Bio"]
        sortOrder: null, 
        userLatitude: 41.1090642,   //Posizione utente, impostare una standard globale se utente non concede posizione/permessi
        userLongitude: 16.8719847,
        maxDistance: 500,     //distanza tra utente e prodotto in Km 
        searchName: null   //Filtro ricerca
    });

    const handleSearchStateChange = (key, value) => {
        setRequestParams((prevState) => ({
            ...prevState,
            [key]: value, // Aggiorna dinamicamente ogni parametro dei filtri con il valore fornito
        }));
    };

    const handleFilterStateChange = (() => {

    const intialParams = {
            minPrezzo: null,
            maxPrezzo: null,
            filterPrezzoOfferta: null,
            categories: null,
            sortOrder: [null, null],
            userLatitude: 41.1090642,
            userLongitude: 16.8719847,
            maxDistance: 500,
            searchName: null
        }  // valori di default dei filtri

        let tempParams = intialParams; // Variabile temporanea per memorizzare le coppie chiave-valore fino al send


        return (key, value) => {
            if (key === "send" && value === true) {
                // Quando si verifica la coppia `send: true`, aggiorna lo stato
                setRequestParams((prevState) => ({
                    ...tempParams // Applica tutte le coppie memorizzate
                }));

                tempParams = intialParams; // Resetta i parametri temporanei

            } else {
                // Memorizza la coppia chiave-valore senza aggiornare lo stato
                tempParams[key] = value;
            }
        };
    })();

    console.log(requestParams);

    // Effetto per richiedere quantità prodotti per pagination
    useEffect(() => {
        let isMounted = true; // Flag per evitare aggiornamenti su componenti smontati

        const getNumProducts = async () => {
            try {
                const productsData = await getNumberProductFiltered(requestParams); // Usa la funzione dal modulo
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



    }, [requestParams]); //inserire prossimamente, aggiornamento in base ai filtri scelti

    // Effetto per caricare i prodotti quando cambia la pagina
    useEffect(() => {
        let isMounted = true; // Flag per evitare aggiornamenti su componenti smontati

        const getProducts = async () => {
            try {
                const productsData = await fetchProductFilteredUpdater(currentPage, productsPerPage, requestParams); // Usa la funzione dal modulo
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

    }, [currentPage, requestParams]);

    let orderNames = [];
    let filterNames = [];

    const { category: categoryList } = useCategoryContext();

    if (userType === "NegA") {
        orderNames = ["Prezzo crescente", "Prezzo decrescente", "Quantità", "Nome", "Rilevanza"];
        filterNames = [...categoryList.map((cat) => cat.categoryName), "In promozione"];
    } else if (userType === "ConA") {
        orderNames = ["Prezzo crescente", "Prezzo decrescente", "Quantità", "Nome", "Rilevanza"];
        filterNames = [...categoryList.map((cat) => cat.categoryName), "In promozione", "Più vicini a Te"];
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
                    <SearchBar type="ricerca" onStateChange={handleSearchStateChange} />
                </div>
                <div className="filterButton">
                    <ButtonFilter onStateChange={handleFilterStateChange} order={orderNames} filter={filterNames} type={userType === "NegA" ? "Neg, Prod" : "ConA, Prod"}
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
                        onPageChange={(page) => {
                            setCurrentPage(page);
                            window.scrollTo({ top: 0, behavior: 'smooth' }); // Porta la pagina in alto
                        }}
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