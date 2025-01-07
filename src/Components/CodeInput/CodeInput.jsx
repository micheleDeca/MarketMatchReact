import React, { useState } from 'react';
import './CodeInput.css';

export default function CodeInput({ onChange }) {
    // Stato per gestire i valori dei 6 campi
    const [code, setCode] = useState(["", "", "", "", "", ""]);

    // Gestisce il cambio di valore nei singoli campi
    const handleInputChange = (index, value) => {
        if (!/^[A-Za-z0-9]?$/.test(value)) return; // Permette solo caratteri alfanumerici
        const newCode = [...code];
        newCode[index] = value.toUpperCase(); // Converte in maiuscolo
        setCode(newCode);

        // Passa il valore aggiornato al componente padre
        onChange(newCode.join(""));

        // Sposta automaticamente il focus al campo successivo
        if (value && index < code.length - 1) {
            document.getElementById(`code-input-${index + 1}`).focus();
        }
    };

    // Gestisce il backspace per spostarsi al campo precedente
    const handleKeyDown = (index, event) => {
        if (event.key === "Backspace" && !code[index] && index > 0) {
            document.getElementById(`code-input-${index - 1}`).focus();
        }
    };

    return (
        <div className="code-input-container">
            <label htmlFor="codeInput" className="codeInputLabel">
                Inserisci il codice utente a 6 cifre per confermare il ritiro
            </label>
            <div className="code-input-wrapper">
                {code.map((char, index) => (
                    <input
                        key={index}
                        id={`code-input-${index}`}
                        type="text"
                        maxLength="1"
                        value={char}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="code-input-field"
                    />
                ))}
            </div>
        </div>
    );
}
