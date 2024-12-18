import "./Button.css";

/**
 * A reusable button component styled with CSS.
 *
 * @component
 * @param {Object} props - The props object for the Button component.
 * @param {string} props.name - The label displayed on the button.
 *
 * @returns {JSX.Element} A styled button element.
 */

function Button(props) {

  const setModify = (name) => {
    props.modify(name);
    document.getElementById("myForm").style.display = "block";
  };

  return <input type="button" value={props.name} className="OrangeButton" onClick={() => setModify(props.name)} />;
}

export default Button;

