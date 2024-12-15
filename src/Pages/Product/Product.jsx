import React, { useState, useEffect } from 'react';
import ProductContainer from '../../Components/ProductContainer/ProductContainer';
import './Product.css';
import '../../ExternalContent/PaginationBar.css'
import { Pagination } from 'react-pagination-bar';

// Simula un database di prodotti
const mockProducts = Array.from({ length: 200 }, (_, index) => {
    const hasDiscount = Math.random() > 0.4; // 50% di probabilità di avere uno sconto
    return {
        id: index + 1,
        name: `Prodotto ${index + 1}`,
        detail: `Dettaglio del prodotto ${index + 1}`,
        currentPrice: ((Math.random() * 100).toFixed(2) + "€"),
        originalPrice: hasDiscount ? ((Math.random() * 100 + 100).toFixed(2) + "€") : null, // Solo se ha sconto
        image: `https://via.placeholder.com/150?text=Prodotto+${index + 1}`,
    };
});

const Product = () => {
    const [products, setProducts] = useState([]); // Stato per i prodotti
    const [currentPage, setCurrentPage] = useState(1); // Stato per la pagina attuale
    const productsPerPage = 16; // Numero di prodotti per pagina

    // Funzione per simulare il recupero dei prodotti
    const fetchProducts = (page) => {
        // Recupera i prodotti per la pagina attuale
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const pageProducts = mockProducts.slice(startIndex, endIndex);

        setProducts(pageProducts);
    };

    // Effetto per caricare i prodotti quando cambia la pagina
    useEffect(() => {
        fetchProducts(currentPage); // Simulazione, qui sarà sostituito da una chiamata al DB
    }, [currentPage]);

    return (
        <div className="products-page">
            <div className="product-header">
                <h1>Prenotazioni</h1>
            </div>
            <div className="content-container">
                <div className="container-product">
                    <ProductContainer products={products} />
                </div>
                <div className="pagination-container">

                    <Pagination
                        currentPage={currentPage}
                        totalItems={mockProducts.length}
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