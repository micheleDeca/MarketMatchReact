import "./Ricetta.css";
import PopUpModify from "../../Components/PopUpModify/PopUpModify.jsx";
import ShopWindow from "../../Components/shop_window/shop_window.jsx";
import RecipesInformation from "../../Components/RecipesInformation/RecipesInformation.jsx";
import Ingredients from "../../Components/Ingredients/Ingredients.jsx";

function Ricetta() {

    return (
        <>
            <div className={`popup-edit${modify === "" ? "" : "-active"}`  /*AGGIUNTO*/}>
                <PopUpModify modify={modify} setModify={setModify} negozioInfo={negozioInfo}
                             setNegozioInfo={setNegozioInfo}/>
            </div>
            <div className="boxRicetta">
                <ShopWindow
                    Description={negozioInfo.descrizione}
                    ImageDescription="immagine prodotto"
                    Name={negozioInfo.nome}
                    mode={props.mode}
                    modify={setModify}
                    badges={prodottoInfo.categorie}
                />
                <span>&nbsp;</span>
                <RecipesInformation
                    difficoltà={}
                    preparazione={}
                    cottura={}
                    costo={}/>
                <span>&nbsp;</span>
                <Ingredients boh={}/>
            </div>
        </>
    );
}

export default Ricetta;