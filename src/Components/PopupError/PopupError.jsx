import React, { useState } from 'react';
import './PopupError.css';

const PopupError = ({ errorMessage, subText, handleClose }) => {
    

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <h2 className="popup-error-text">{errorMessage}</h2>
                {subText && <p className="popup-sub-text">{subText}</p>}
                <div className="popup-buttons">
                    <button className="popup-ok-button" onClick={handleClose}>OK</button>
                </div>
            </div>
        </div>
    );
};

export default PopupError;
