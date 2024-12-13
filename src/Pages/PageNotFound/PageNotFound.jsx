import React from 'react'
import { Link } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => {
  return (
    <div className="page-not-found">
            <h1>404</h1>
            <h2>Pagina Non Trovata</h2>
            <p>La pagina che stai cercando non esiste o è stata rimossa.</p>
            <Link to="/" className="home-link">Torna alla Home</Link>
        </div>
  )
}

export default PageNotFound
