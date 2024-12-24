import React, { useState, useEffect } from "react";
import "./ScrollToTopButton.css"; // Importa il file di stile

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Controlla lo scroll per mostrare/nascondere il pulsante
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button className="scroll-to-top" onClick={scrollToTop}>
        ↑
      </button>
    )
  );
};

export default ScrollToTopButton;
