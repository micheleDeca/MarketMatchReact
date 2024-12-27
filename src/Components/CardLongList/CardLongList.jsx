import React, { useState, useEffect } from 'react';
import CardLong from '../CardLong/CardLong';
import './CardLongList.css';
import { Pagination } from 'react-pagination-bar';
import 'react-pagination-bar/dist/index.css';
import '../../ExternalContent/PaginationBar.css';
import '../../ExternalContent/PaginationBar.css';

const CardLongList = (props) => {
  const cardShop = props.type === "shop";
  const itemsPerPage = 6; // Numero di elementi per pagina

  const [currentPage, setCurrentPage] = useState(1); // Pagina corrente
  const [paginatedItems, setPaginatedItems] = useState([]); // Elementi della pagina corrente

  // Effetto per aggiornare gli elementi mostrati quando la pagina cambia
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const items = cardShop ? props.shops : props.products;
    setPaginatedItems(items.slice(startIndex, endIndex));
  }, [currentPage, props.shops, props.products, cardShop]);

  return (
    <>
    <div className="product-long-list-container">
      <h2 className="product-long-list-title">{props.title}</h2>
      {!cardShop && <span className="product-list-long">
        {paginatedItems.map((product, index) => (
          <CardLong
            key={index}
            image={product.image}
            quantity={product.quantity}
            productName={product.productName}
            detail={product.detail}
            currentPrice={product.currentPrice}
            originalPrice={product.originalPrice}
            badges={product.badges}
            getCounter={props.getCounter}
          />
        ))}
      </span>}
      {cardShop && (<span className="product-list-long">
        {paginatedItems.map((shop, index) => (
          <CardLong
            key={index}
            image={shop.image}
            productName={shop.name}
            detail={"Distante: " + shop.distance.toFixed(2) + " Km"}
            detail2={shop.city + ", " + shop.address}
            badges={shop.categories}
          />
          
        ))}
      </span>)}
    </div>
    <div className="pagination-container">
    <Pagination
      currentPage={currentPage}
      totalItems={cardShop ? props.shops.length : props.products.length}
      itemsPerPage={itemsPerPage}
      onPageChange={(page) => setCurrentPage(page)}
      pageNeighbours={1}
    />
  </div></>
  );
};

export default CardLongList;
