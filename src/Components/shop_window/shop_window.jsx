import "./shop_window.css";
import ZigZag from "../zig-zag/zig-zag";
import BadgeContainer from "../CategoryLabelList/CategoryLabelList";

/**
 * A component that displays a shop window with product details and optional edit functionality.
 *
 * @component
 * @param {Object} props - The props object for the ShopWindow component.
 * @param {string} props.mode - The display mode ("amm" for admin mode, others for user view).
 * @param {string} props.ImageDescription - The alt text for the product image.
 * @param {string} props.Name - The name of the product or shop item.
 * @param {string} props.Description - A description of the product or shop item.
 * @param {string} [props.Prezzo] - The price of the product, displayed if `tipo` is "prodotto".
 * @param {string} props.tipo - Specifies the type of item ("prodotto" for products).
 *
 * @returns {JSX.Element} A component displaying a shop window, with editing options in admin mode.
 */

function ShopWindow(props) {

    if (props.mode === "ConA") {
        return (
            <>
                <div className="ShopWindowBox">
                    <div className="LeftShopWindow">
                        <div className="ShopWindowBox">
                            <img
                                src={`http://4.232.65.20/assets/${props.ImageDescription}`}
                                alt={props.ImageDescription} className="Image"></img>
                        </div>
                    </div>
                    <div className="RightShopWindow">
                        <div className="nameBadge">
                            <div className="boxName">
                                <p className="nome">{props.Name}</p>
                            </div>
                            <div className="boxBadges">
                                <BadgeContainer badges={props.badges}/>
                            </div>
                        </div>
                        <div className="img">
                            <img
                                src={`http://4.232.65.20/assets${props.ImageDescription}`}
                                alt={props.ImageDescription} className="Image"></img>
                        </div>
                        <div className="boxDescription">
                            <p className="descrizione">{props.Description}</p>
                        </div>
                        {props.tipo == "prodotto" && (
                            <p className="prezzo-ShopWindow">
                                {props.currentPrice != "" ? (
                                    <>
                                        <span className="current-price-card">
                                          {props.currentPrice}
                                        </span>
                                        <span className="original-price-card">
                                          {props.originalPrice}
                                        </span>
                                    </>
                                ) : (
                                    <span className="normal-price-card">
                                        {props.originalPrice}
                                        </span>
                                )}
                            </p>
                        )}
                    </div>
                </div>
            </>
        );
    } else if (props.mode === "NegA") {
        return (
            <>
                <div className="ShopWindowBox">
                    <div className="LeftShopWindow">
                        <ZigZag
                            pulsante="Modifica Immagine"
                            modify={props.modify}
                        >
                            <div className="ShopWindowBox">
                                <img
                                    src={`http://4.232.65.20/assets${props.ImageDescription}`}
                                    alt={props.ImageDescription}
                                    className="Image"
                                ></img>
                            </div>
                        </ZigZag>
                    </div>
                    <div className="RightShopWindow">
                        <div className="nameBadge">
                            <ZigZag
                                pulsante="Modifica Nome"
                                modify={props.modify}
                            >
                                <p className="nome">{props.Name}</p>
                            </ZigZag>
                            <ZigZag
                                pulsante="Modifica Categorie"
                                modify={props.modify}
                            >
                                <BadgeContainer badges={props.badges}/>
                            </ZigZag>
                        </div>
                        <div className="hidden-zig">
                            <ZigZag
                                pulsante="Modifica Immagine"
                                modify={props.modify}
                            >
                                <div className="img">
                                    <img
                                        src={`http://4.232.65.20/assets${props.ImageDescription}`}
                                        alt={props.ImageDescription}
                                        className="Image"
                                    ></img>
                                </div>
                            </ZigZag>
                        </div>
                        <ZigZag
                            pulsante="Modifica Descrizione"
                            modify={props.modify}
                        >
                            <p className="descrizione">{props.Description}</p>
                        </ZigZag>
                        {props.tipo == "prodotto" && (
                            <ZigZag
                                pulsante="Modifica Prezzo"
                                modify={props.modify}
                            >
                                <p className="prezzo-ShopWindow">
                                    {props.originalPrice != "" ? (
                                        <>
                                          <span className="current-price-card">
                                            {props.currentPrice}
                                          </span>
                                            <span className="original-price-card">
                                            {props.originalPrice}
                                          </span>
                                        </>
                                    ) : (
                                        <span className="normal-price-card">
                                          {props.currentPrice}
                                        </span>
                                    )}
                                </p>
                            </ZigZag>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default ShopWindow;
