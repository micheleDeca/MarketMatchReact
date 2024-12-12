import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer class="site-footer">
      <div class="footer-container">
        <div class="footer-section">
          <h4>Chi Siamo</h4>
          <p>
            MarketMatch è una piattaforma che facilita la scoperta di prodotti sostenibili e alimenti specializzati, 
            promuovendo il consumo consapevole, supportando l'economia locale e offrendo un'esperienza utente personalizzata.
          </p>
        </div>
        <div class="footer-section">
          <h4>Pagine del Sito</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">Chi Siamo</a></li>
            <li><a href="#services">Servizi</a></li>
            <li><a href="#contact">Contatti</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Politiche</h4>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Termini di Servizio</a></li>
            <li><a href="#cookie">Cookie Policy</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Contatti</h4>
          <ul>
            <li>Email: <a href="mailto:info@tuosito.com">info@tuosito.com</a></li>
            <li>Telefono: <a href="tel:+39123456789">+39 123 456 789</a></li>
            <li>Indirizzo: Via Generica, 123, Città</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 MarkethMatch PROGETTO UNIVERSITARIO. Tutti i diritti riservati.</p>
      </div>
    </footer>

  )
}

export default Footer
