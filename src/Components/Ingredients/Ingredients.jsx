import "./Ingredients.css";
import ButtonSucessivo from "../ButtonSucessivo/ButtonSucessivo";

/**
 * Componente React che visualizza una lista di ingredienti suddivisa in gruppi di quattro
 * e include un pulsante per procedere all'azione successiva.
 *
 * @component
 * @example
 * // Esempio di utilizzo con una lista di ingredienti
 * const ingredienti = [
 *   { Nome: 'Farina', Quantita: '100g' },
 *   { Nome: 'Zucchero', Quantita: '50g' },
 *   { Nome: 'Latte', Quantita: '200ml' },
 *   { Nome: 'Uova', Quantita: '2' }
 * ];
 * <Ingredients ingredienti={ingredienti} name="Continua" />
 *
 * @param {Object} props - Le proprietà passate al componente.
 * @param {Array} props.ingredienti - Un array di oggetti che rappresentano gli ingredienti. Ogni oggetto deve avere `Nome` e `Quantita`.
 * @param {string} props.name - Il testo visualizzato sul pulsante successivo.
 *
 * @returns {JSX.Element} Un componente che visualizza gli ingredienti raggruppati e un pulsante per l'azione successiva.
 */

function Ingredients(props) {
  /**
   * Suddivide l'elenco degli ingredienti in gruppi di quattro per una migliore visualizzazione.
   * @type {Array<Array<Object>>}
   */
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
                  <span className="IngredientQuantity">
                    {ingrediente.Quantita}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="Successivo">
          <ButtonSucessivo name={props.name} />
        </div>
      </div>
    </>
  );
}

export default Ingredients;
