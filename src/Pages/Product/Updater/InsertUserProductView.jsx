import axios from 'axios';
import { BASE_URL } from '../../../config';
import { getToken } from '../../../LocalStorage/TokenStorage';


export const insertUserProductView = async (consUuid, prodUuid) => {
    
        const token = getToken();
        
        try {
            const response = await axios.put(`${BASE_URL}/api/consumer/insertConsumerView`, 
                {
                    consUuid: consUuid,
                    prodUuid: prodUuid
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );

            return response.data.totalItems.low;
        } catch (error) {
            console.error('Errore durante il recupero dei prodotti:', error);
            throw error;
        }
    
};


/*
const getNumberProduct = async () => {
        const token = "3dce594f8266d24d7ba7c2a28cc05495f4780afd1b04bf42618bbd09e24a26ca6eee28483f6c0929168e4a4715d042c2a959f8dc76392b3fc68ad1bf2eef2cfdcc7100e81b0f2500f0646d6fd72e1167eca126653ad5890d1a70a12a31c5fb089476a397696cb21a9990985678e8bf9c3880d4e83f495a072631509290b20366";

        const promise = axios.get('http://localhost:1337/api/product/numberUnfiltered', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        promise.then(response => {
            const data = response.data;
            setTotalItems(data.totalItems.low);
        })
    };

*/