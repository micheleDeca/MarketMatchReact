import React from "react";
import "./CategoryLabel.css";
import { useCategoryContext } from "../../Context/CategoryContex";

const Badge = (props) => {
  const { category: categoryList } = useCategoryContext();

  // Funzione per ottenere il colore di una categoria
  const getColorForCategory = (categoryName) => {
    if (!categoryList || categoryList.length === 0) {
      console.warn("CategoryList non è disponibile o è vuoto");
      return "darkslateblue"; // Colore di default
    }

    const normalizedCategory = categoryName.toLowerCase();
    // Cerca la categoria nell'array
    const categoryItem = categoryList.find(
      (cat) => cat.categoryName.toLowerCase() === normalizedCategory
    );

    return categoryItem ? categoryItem.categoryColor : "darkslateblue"; // Default se non trovato
  };

  return (
    <div
      className="badge"
      style={{
        backgroundColor: getColorForCategory(props.category),
        "--badge-font-size": props.size === "small" ? "12px" : "",
      }}
    >
      {props.category || "Categoria sconosciuta"}
    </div>
  );
};

export default Badge;
