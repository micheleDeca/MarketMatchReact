import "./Ricetta.css";
import PopUpModify from "../../Components/PopUpModify/PopUpModify.jsx";
import ShopWindow from "../../Components/shop_window/shop_window.jsx";
import RecipesInformation from "../../Components/RecipesInformation/RecipesInformation.jsx";
import Ingredients from "../../Components/Ingredients/Ingredients.jsx";
import React, {useState} from "react";
import ProductLongList from "../../Components/CardLongList/CardLongList.jsx";

function Ricetta(props) {

    const [ricettaInfo, setRicettaInfo] = useState({
        nome: "Risotto ai Funghi Porcini Bio",
        foto: "url_della_foto.jpg",
        descrizione: "Un cremoso risotto preparato con funghi porcini freschi e ingredienti biologici, ideale per una cena raffinata e salutare.",
        categorie: ["Bio", "Senza lattosio", "Vegan", "Senza glutine", "Km0", "Vegetariano"],
        badgeInformativi: {
            difficolta: "1",
            tempoPreparazione: "4",
            tempoCottura: "3",
            costo: "2",
            porzioni: "6",
        },
        Ingredienti: [
            {Nome: "Riso Carnaroli bio", Quantita: "320g"},
            {Nome: "Funghi porcini freschi bio", Quantita: "400g"},
            {Nome: "Brodo vegetale bio", Quantita: "1,5L"},
            {Nome: "Cipolla bio", Quantita: "1 media"},
            {Nome: "Olio extravergine d'oliva bio", Quantita: "3 cucchiai"},
            {Nome: "Vino bianco bio", Quantita: "100ml"},
            {Nome: "Parmigiano Reggiano bio", Quantita: "50g"},
            {Nome: "Prezzemolo fresco bio", Quantita: "q.b."}
        ],
        Passaggi: [
            {
                productName: "Preparare i funghi porcini",
                detail: "Pulire accuratamente i funghi porcini con un panno umido per rimuovere ogni residuo di terra e tagliarli a fette sottili.",
                image: "risotto_funghi/1.png"
            },
            {
                productName: "Soffriggere la cipolla",
                detail: "Tritare finemente la cipolla e soffriggerla a fuoco medio in una padella con olio extravergine d'oliva fino a doratura leggera.",
                image: "risotto_funghi/2.png"
            },
            {
                productName: "Cuocere i funghi",
                detail: "Aggiungere i funghi porcini nella padella con la cipolla e cuocere per circa 5 minuti, mescolando di tanto in tanto.",
                image: "risotto_funghi/3.png"
            },
        ],
    });

    const [modify, setModify] = useState("");

    return (

        <>
            <div className={`popup-edit${modify === "" ? "" : "-active"}`  /*AGGIUNTO*/}>
                <PopUpModify modify={modify} setModify={setModify} negozioInfo={ricettaInfo}
                             setNegozioInfo={setRicettaInfo}/>
            </div>
            <div className="boxRicetta">
                <ShopWindow
                    Description={ricettaInfo.descrizione}
                    ImageDescription={ricettaInfo.foto}
                    Name={ricettaInfo.nome}
                    mode={props.mode}
                    modify={setModify}
                    badges={ricettaInfo.categorie}
                />
                <div className="Informazioni">
                    <RecipesInformation
                        difficolta={ricettaInfo.badgeInformativi.difficolta}
                        preparazione={ricettaInfo.badgeInformativi.tempoPreparazione + " min"}
                        cottura={ricettaInfo.badgeInformativi.tempoCottura + " min"}
                        costo={ricettaInfo.badgeInformativi.costo + "€"}/>
                </div>
                <div className="Ingredienti">
                    <Ingredients ingredienti={ricettaInfo.Ingredienti} name="Prenota prodotti"/>
                </div>
                <ProductLongList
                    title="Preparazione"
                    products={ricettaInfo.Passaggi}/>
            </div>
        </>
    );
}

export default Ricetta;