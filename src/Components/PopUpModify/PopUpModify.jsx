import "./PopUpModify.css";
import close from "./close.svg";
import CategoryLabel from "../CategoryLabel/CategoryLabel.jsx";
import Button from "../Button/Button.jsx";

function PopUpModify(props) {
  const closeForm = () => {
    props.setModify(""); /*AGGIUNTO*/
    document.getElementById("myForm").style.display = "none";
  };

  const save = (type) => {
    if (type === "Elimina") {
      props.setNegozioInfo({ ...props.negozioInfo, Eliminato: true });
      window.location.href = "/prodotti";
    }
    if (type === "Orari") {
      const orari = document.getElementsByClassName("input");
      const newOrari = [];
      for (let i = 0; i < orari.length; i++) {
        newOrari.push(orari[i].value);
      }
      props.setNegozioInfo({ ...props.negozioInfo, OrarioNegozio: newOrari });
    }
    if (type === "Immagine") {
      const immagine = document.getElementsByClassName("input")[0];
      props.setNegozioInfo({ ...props.negozioInfo, Foto: immagine.value });
    }
    if (type === "Informazioni") {
      const informazioni = document.getElementsByClassName("input");
      props.setNegozioInfo({
        ...props.negozioInfo,
        Regione: informazioni[0].value,
        Provincia: informazioni[1].value,
        Città: informazioni[2].value,
        Cap: informazioni[3].value,
        Indirizzo: informazioni[4].value,
        Cellulare: informazioni[5].value,
        Mail: informazioni[6].value,
      });
    }
    if (type === "Nome") {
      const nome = document.getElementsByClassName("input")[0];
      props.setNegozioInfo({ ...props.negozioInfo, Nome: nome.value, RagioneSociale: nome.value });
    }
    if (type === "Descrizione") {
      const descrizione = document.getElementsByClassName("input")[0];
      props.setNegozioInfo({
        ...props.negozioInfo,
        Descrizione: descrizione.value,
      });
    }
    if (type === "Categorie") {
      const categorie = document.getElementsByName("option");
      const newCategorie = [];
      for (let i = 0; i < categorie.length; i++) {
        if (categorie[i].checked) {
          newCategorie.push(categorie[i].value);
        }
      }
      props.setNegozioInfo({ ...props.negozioInfo, Categorie: newCategorie });
    }
    if (type === "Prezzo") {
      const prezzo = document.getElementsByClassName("input");
      if (prezzo[0].value !== "" && prezzo[1].value === "") {
        props.setNegozioInfo({
          ...props.negozioInfo,
          currentPrice: parseFloat(prezzo[0].value).toFixed(2),
          originalPrice: null,
          Offerta: false,
        });
      }
      else if (prezzo[1].value !== "" && prezzo[0].value !== "") {
        props.setNegozioInfo({
          ...props.negozioInfo,
          currentPrice: parseFloat(prezzo[1].value).toFixed(2),
          originalPrice: parseFloat(prezzo[0].value).toFixed(2),
          Offerta: true,
        });
      }
      else{
        window.alert("Inserire il prezzo normale e il prezzo in offerta o solo il prezzo normale!");
      }
    }
    if (type === "Caratteristiche") {
      const caratteristiche = document.getElementsByTagName("input");
      props.setNegozioInfo({
        ...props.negozioInfo,
        PesoDimensioniUnitaria: caratteristiche[0].value,
        DescrizioneUnita: caratteristiche[1].value,
        Quantità: parseInt(caratteristiche[2].value),
        Disponibile: caratteristiche[3].checked,
      });
    }
    closeForm();
  };

  return (
    <>
      <div className="form-popup" id="myForm">
        <div className="close">
          <img
            src={close}
            alt="close"
            onClick={closeForm}
            className="popUpImg"
          />
        </div>
        <div className="form-container">
          {props.modify === "Modifica orari" ? (
            <>
              {props.negozioInfo.OrarioNegozio.map((orari, index) => (
                <>
                  <div className="ColumnPopUp">
                    <div className="RowPopUp">
                      <label
                        className="labelPopUp"
                        style={{ color: "darkslateblue" }}
                      >
                        {index === 0
                          ? "Lunedì"
                          : index === 1
                          ? "Martedì"
                          : index === 2
                          ? "Mercoledì"
                          : index === 3
                          ? "Giovedì"
                          : index === 4
                          ? "Venerdì"
                          : index === 5
                          ? "Sabato"
                          : "Domenica"}
                      </label>
                      <input
                        type="text"
                        defaultValue={orari}
                        key={index}
                        className="input"
                      />
                    </div>
                  </div>
                </>
              ))}
              <div className="popUpRight">
                <input
                  type="submit"
                  value="Salva"
                  className="popUpbtn"
                  onClick={() => save("Orari")}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {props.modify === "Modifica Immagine" ? (
            <>
              <div className="ColumnPopUp">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Carica Immagine
                </label>
                <input type="file" className="input" />
              </div>
              <div className="popUpRight">
                <input
                  type="submit"
                  value="Salva"
                  className="popUpbtn"
                  onClick={() => save("Immagine")}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {props.modify === "Modifica Informazioni" ? (
            <>
              <div className="ColumnPopUp">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Regione
                </label>
                <input
                  type="text"
                  defaultValue={props.negozioInfo.Regione}
                  className="input"
                />
              </div>
              <div className="ColumnPopUp">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Provincia
                </label>
                <input
                  type="text"
                  defaultValue={props.negozioInfo.Provincia}
                  className="input"
                />
              </div>
              <div className="ColumnPopUp">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Città
                </label>
                <input
                  type="text"
                  defaultValue={props.negozioInfo.Città}
                  className="input"
                />
              </div>
              <div className="ColumnPopUp">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Cap
                </label>
                <input
                  type="text"
                  defaultValue={props.negozioInfo.Cap}
                  className="input"
                />
              </div>
              <div className="ColumnPopUp">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Indirizzo
                </label>
                <input
                  type="text"
                  defaultValue={props.negozioInfo.Indirizzo}
                  className="input"
                />
              </div>
              <div className="ColumnPopUp">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Telefono
                </label>
                <input
                  type="text"
                  defaultValue={props.negozioInfo.Cellulare}
                  className="input"
                />
              </div>
              <div className="ColumnPopUp">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Email
                </label>
                <input
                  type="text"
                  defaultValue={props.negozioInfo.Mail}
                  className="input"
                />
              </div>
              <div className="popUpRight">
                <input
                  type="submit"
                  value="Salva"
                  className="popUpbtn"
                  onClick={() => save("Informazioni")}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {props.modify === "Modifica Nome" ? (
            <>
              <div className="ColumnPopUp">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Nome Negozio
                </label>
                <input
                  type="text"
                  className="input"
                  defaultValue={
                    props.negozioInfo.Nome || props.negozioInfo.RagioneSociale
                  }
                />
              </div>
              <div className="popUpRight">
                <input
                  type="submit"
                  value="Salva"
                  className="popUpbtn"
                  onClick={() => save("Nome")}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {props.modify === "Modifica Descrizione" ? (
            <>
              <div className="ColumnPopUp">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Descrizione
                </label>
                <input
                  type="text"
                  className="input"
                  defaultValue={props.negozioInfo.Descrizione}
                />
              </div>
              <div className="popUpRight">
                <input
                  type="submit"
                  value="Salva"
                  className="popUpbtn"
                  onClick={() => save("Descrizione")}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {props.modify === "Modifica Categorie" ? (
            <>
              <div className="ColumnPopUp">
                <div className="RowPopUp">
                  <CategoryLabel category="Bio" />
                  <input
                    type="checkbox"
                    name="option"
                    value="Bio"
                    defaultChecked={props.negozioInfo.Categorie.includes("Bio")}
                  />
                </div>
              </div>
              <div className="ColumnPopUp">
                <div className="RowPopUp">
                  <CategoryLabel category="Senza Lattosio" />
                  <input
                    type="checkbox"
                    name="option"
                    value="Senza Lattosio"
                    defaultChecked={props.negozioInfo.Categorie.includes(
                      "Senza Lattosio"
                    )}
                  />
                </div>
              </div>
              <div className="ColumnPopUp">
                <div className="RowPopUp">
                  <CategoryLabel category="Vegano" />
                  <input
                    type="checkbox"
                    name="option"
                    value="Vegano"
                    defaultChecked={props.negozioInfo.Categorie.includes(
                      "Vegano"
                    )}
                  />
                </div>
              </div>
              <div className="ColumnPopUp">
                <div className="RowPopUp">
                  <CategoryLabel category="Vegetariano" />
                  <input
                    type="checkbox"
                    name="option"
                    value="Vegetariano"
                    defaultChecked={props.negozioInfo.Categorie.includes(
                      "Vegetariano"
                    )}
                  />
                </div>
              </div>
              <div className="ColumnPopUp">
                <div className="RowPopUp">
                  <CategoryLabel category="Senza Glutine" />
                  <input
                    type="checkbox"
                    name="option"
                    value="Senza Glutine"
                    defaultChecked={props.negozioInfo.Categorie.includes(
                      "Senza Glutine"
                    )}
                  />
                </div>
              </div>
              <div className="ColumnPopUp">
                <div className="RowPopUp">
                  <CategoryLabel category="Km0" />
                  <input
                    type="checkbox"
                    name="option"
                    value="Km0"
                    defaultChecked={props.negozioInfo.Categorie.includes("Km0")}
                  />
                </div>
              </div>
              <div className="ColumnPopUp">
                <div className="RowPopUp">
                  <CategoryLabel category="Sostenibile" />
                  <input
                    type="checkbox"
                    name="option"
                    value="Sostenibile"
                    defaultChecked={props.negozioInfo.Categorie.includes("Sostenibile")}
                  />
                </div>
              </div>
              <div className="popUpRight">
                <input
                  type="submit"
                  value="Salva"
                  className="popUpbtn"
                  onClick={() => save("Categorie")}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {props.modify === "Modifica Prezzo" ? (
            <>
              <div className="ColumnPopUp">
                <label htmlFor="textInput" style={{ color: "darkslateblue" }}>
                  Prezzo
                </label>
                <input
                  type="text"
                  className="input"
                  defaultValue={props.negozioInfo.originalPrice 
                    ? props.negozioInfo.originalPrice
                    : props.negozioInfo.currentPrice}
                />
              </div>
              <div className="ColumnPopUp">
                <label htmlFor="textInput" style={{ color: "darkslateblue" }}>
                  Prezzo in offerta
                </label>
                <input
                  type="text"
                  className="input"
                  defaultValue={props.negozioInfo.originalPrice 
                    ? props.negozioInfo.currentPrice
                    : ""}
                />
              </div>
              <div className="popUpRight">
                <input
                  type="submit"
                  value="Salva"
                  className="popUpbtn"
                  onClick={() => save("Prezzo")}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {props.modify === "Modifica Caratteristiche" ? (
            <>
              <div className="ColumnPopUp">
                <label htmlFor="textInput" style={{ color: "darkslateblue" }}>
                  Peso
                </label>
                <input
                  type="text"
                  className="input"
                  defaultValue={props.negozioInfo.PesoDimensioniUnitaria}
                />
              </div>
              <div className="ColumnPopUp">
                <label htmlFor="textInput" style={{ color: "darkslateblue" }}>
                  Dimensioni
                </label>
                <input
                  type="text"
                  className="input"
                  defaultValue={props.negozioInfo.DescrizioneUnita}
                />
              </div>
              <div className="ColumnPopUp">
                <label htmlFor="textInput" style={{ color: "darkslateblue" }}>
                  Quantità
                </label>
                <input
                  type="text"
                  className="input"
                  defaultValue={props.negozioInfo.Quantità}
                />
              </div>
              <div className="ColumnPopUp">
                <div className="RowPopUp">
                  <label htmlFor="textInput" style={{ color: "darkslateblue" }}>
                    Disponibilità
                  </label>
                  <input
                    type="checkbox"
                    name="option_disp"
                    value="disponiblita"
                    className="PopUpCheck"
                    defaultChecked={props.negozioInfo.Disponibile === true}
                  />
                </div>
              </div>
              <div className="popUpRight">
                <input
                  type="submit"
                  value="Salva"
                  className="popUpbtn"
                  onClick={() => save("Caratteristiche")}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {props.modify === "Elimina Prodotto" ? (
            <>
              <div className="ColumnPopUp">
                <label style={{ color: "darkslateblue" }}>
                  Vuoi eliminare questo prodotto?
                </label>
              </div>
              <div className="popUpRight">
                <input
                  type="submit"
                  value="Si"
                  className="popUpbtn"
                  onClick={() => save("Elimina")}
                />
                <span>&nbsp;&nbsp;&nbsp;</span>
                <input
                  type="submit"
                  value="No"
                  className="popUpbtn"
                  onClick={() => closeForm()}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default PopUpModify;
