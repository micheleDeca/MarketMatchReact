import React, { useState } from 'react';
import './NavBar.css';
import navLogo from "../../assets/logo.png";

const NavBar = (props) => {
    // Stato per gestire l'apertura/chiusura della sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [cartItems, setCartItems] = useState(5);  // Esempio di stato per il numero di articoli nel carrello

    // Funzione per toggle della sidebar
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Funzione per determinare se mostrare un link o una funzione basata sul tipo di utente
    const isVisibleForUserType = (types) => types.includes(props.userType);

     return (
        <nav className="flex-div">
            <div className="nav-left-wrapper flex-div">
                <div className="nav-left-logo flex-div">
                    <button id="buttonSlideBar" className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
                    <img className="logo" src={navLogo} alt="" />
                </div>
                <div className="nav-left flex-div">
                    {isVisibleForUserType(["NoAccesso", "ConA", "AmmA","NegA"]) && <a href="#prodotti" id="prodottiNav"  style ={{color: props.navColor ? props.navColor : ""}} >Prodotti</a>}
                    {isVisibleForUserType(["ConA", "AmmA"]) && <a href="#negozi" id="negoziNav" style ={{color: props.navColor ? props.navColor : ""}}>Negozi</a>}
                    {isVisibleForUserType(["NegA"]) && <a href="#negozio" id="negozioNav" style ={{color: props.navColor ? props.navColor : ""}}>Negozio</a>}
                    {isVisibleForUserType(["ConA", "AmmA"]) && <a href="#ricette" id="ricetteNav" style ={{color: props.navColor ? props.navColor : ""}}>Ricette</a>}
                    {isVisibleForUserType(["NoAccesso", "ConA", "AmmA","NegA"]) && <a href="#chiSiamo" id="chiSiamoNav" style ={{color: props.navColor ? props.navColor : ""}}>Chi Siamo</a>}
                </div>
            </div>

            <div className="nav-right flex-div">
                {isVisibleForUserType(["ConA", "AmmA","NegA"]) && <a href="#prenotazioni" id="prenotazioniNav" style ={{color: props.navColor ? props.navColor : ""}}>Prenotazioni</a>}
                {isVisibleForUserType(["AmmA"]) && <a href="#consumatori" id="consumatoriNav" style ={{color: props.navColor ? props.navColor : ""}}>Consumatori</a>}
                {isVisibleForUserType(["ConA", "NegA"]) && <a href="#account" id="accountNav" style ={{color: props.navColor ? props.navColor : ""}}>Account</a>}
                {isVisibleForUserType(["AmmA"]) && <a href="#pagamenti" id="pagamentiNav" style ={{color: props.navColor ? props.navColor : ""}}>Pagamenti</a>}
                {isVisibleForUserType(["NoAccesso"]) && <a href="#accedi" id="accediNav" style ={{color: props.navColor ? props.navColor : ""}}>Accedi</a>}
                <div className="cart-container">
                {isVisibleForUserType(["ConA"]) &&<a href="#carrello" id="carrelloNav">
                        Carrello
                        {cartItems > 0 && (
                            <span className="cart-quantity">({cartItems})</span>
                        )}
                    </a>}
                </div>
            </div>

            {/* Sidebar - visibile solo se isSidebarOpen è true */}
            {isSidebarOpen && (
                <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                    <button className="close-sidebar" onClick={toggleSidebar}>✖</button>
                    {isVisibleForUserType(["NoAccesso", "ConA", "AmmA","NegA"]) && <a href="#prodotti" id="prodottiSlide">Prodotti</a>}
                    {isVisibleForUserType(["ConA", "AmmA"]) && <a href="#negozi" id="negoziSlide">Negozi</a>}
                    {isVisibleForUserType(["NegA"]) && <a href="#negozio" id="negozioSlide">Negozio</a>}
                    {isVisibleForUserType(["ConA", "AmmA"]) && <a href="#ricette" id="ricetteSlide">Ricette</a>}
                    {isVisibleForUserType(["NoAccesso", "ConA", "AmmA","NegA"]) && <a href="#chiSiamo" id="chiSiamoNSlide">Chi Siamo</a>}
                    {isVisibleForUserType(["ConA", "AmmA","NegA"]) && <a href="#prenotazioni" id="prenotazioniSlide">Prenotazioni</a>}

                </div>
            )}
        </nav>
    );
};

export default NavBar;
