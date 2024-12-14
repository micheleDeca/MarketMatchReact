/**
 * Componente StarIcon
 * 
 * Descrizione:
 * `StarIcon` è un'icona SVG che rappresenta una stella. Il colore e la dimensione della stella sono personalizzabili tramite props.
 * 
 * Props:
 * - `color` {string}: Colore della stella in formato esadecimale, RGB o nome del colore. (es. "#FFE414", "red")
 * - `size` {string|number}: Dimensione della stella in pixel. Specifica sia larghezza che altezza. (es. "50px", 50)
 * 
 * Struttura:
 * - L'icona è rappresentata da un elemento SVG.
 * - Il colore della stella è definito dalle props `fill` e `stroke`.
 * - La dimensione è regolata da `width` e `height`.
 * 
 * Comportamento:
 * - L'icona si adatta dinamicamente in base ai valori passati tramite le props.
 * 
 * Esempio di utilizzo:
 * ```jsx
 * import StarIcon from './StarIcon';
 * 
 * <StarIcon color="#FFE414" size="50px" />
 * <StarIcon color="gray" size={30} />
 * ```
 */


import './StarIcon.css'

const StarIcon = (props) => {
  return (
    <svg
    fill={props.color}
    width={props.size}
    height={props.size}
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    className="icon"
    stroke={props.color}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
    <g id="SVGRepo_iconCarrier">
      <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
    </g>
  </svg>
  )
}

export default StarIcon;