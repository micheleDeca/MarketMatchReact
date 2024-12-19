import "./PopUpModify.css";
import close from "./close.svg";

function PopUpModify(props) {
  const closeForm = () => {
    document.getElementById("myForm").style.display = "none";
  };

  const save = (type) => {
    if (type === "Orari") {
      const orari = document.getElementsByClassName("input");
      const newOrari = [];
      for (let i = 0; i < orari.length; i++) {
        newOrari.push({
          giorno: props.negozioInfo.orari[i].giorno,
          orario: orari[i].value,
        });
      }
      props.setNegozioInfo({ ...props.negozioInfo, orari: newOrari });
    }
    if (type === "Immagine") {
      const immagine = document.getElementsByClassName("input")[0];
      props.setNegozioInfo({ ...props.negozioInfo, foto: immagine.value });
    }
    if(type === "Informazioni") {
      const informazioni = document.getElementsByClassName("input");
      props.setNegozioInfo({
        ...props.negozioInfo,
        posizione: {
          regione: informazioni[0].value,
          provincia: informazioni[1].value,
          cap: informazioni[2].value,
          indirizzo: informazioni[3].value,
        },
        contatti: {
          telefono: informazioni[4].value,
          mail: informazioni[5].value,
        },
      });
    }
    if(type === "Nome") {
      const nome = document.getElementsByClassName("input")[0];
      props.setNegozioInfo({ ...props.negozioInfo, nome: nome.value });
    }
    if(type === "Descrizione") {
      const descrizione = document.getElementsByClassName("input")[0];
      props.setNegozioInfo({ ...props.negozioInfo, descrizione: descrizione.value });
    }
    document.getElementById("myForm").style.display = "none";
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
              {props.negozioInfo.orari.map((orari, index) => (
                <>
                  <div className="popUporari">
                    <label for="textInput" style={{ color: "darkslateblue" }}>
                      {orari.giorno}
                    </label>
                    <input
                      type="text"
                      defaultValue={orari.orario}
                      key={index}
                      className="input"
                    />
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
              <div className="popUporari">
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
              <div className="popUporari">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Regione
                </label>
                <input
                  type="text"
                  defaultValue={props.negozioInfo.posizione.regione}
                  className="input"
                />
              </div>
              <div className="popUporari">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Provincia
                </label>
                <input
                  type="text"
                  defaultValue={props.negozioInfo.posizione.provincia}
                  className="input"
                />
              </div>
              <div className="popUporari">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Cap
                </label>
                <input
                  type="text"
                  defaultValue={props.negozioInfo.posizione.cap}
                  className="input"
                />
              </div>
              <div className="popUporari">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Indirizzo
                </label>
                <input
                  type="text"
                  defaultValue={props.negozioInfo.posizione.indirizzo}
                  className="input"
                />
              </div>
              <div className="popUporari">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Telefono
                </label>
                <input
                  type="text"
                  defaultValue={props.negozioInfo.contatti.telefono}
                  className="input"
                />
              </div>
              <div className="popUporari">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Email
                </label>
                <input
                  type="text"
                  defaultValue={props.negozioInfo.contatti.mail}
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
              <div className="popUporari">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Nome Negozio
                </label>
                <input type="text" className="input" defaultValue={props.negozioInfo.nome}/>
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
              <div className="popUporari">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Descrizione
                </label>
                <input type="text" className="input" defaultValue={props.negozioInfo.descrizione}/>
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
              <div className="popUporari">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Bio
                </label>
                <input type="checkbox" name="option1" value="Option 1" defaultChecked={props.negozioInfo.categorie.some(categoria => categoria.text === "Bio")}/>
              </div>
              <div className="popUporari">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Senza lattosio
                </label>
                <input type="checkbox" name="option1" value="Option 1" defaultChecked={props.negozioInfo.categorie.some(categoria => categoria.text === "Senza lattosio")} />
              </div>
              <div className="popUporari">
                <label for="textInput" style={{ color: "darkslateblue" }} >
                  Vegan
                </label>
                <input type="checkbox" name="option1" value="Option 1" defaultChecked={props.negozioInfo.categorie.some(categoria => categoria.text === "Vegan")} />
              </div>
              <div className="popUporari">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Vegetariano
                </label>
                <input type="checkbox" name="option1" value="Option 1" defaultChecked={props.negozioInfo.categorie.some(categoria => categoria.text === "Vegetariano")} />
              </div>
              <div className="popUporari">
                <label for="textInput" style={{ color: "darkslateblue" }}>
                  Senza glutine
                </label>
                <input type="checkbox" name="option1" value="Option 1" defaultChecked={props.negozioInfo.categorie.some(categoria => categoria.text === "Senza glutine")} />
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
          
        </div>
      </div>
    </>
  );
}

export default PopUpModify;
