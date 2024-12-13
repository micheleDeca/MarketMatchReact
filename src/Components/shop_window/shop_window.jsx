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
  if (props.mode != "amm") {
    return (
      <>
        <div className="ShopWindowBox">
          <div className="LeftShopWindow">
            <div className="ShopWindowBox">
              <img
                src="data:image/jpeg;base64,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"
                alt={props.ImageDescription}
                className="Image"
              ></img>
            </div>
          </div>
          <div className="RightShopWindow">
            <div className="ShopWindowBox">
              <p className="nomeProdotto">{props.Name}</p>
              <BadgeContainer />
            </div>
            <p className="descrizioneProdotto">{props.Description}</p>
            {props.tipo == "prodotto" && (
              <p className="Prezzo">{props.Prezzo}</p>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="ShopWindowBox">
          <div className="LeftShopWindow">
            <ZigZag pulsante="Modifica Immagine">
              <div className="ShopWindowBox">
                <img
                  src="data:image/jpeg;base64,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"
                  alt={props.ImageDescription}
                  className="Image"
                ></img>
              </div>
            </ZigZag>
          </div>
          <div className="RightShopWindow">
            <div className="ShopWindowBox">
              <ZigZag pulsante="Modifica Nome">
                <p className="nomeProdotto">{props.Name}</p>
              </ZigZag>
              <ZigZag pulsante="Modifica Categorie">
                <BadgeContainer />
              </ZigZag>
            </div>
            <ZigZag pulsante="Modifica Descrizione">
              <p className="descrizioneProdotto">{props.Description}</p>
            </ZigZag>
            {props.tipo == "prodotto" && (
              <ZigZag pulsante="Modifica Prezzo">
                <p className="Prezzo">{props.Prezzo}</p>
              </ZigZag>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default ShopWindow;
