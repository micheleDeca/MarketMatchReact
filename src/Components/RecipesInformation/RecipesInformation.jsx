import "./RecipesInformation.css";
import CategoryLabel from "../CategoryLabel/CategoryLabel";

function RecipesInformation(props) {
  return (
    <>
      <div className="RecipesInformationBox">
        <CategoryLabel
          color="darkslateblue"
          category={`Difficoltà: ${props.difficolta}`}
        />
        <CategoryLabel
          color="darkslateblue"
          category={`Tempo preparazione: ${props.preparazione}`}
        />
        <CategoryLabel
          color="darkslateblue"
          category={`Tempo Cottura: ${props.cottura}`}
        />
        <CategoryLabel
          color="darkslateblue"
          category={`Costo: ${props.costo}`}
        />
      </div>
    </>
  );
}

export default RecipesInformation;
