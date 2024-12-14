/**
 * Componente Stelle
 * 
 * Descrizione:
 * Il componente `Stelle` mostra un'icona di stella colorata o scura in base al numero di stelle selezionate (`starNumber`).
 * Utilizza un componente figlio `StarIcon` per visualizzare ogni stella.
 * 
 * Props:
 * - `starNumber` {number}: Il numero di stelle da evidenziare, tra 0 e 5. (es. 3)
 * 
 * Comportamento:
 * - Le stelle sono evidenziate con il colore giallo ("#FFE414") se il valore di `starNumber` è maggiore o uguale alla posizione della stella (1-5).
 * - Le stelle non evidenziate sono mostrate con un colore scuro ("#1E1E1E").
 * 
 * Esempio di utilizzo:
 * <Stelle starNumber={3} />
 * 
 */

import StarIcon from './StarIcon/StarIcon'

const Stelle = (props) => {
   return (
    <div>
      <StarIcon size={"50px"} color={props.starNumber >= 1 ? "#FFE414" : "#1E1E1E"} />
      <StarIcon size={"50px"} color={props.starNumber >= 2 ? "#FFE414" : "#1E1E1E"} />
      <StarIcon size={"50px"} color={props.starNumber >= 3 ? "#FFE414" : "#1E1E1E"} />
      <StarIcon size={"50px"} color={props.starNumber >= 4 ? "#FFE414" : "#1E1E1E"} />
      <StarIcon size={"50px"} color={props.starNumber >= 5 ? "#FFE414" : "#1E1E1E"} />
    </div>
  )
}

export default Stelle;
