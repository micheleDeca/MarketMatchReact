import "./PopUpModify.css";
import close from "./close.svg";
import CategoryLabel from "../CategoryLabel/CategoryLabel.jsx";

function PopUpModify(props) {
    const closeForm = () => {
        props.setModify(""); /*AGGIUNTO*/
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
            props.setNegozioInfo({...props.negozioInfo, orari: newOrari});
        }
        if (type === "Immagine") {
            const immagine = document.getElementsByClassName("input")[0];
            props.setNegozioInfo({...props.negozioInfo, foto: immagine.value});
        }
        if (type === "Informazioni") {
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
        if (type === "Nome") {
            const nome = document.getElementsByClassName("input")[0];
            props.setNegozioInfo({...props.negozioInfo, nome: nome.value});
        }
        if (type === "Descrizione") {
            const descrizione = document.getElementsByClassName("input")[0];
            props.setNegozioInfo({...props.negozioInfo, descrizione: descrizione.value});
        }
        if (type === "Categorie") {
            const categorie = document.getElementsByName("option");
            const newCategorie = [];
            for (let i = 0; i < categorie.length; i++) {
                if (categorie[i].checked) {
                    newCategorie.push(categorie[i].value);
                }
            }
            props.setNegozioInfo({...props.negozioInfo, categorie: newCategorie});
        }
        if(type === "Prezzo"){
            const prezzo = document.getElementsByClassName("input");
            props.setNegozioInfo({
                ...props.negozioInfo,
                prezzo: {
                    base: prezzo[0].value,
                    scontato: prezzo[1].value,
                },
            });
        }
        if(type === "Caratteristiche"){
            const caratteristiche = document.getElementsByTagName("input");
            props.setNegozioInfo({
                ...props.negozioInfo,
                caratteristiche: {
                    PesoDimensioniUnitaria: caratteristiche[0].value,
                    DescrizioneUnita: caratteristiche[1].value,
                    Quantità: caratteristiche[2].value,
                    disponibile: caratteristiche[3].checked,
                },
            });
        }
        document.getElementById("myForm").style.display = "none";
        props.setModify("");

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
                                    <div className="ColumnPopUp">
                                        <div className="RowPopUp">
                                            <label className="labelPopUp" style={{color: "darkslateblue"}}>
                                                {orari.giorno}
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={orari.orario}
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
                                <label for="textInput" style={{color: "darkslateblue"}}>
                                    Carica Immagine
                                </label>
                                <input type="file" className="input"/>
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
                                <label for="textInput" style={{color: "darkslateblue"}}>
                                    Regione
                                </label>
                                <input
                                    type="text"
                                    defaultValue={props.negozioInfo.posizione.regione}
                                    className="input"
                                />
                            </div>
                            <div className="ColumnPopUp">
                                <label for="textInput" style={{color: "darkslateblue"}}>
                                    Provincia
                                </label>
                                <input
                                    type="text"
                                    defaultValue={props.negozioInfo.posizione.provincia}
                                    className="input"
                                />
                            </div>
                            <div className="ColumnPopUp">
                                <label for="textInput" style={{color: "darkslateblue"}}>
                                    Cap
                                </label>
                                <input
                                    type="text"
                                    defaultValue={props.negozioInfo.posizione.cap}
                                    className="input"
                                />
                            </div>
                            <div className="ColumnPopUp">
                                <label for="textInput" style={{color: "darkslateblue"}}>
                                    Indirizzo
                                </label>
                                <input
                                    type="text"
                                    defaultValue={props.negozioInfo.posizione.indirizzo}
                                    className="input"
                                />
                            </div>
                            <div className="ColumnPopUp">
                                <label for="textInput" style={{color: "darkslateblue"}}>
                                    Telefono
                                </label>
                                <input
                                    type="text"
                                    defaultValue={props.negozioInfo.contatti.telefono}
                                    className="input"
                                />
                            </div>
                            <div className="ColumnPopUp">
                                <label for="textInput" style={{color: "darkslateblue"}}>
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
                            <div className="ColumnPopUp">
                                <label for="textInput" style={{color: "darkslateblue"}}>
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
                            <div className="ColumnPopUp">
                                <label for="textInput" style={{color: "darkslateblue"}}>
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
                            <div className="ColumnPopUp">
                                <div className="RowPopUp">
                                    <CategoryLabel
                                        category="Bio"
                                    />
                                    <input type="checkbox" name="option" value="Bio"
                                           defaultChecked={props.negozioInfo.categorie.includes("Bio")}/>
                                </div>
                            </div>
                            <div className="ColumnPopUp">
                                <div className="RowPopUp">
                                    <CategoryLabel
                                        category="Senza lattosio"
                                    />
                                    <input type="checkbox" name="option" value="Senza lattosio"
                                           defaultChecked={props.negozioInfo.categorie.includes("Senza lattosio")}/>
                                </div>
                            </div>
                            <div className="ColumnPopUp">
                                <div className="RowPopUp">
                                    <CategoryLabel
                                        category="Vegan"
                                    />
                                    <input type="checkbox" name="option" value="Vegan"
                                           defaultChecked={props.negozioInfo.categorie.includes("Vegan")}/>
                                </div>
                            </div>
                            <div className="ColumnPopUp">
                                <div className="RowPopUp">
                                    <CategoryLabel
                                        category="Vegetariano"
                                    />
                                    <input type="checkbox" name="option" value="Vegetariano"
                                           defaultChecked={props.negozioInfo.categorie.includes("Vegetariano")}/>
                                </div>
                            </div>
                            <div className="ColumnPopUp">
                                <div className="RowPopUp">
                                    <CategoryLabel
                                        category="Senza glutine"
                                    />
                                    <input type="checkbox" name="option" value="Senza glutine"
                                           defaultChecked={props.negozioInfo.categorie.includes("Senza glutine")}/>
                                </div>
                            </div>
                            <div className="ColumnPopUp">
                                <div className="RowPopUp">
                                    <CategoryLabel
                                        category="km0"
                                    />
                                    <input type="checkbox" name="option" value="km0"
                                           defaultChecked={props.negozioInfo.categorie.includes("Km0")}/>
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
                                <label htmlFor="textInput" style={{color: "darkslateblue"}}>
                                    Prezzo Originale
                                </label>
                                <input type="text" className="input" defaultValue={props.negozioInfo.prezzo.base}/>
                            </div>
                            <div className="ColumnPopUp">
                                <label htmlFor="textInput" style={{color: "darkslateblue"}}>
                                    Prezzo Corrente
                                </label>
                                <input type="text" className="input" defaultValue={props.negozioInfo.prezzo.scontato}/>
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
                    {props.modify === "Modifica Prezzo" ? (
                        <>
                            <div className="ColumnPopUp">
                                <label htmlFor="textInput" style={{color: "darkslateblue"}}>
                                    Prezzo Originale
                                </label>
                                <input type="text" className="input" defaultValue={props.negozioInfo.prezzo.base}/>
                            </div>
                            <div className="ColumnPopUp">
                                <label htmlFor="textInput" style={{color: "darkslateblue"}}>
                                    Prezzo Corrente
                                </label>
                                <input type="text" className="input" defaultValue={props.negozioInfo.prezzo.scontato}/>
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
                                <label htmlFor="textInput" style={{color: "darkslateblue"}}>
                                    Peso
                                </label>
                                <input type="text" className="input"
                                       defaultValue={props.negozioInfo.caratteristiche.PesoDimensioniUnitaria}/>
                            </div>
                            <div className="ColumnPopUp">
                                <label htmlFor="textInput" style={{color: "darkslateblue"}}>
                                    Dimensioni
                                </label>
                                <input type="text" className="input"
                                       defaultValue={props.negozioInfo.caratteristiche.DescrizioneUnita}/>
                            </div>
                            <div className="ColumnPopUp">
                                <label htmlFor="textInput" style={{color: "darkslateblue"}}>
                                    Quantità
                                </label>
                                <input type="text" className="input"
                                       defaultValue={props.negozioInfo.caratteristiche.Quantità}/>
                            </div>
                            <div className="ColumnPopUp">
                                <div className="RowPopUp">
                                    <label htmlFor="textInput" style={{color: "darkslateblue"}}>
                                        Disponibilità
                                    </label>
                                    <input type="checkbox" name="option_disp" value="disponiblita"
                                           defaultChecked={props.negozioInfo.caratteristiche.disponibile === true}/>
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
                </div>
            </div>
        </>
    );
}

export default PopUpModify;
