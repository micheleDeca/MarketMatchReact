import { useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../UserContext";
import { getToken } from '../../LocalStorage/TokenStorage';
import { BASE_URL, IS_MOCKKED } from '../../config';

const UserUpdater = () => {
  const { setUserType, setDatabaseKey } = useUserContext();

  /*
   * - "NoAccesso" (utente non loggato)
   * - "ConA" (consumatore)    606bcbae-80d9-410e-9768-d5c13c42a1dc
   * - "AmmA" (amministratore)  
   * - "NegA" (negoziante)     f31a77ad-b4e3-48fc-8fff-0b51da91b3b4
   */

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (IS_MOCKKED) {
        console.log("Mock attivo: impostazione valori di test");
        setUserType("NegA"); // Imposta tipo utente di test
        setDatabaseKey("f31a77ad-b4e3-48fc-8fff-0b51da91b3b4"); // Imposta databaseKey di test
        return;
      }

      try {
        // Recupera il token
        const token = getToken();
        if (!token) {
          console.log("Token non disponibile, impostazione tipo utente come 'NoAccesso'");
          setUserType("NoAccesso");
          return;
        }

        // Configura l'header della richiesta
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Effettua la richiesta usando BASE_URL
        const response = await axios.get(`${BASE_URL}/api/users/me?populate=role`, config);

        const { role, databaseKey } = response.data;

        // Imposta il tipo di utente in base al ruolo restituito
        if (role && role.name) {
          switch (role.name) {
            case "Administrator":
              setUserType("AmmA");
              break;
            case "Consumer":
              setUserType("ConA");
              break;
            case "Shop":
              setUserType("NegA");
              break;
            default:
              setUserType("NoAccesso");
          }
        } else {
          setUserType("NoAccesso");
        }

        // Imposta il databaseKey nel contesto
        if (databaseKey) {
          setDatabaseKey(databaseKey);
        }
      } catch (error) {
        console.error("Errore durante il recupero dei dettagli dell'utente:", error);
        setUserType("NoAccesso"); // Imposta come non loggato in caso di errore
      }
    };

    fetchUserDetails();
  }, [setUserType, setDatabaseKey]);

  return null;
};

export default UserUpdater;
