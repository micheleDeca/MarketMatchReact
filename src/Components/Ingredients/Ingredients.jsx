import "./Ingredients.css";
import ButtonSucessivo from "../ButtonSucessivo/ButtonSucessivo";

function Ingredients(props) {

    const gruppi = [];
    for (let i = 0; i < props.ingredienti.length; i += 4) {
        gruppi.push(props.ingredienti.slice(i, i + 4));
    }

    return (
        <>
            <div className="IngredientsBox">
                <p className="IngredientsTitle">Ingredienti:</p>
                <div className="IngredientsList">
                    {gruppi.map((gruppo, index) => (
                        <ul key={index}>
                            {gruppo.map((ingrediente, idx) => (
                                <li key={idx} className="IngredientItem">
                                    <span className="IngredientName">{ingrediente.Nome}</span> -
                                    <span className="IngredientQuantity">{ingrediente.Quantita}</span>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
                <div className="Successivo"><ButtonSucessivo name={props.name}/></div>
            </div>
        </>
    );
}

export default Ingredients;
