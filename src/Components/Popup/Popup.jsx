import React, { useState } from 'react';
import './Popup.css';

const Popup = (props) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleConfirm = () => {
        setIsVisible(false);
        props.onClose(true);
    };

    const handleCancel = () => {
        setIsVisible(false);
        props.onClose(false);
    };

    if (!isVisible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <h2 className="popup-important-text">{props.importantText}</h2>
                <p className="popup-sub-text">{props.subText}</p>
                <div className="popup-buttons">
                    <button className="popup-cancel-button" onClick={handleCancel}>{props.cancelText}</button>
                    <button className="popup-confirm-button" onClick={handleConfirm}>{props.confirmText}</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
