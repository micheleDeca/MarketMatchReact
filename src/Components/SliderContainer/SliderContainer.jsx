import React from 'react';
import Slider from './Slider/Slider';
import './SliderContainer.css';

const SliderContainer = () => {
    const initialStates = [
        { key: 'prenotato', label: 'Prenotato', date: "12/12/2024, 11:36" },
        { key: 'accettato', label: 'Accettato', date: "12/12/2024, 11:36" },
        { key: 'da_ritirare', label: 'Da ritirare', date: null },
        { key: 'ritirato', label: 'Ritirato', date: null },
    ];

    return (
        <div className="slider-wrapper">
                      <Slider initialState={initialStates} canGoBack={true} initialValue={0} />

    </div>
    );
};

export default SliderContainer;
