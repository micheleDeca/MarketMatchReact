import axios from 'axios';
import { BASE_URL } from '../../../config';
import { getToken, saveToken } from '../../../LocalStorage/TokenStorage.jsx';
import { createStoreDatabase } from './CreateDatabaseUser.jsx';

export const createUser = async ({ props, goToHome, userdata, type }) => {
    const requestParam = props;

    console.log(userdata);

    try {
        
         

        if (type === "shop") {
            await createStoreDatabase({
              props: userdata,
              goToHome: goToHome
            });
        }

        
    } catch (error) {
        console.error('Errore operazione:', error);
        alert('Errore operazione:', error.message);
        throw error;
    }
};
