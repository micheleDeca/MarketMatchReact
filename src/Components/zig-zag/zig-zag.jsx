import "./zig-zag.css";
import Button from "../Button/Button";

/**
 * A reusable container component with a customizable button for actions or editing.
 *
 * The `ZigZag` component serves as a styled container for displaying content (`children`), 
 * along with an action button that can trigger specific functionality via the `modify` prop.
 *
 * @component
 * @param {Object} props - The props object for the ZigZag component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the ZigZag container.
 * @param {string} props.pulsante - The label for the action button.
 * @param {function} [props.modify] - An optional callback function to handle button actions.
 *
 * @returns {JSX.Element} A styled container with content and a customizable button.
 *
 * @example
 * // Example usage of the ZigZag component
 * import ZigZag from './ZigZag';
 * import Button from '../Button/Button';
 *
 * function App() {
 *   const handleModify = () => {
 *     console.log('Modify button clicked');
 *   };
 *
 *   return (
 *     <ZigZag pulsante="Edit" modify={handleModify}>
 *       <p>This is some content inside the ZigZag container.</p>
 *     </ZigZag>
 *   );
 * }
 */

function ZigZag({ children, pulsante, modify }) {
  return (
    <>
      <div className="zigzagBox">
        {children}
        <div className="modifica">
          <span className="zigzagSpan"></span>
          <span className="zigzagSpan2"><Button modify={modify} name={pulsante}/></span>
        </div>
      </div>
    </>
  );
}

export default ZigZag;
