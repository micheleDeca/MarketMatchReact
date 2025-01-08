export const getCoordinateStore = async (address) => {
    const API_KEY = 'e6d205d5e58f4ed2ab5ffc26451f06d2'; // Sostituisci con la tua chiave API OpenCage

    if (!address) {
        throw new Error('Inserisci un indirizzo valido');
    }

    try {
        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Errore nella richiesta API');
        }

        const data = await response.json();

        if (data.results.length > 0) {
            return {
                lat: data.results[0].geometry.lat,
                lon: data.results[0].geometry.lng,
            };
        } else {
            throw new Error('Nessun risultato trovato');
        }
    } catch (err) {
        throw new Error(err.message);
    }
};
