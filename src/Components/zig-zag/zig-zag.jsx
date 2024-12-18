import "./zig-zag.css";
import Button from "../Button/Button";

/**
 * A reusable container component with a button for editing or actions.
 *
 * @component
 * @param {Object} props - The props object for the ZigZag component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the ZigZag container.
 * @param {string} props.pulsante - The label for the action button.
 *
 * @returns {JSX.Element} A styled container with a customizable button.
 */

function ZigZag({ children, pulsante, onEdit }) {
  return (
    <>
      <div className="zigzagBox">
        {children}
        <div className="modifica">
          <span className="zigzagSpan"></span>
          <span className="zigzagSpan2"><Button onEdit={onEdit} name={pulsante}/></span>
        </div>
      </div>
    </>
  );
}

export default ZigZag;
