import React from 'react'
import { Link } from 'react-router-dom';
import './PageNotFound.css';
import Lottie from "react-lottie-player";
import animation1 from "./assets/404Animation.json";

 

const PageNotFound = () => {
  return (
    <div className="page-not-found">
            <Lottie
          loop
          animationData={animation1}
          play
          className="feature-animation"
        />
            <h2>Pagina Non Trovata</h2>
            <p>La pagina che stai cercando non esiste o è stata rimossa.</p>
          
            <Link to="/" className="home-link">Torna alla Home</Link>
        </div>
  )
}

export default PageNotFound
