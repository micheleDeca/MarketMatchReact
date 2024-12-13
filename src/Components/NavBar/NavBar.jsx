import React, { useState, useEffect } from 'react';
import './NavBar.css';
import navLogo from "../../assets/logo.png";
import { useUserContext } from '../../Context/UserContext';
import { Link, useLocation } from 'react-router-dom';


/**
 * 
 * @prop {string} userType - Il tipo di utente che determina la visibilità dei link nel menu. Possibili valori:
 *    - "NoAccesso" (utente non loggato)
 *    - "ConA" (consumatore)
 *    - "AmmA" (amministratore)
 *    - "NegA" (negoziante)
 * 
 * @prop {string} navColor - Colore personalizzato per i link di navigazione. (es. "#FF0000") Base nero
 * 
 * @prop {number} cartItems - Numero di articoli presenti nel carrello. (es. 5)
 * 
 * Esempio di utilizzo:
 * <NavBar userType="ConA" navColor="#4CAF50" cartItems={3} />
 */

const NavBar = () => {
    // Stato per gestire l'apertura/chiusura della sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [cartItems, setCartItems] = useState(5);  // Esempio di stato per il numero di articoli nel carrello
    const { userType } = useUserContext();
    const [navColor, setNavColor] = useState("");
    const location = useLocation();

    // Funzione per toggle della sidebar
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Funzione per determinare se mostrare un link o una funzione basata sul tipo di utente
    const isVisibleForUserType = (types) => types.includes(userType);

    useEffect(() => {
        if (location.pathname === "/") {
            setNavColor("white");
        } else {
            setNavColor(""); // Resetta il colore per altre pagine
        }
    }, [location.pathname]); // Ascolta i cambiamenti di location.pathname

    return (
        <nav className="flex-div">
            <div className="nav-left-wrapper flex-div">
                <div className="nav-left-logo flex-div">
                    <button id="buttonSlideBar" className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
                    {location.pathname === "/" ? (
                        <img className="logo" src={navLogo} alt="Logo" />
                    ) : (
                        <Link to="/">
                            <img className="logo" src={navLogo} alt="Logo" />
                        </Link>
                    )}                </div>
                <div className="nav-left flex-div">
                    {isVisibleForUserType(["NoAccesso", "ConA", "AmmA", "NegA"]) && <Link to="/prodotti" id="prodottiNav" style={{ color: navColor }} >Prodotti</Link>}
                    {isVisibleForUserType(["ConA", "AmmA"]) && <a href="#negozi" id="negoziNav" style={{ color: navColor }}>Negozi</a>}
                    {isVisibleForUserType(["NegA"]) && <a href="#negozio" id="negozioNav" style={{ color: navColor }}>Negozio</a>}
                    {isVisibleForUserType(["ConA", "AmmA"]) && <a href="#ricette" id="ricetteNav" style={{ color: navColor }}>Ricette</a>}
                    {isVisibleForUserType(["NoAccesso", "ConA", "AmmA", "NegA"]) && <a href="#chiSiamo" id="chiSiamoNav" style={{ color: navColor }}>Chi Siamo</a>}
                </div>
            </div>

            <div className="nav-right flex-div">
                {isVisibleForUserType(["ConA", "AmmA", "NegA"]) && <Link to="/prenotazioni" id="prenotazioniNav" style={{ color: navColor }}>Prenotazioni</Link>}
                {isVisibleForUserType(["AmmA"]) && <a href="#consumatori" id="consumatoriNav" style={{ color: navColor }}>Consumatori</a>}
                {isVisibleForUserType(["ConA", "NegA"]) && <a href="#account" id="accountNav" style={{ color: navColor }}>Account</a>}
                {isVisibleForUserType(["AmmA"]) && <a href="#pagamenti" id="pagamentiNav" style={{ color: navColor }}>Pagamenti</a>}
                {isVisibleForUserType(["NoAccesso"]) && <a href="#accedi" id="accediNav" style={{ color: navColor }}>Accedi</a>}
                <div className="cart-container">
                    {isVisibleForUserType(["ConA"]) && <a href="#carrello" id="carrelloNav" style={{ color: navColor }} >
                        Carrello
                        {cartItems > 0 && (
                            <span className="cart-quantity" style={{ color: navColor }}>({cartItems})</span>
                        )}
                    </a>}
                </div>
            </div>

            {/* Sidebar - visibile solo se isSidebarOpen è true */}
            {isSidebarOpen && (
                <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                    <button className="close-sidebar" onClick={toggleSidebar}>✖</button>
                    {isVisibleForUserType(["NoAccesso", "ConA", "AmmA", "NegA"]) && <a href="#prodotti" id="prodottiSlide">Prodotti</a>}
                    {isVisibleForUserType(["ConA", "AmmA"]) && <a href="#negozi" id="negoziSlide">Negozi</a>}
                    {isVisibleForUserType(["NegA"]) && <a href="#negozio" id="negozioSlide">Negozio</a>}
                    {isVisibleForUserType(["ConA", "AmmA"]) && <a href="#ricette" id="ricetteSlide">Ricette</a>}
                    {isVisibleForUserType(["NoAccesso", "ConA", "AmmA", "NegA"]) && <a href="#chiSiamo" id="chiSiamoNSlide">Chi Siamo</a>}
                    {isVisibleForUserType(["ConA", "AmmA", "NegA"]) && <Link to="/prenotazioni" id="prenotazioniSlide">Prenotazioni</Link>}

                </div>
            )}
        </nav>
    );
};

export default NavBar;
