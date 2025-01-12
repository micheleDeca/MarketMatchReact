import React, { useState, useEffect } from 'react';
import CardLong from '../CardLong/CardLong';
import './CardLongList.css';
import { Pagination } from 'react-pagination-bar';
//import 'react-pagination-bar/dist/index.css';
import '../../ExternalContent/PaginationBar.css';

const CardLongList = (props) => {
  const cardShop = props.type === "shop";
  const cardRecipe = props.type === "recipe";
  const cardProduct = props.type === "product";

  const itemsPerPage = cardRecipe ? 25 : 6; // Numero di elementi per pagina

  const [currentPage, setCurrentPage] = useState(1); // Pagina corrente
  const [paginatedItems, setPaginatedItems] = useState([]); // Elementi della pagina corrente

  // Effetto per aggiornare gli elementi mostrati quando la pagina cambia
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const items = cardShop ? props.shops : props.products;
    setPaginatedItems(items.slice(startIndex, endIndex));
  }, [currentPage, props.shops, props.products, cardShop]);

  useEffect(() => {
    setCurrentPage(1);
  }, [props.shops, props.products]);



  return (
    <>
      <div className="product-long-list-container">
        <h2 className="product-long-list-title">{props.title}</h2>
        {cardProduct && <span className="product-list-long">
          {paginatedItems.map((product, index) => (
            <CardLong
              key={product.id}
              id={product.id}
              image={"http://4.232.65.20/assets/" + product.image}
              quantity={product.quantity}
              productName={product.productName}
              detail={product.detail}
              currentPrice={(product.currentPrice) ? parseFloat(product.currentPrice).toFixed(2) + "€" : ""}
              originalPrice={(product.originalPrice) ? parseFloat(product.originalPrice).toFixed(2) + "€" : ""}
              badges={product.badges}
              getCounter={props.getCounter}
              type={props.type}
              onChangeQuantity={props.onChangeQuantity}
              updatePage={props.setUpdatePage}

            />
          ))}
        </span>}
        {cardShop && (<span className="product-list-long">
          {paginatedItems.map((shop, index) => (
            <CardLong
              key={shop.id}
              id={shop.id}
              image={"http://4.232.65.20/assets/" + shop.image}
              productName={shop.name}
              detail={"Distante: " + shop.distance.toFixed(2) + " Km"}
              detail2={shop.city + ", " + shop.address}
              badges={shop.categories}
              type={props.type}
            />

          ))}
        </span>)}
        {cardRecipe && (<span className="product-list-long">
          {paginatedItems.map((recipe, index) => (
            <CardLong
              key={index}
              image={"http://4.232.65.20/assets/" + recipe.Foto}
              productName={recipe.Titolo}
              detail={recipe.Descrizione}
              type={props.type}
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
