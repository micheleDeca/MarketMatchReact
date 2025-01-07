import React, { useState } from 'react';
import './DataRitiro.css';

export default function DataRitiro({ onChange }) {
    // Stati locali per gestire i valori dei campi
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [maxBookingTime, setMaxBookingTime] = useState('');

    // Funzione per formattare la data in GG/MM/YYYY
    const formatDateToDDMMYYYY = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    // Funzione per aggiornare il padre ogni volta che un campo cambia
    const handleUpdate = (field, value) => {
        let formattedValue = value;

        if (field === 'date') {
            setDate(value);
            formattedValue = formatDateToDDMMYYYY(value); // Converte la data
        }

        if (field === 'time') setTime(value);
        if (field === 'maxBookingTime') setMaxBookingTime(value);

        // Invia i dati aggiornati al componente padre
        onChange({
            date: field === 'date' ? formattedValue : formatDateToDDMMYYYY(date),
            time: field === 'time' ? value : time,
            maxBookingTime: field === 'maxBookingTime' ? value : maxBookingTime,
        });
    };


    return (
        <>
            <div className="headerDate">
                <h1>Data e ora ritiro</h1>
            </div>
            <div>
                <div className="formDate">
                    {/* Campo per la data */}
                    <div className="labelBox">
                        <label htmlFor="dateInput" className="inputLabel">
                            Data ritiro
                        </label>
                        <input
                            id="dateInput"
                            type="date"
                            value={date}
                            onChange={(e) => handleUpdate('date', e.target.value)}
                            className="inputField"
                        />
                    </div>

                    {/* Campo per l'ora */}
                    <div className="labelBox">
                        <label htmlFor="timeInput" className="inputLabel">
                            Ora ritiro
                        </label>
                        <input
                            id="timeInput"
                            type="time"
                            value={time}
                            onChange={(e) => handleUpdate('time', e.target.value)}
                            className="inputField"
                        />
                    </div>

                    {/* Campo per il tempo massimo di prenotazione */}
                    <div className="labelBox">
                        <label htmlFor="maxBookingTimeInput" className="inputLabel">
                            Tempo massimo prenotazione (giorni)
                        </label>
                        <input
                            id="maxBookingTimeInput"
                            type="number"
                            placeholder="Inserisci il tempo massimo"
                            value={maxBookingTime}
                            onChange={(e) => handleUpdate('maxBookingTime', e.target.value)}
                            className="inputField"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
