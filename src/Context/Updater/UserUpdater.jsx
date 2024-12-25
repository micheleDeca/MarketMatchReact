import { useEffect } from 'react';
import { useUserContext } from '../UserContext';

const UserUpdater = () => {
    const { userType, setUserType } = useUserContext();

    /*
    * - "NoAccesso" (utente non loggato)
    * - "ConA" (consumatore)
    * - "AmmA" (amministratore)
    * - "NegA" (negoziante)
    */

    useEffect(() => {
        if (userType === null) {
            setUserType("ConA");
        }
    }, []);
    return null;
};

export default UserUpdater
