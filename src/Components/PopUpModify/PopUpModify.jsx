import "./PopUpModify.css";
import close from "./close.svg";

function PopUpModify(props) {
  const closeForm = () => {
    document.getElementById("myForm").style.display = "none";
  };

  return (
    <>
      <div className="form-popup" id="myForm">
        <div className="form-container">
          <img src={close} alt="close" onClick={closeForm} className="popUpImg"/>
          {props.modify == "Modifica orari" ? (
            <>
              {props.negozioInfo.orari.map((orari, index) => (
                <div className="orari">
                  <label for="textInput" style={{color: "darkslateblue"}}>{orari.giorno}</label>
                  <input
                    type="text"
                    value={orari.orario}
                    key={index}
                    className="input"
                  />
                </div>
              ))}
            </>
          ) : (
            <>
              <p>Questo è il primo paragrafo.</p>
              <p>Questo è il secondo paragrafo.</p>
              <p>Questo è il terzo paragrafo.</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default PopUpModify;
