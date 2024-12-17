import "./Ingredients.css";
import ButtonSucessivo from "../ButtonSucessivo/ButtonSucessivo";

function Ingredients(props) {
  return (
    <>
      <div className="IngredientsBox">
        <p className="IngredientsTitle">Ingredienti:</p>
        <p className="IngredientsText">{props.ingredienti}</p>
        <div className="Successivo"><ButtonSucessivo /></div>
      </div>
    </>
  );
}

export default Ingredients;
