import "./shop_window.css";
import ZigZag from "../zig-zag/zig-zag";
import BadgeContainer from "../CategoryLabelList/CategoryLabelList";

/**
 * ShopWindow is a reusable component for displaying a product or item in different modes.
 * It provides a styled layout for images, descriptions, prices, and badges,
 * and supports an editable mode with action buttons using the ZigZag component.
 *
 * @component
 * @param {Object} props - The props object for the ShopWindow component.
 * @param {string} props.mode - The display mode for the component:
 *   - `"ConA"` or `"NoAccesso"`: Standard display mode.
 *   - `"NegA"`: Editable mode with action buttons for modifications.
 * @param {string} props.ImageDescription - The description and image filename to display.
 * @param {string} props.Name - The name of the product or item.
 * @param {Array<string>} props.badges - A list of badges/categories associated with the product.
 * @param {string} props.Description - The description of the product or item.
 * @param {string} props.tipo - The type of the item (e.g., `"prodotto"` for products).
 * @param {number} [props.currentPrice] - The current price of the product (if applicable).
 * @param {number} [props.originalPrice] - The original price of the product (if applicable, for discounted items).
 * @param {function} [props.modify] - An optional callback function for handling modifications (used in `"NegA"` mode).
 *
 * @returns {JSX.Element} A styled component displaying the item's details, with optional edit functionality.
 *
 * @example
 * // Example usage of the ShopWindow component
 * import ShopWindow from "./ShopWindow";
 *
 * function App() {
 *   const modifyHandler = (field) => {
 *     console.log(`Modify action triggered for: ${field}`);
 *   };
 *
 *   return (
 *     <ShopWindow
 *       mode="NegA"
 *       ImageDescription="example-image.jpg"
 *       Name="Product Name"
 *       badges={["Category1", "Category2"]}
 *       Description="This is a description of the product."
 *       tipo="prodotto"
 *       currentPrice={19.99}
 *       originalPrice={24.99}
 *       modify={modifyHandler}
 *     />
 *   );
 * }
 */

function ShopWindow(props) {

  if (props.mode === "ConA" || props.mode === "NoAccesso") {
    return (
      <>
        <div className="ShopWindowBox">
          <div className="LeftShopWindow">
            <div>
              <img
                src={`http://4.232.65.20/assets/${props.ImageDescription}`}
                alt={props.ImageDescription}
                className="Image"
              ></img>
            </div>
          </div>
          <div className="RightShopWindow">
            <div className="nameBadge">
              <div className="boxName">
                <p className="nome">{props.Name}</p>
              </div>
              <div className="boxBadges">
                <BadgeContainer badges={props.badges} />
              </div>
            </div>
            <div className="img">
              <img
                src={`http://4.232.65.20/assets/${props.ImageDescription}`}
                alt={props.ImageDescription}
                className="Image"
              ></img>
            </div>
            <div className="boxDescription">
              <p className="descrizione">{props.Description}</p>
            </div>
            {props.tipo == "prodotto" && (
              <p className="prezzo-ShopWindow">
                {props.originalPrice ? (
                  <>
                    <span className="current-price-card">
                      {props.currentPrice + " €"}
                    </span>
                    <span className="original-price-card">
                      {props.originalPrice + " €"}
                    </span>
                  </>
                ) : (
                  <span className="normal-price-card">
                    {props.currentPrice + " €"}
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
            <ZigZag pulsante="Modifica Immagine" modify={props.modify}>
              <div className="ShopWindowBox">
                <img
                  src={`http://4.232.65.20/assets/${props.ImageDescription}`}
                  alt={props.ImageDescription}
                  className="Image"
                ></img>
              </div>
            </ZigZag>
          </div>
          <div className="RightShopWindow">
            <div className="nameBadge">
              <ZigZag pulsante="Modifica Nome" modify={props.modify}>
                <p className="nome">{props.Name}</p>
              </ZigZag>
              <ZigZag pulsante="Modifica Categorie" modify={props.modify}>
                <BadgeContainer badges={props.badges} />
              </ZigZag>
            </div>
            <div className="hidden-zig">
              <ZigZag pulsante="Modifica Immagine" modify={props.modify}>
                <div className="img">
                  <img
                    src={`http://4.232.65.20/assets/${props.ImageDescription}`}
                    alt={props.ImageDescription}
                    className="Image"
                  ></img>
                </div>
              </ZigZag>
            </div>
            <ZigZag pulsante="Modifica Descrizione" modify={props.modify}>
              <p className="descrizione">{props.Description}</p>
            </ZigZag>
            {props.tipo == "prodotto" && (
              <ZigZag pulsante="Modifica Prezzo" modify={props.modify}>
                <p className="prezzo-ShopWindow">
                  {props.originalPrice ? (
                    <>
                      <span className="current-price-card">
                        {props.currentPrice + " €"}
                      </span>
                      <span className="original-price-card">
                        {props.originalPrice + " €"}
                      </span>
                    </>
                  ) : (
                    <span className="normal-price-card">
                      {props.currentPrice + " €"}
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
