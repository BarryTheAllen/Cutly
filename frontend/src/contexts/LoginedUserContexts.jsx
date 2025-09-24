import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';


const API_BASE_URL = 'http://localhost:8000';

const LOGINED_ENDPOINTS = {
    CREATE: "/links/create",
    SHORTLINKS: "/links",
    GETCLICKS: "/clicks"
};

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userLink, setUserLink] = useState();
    const [shortLink, setShortLink] = useState(null)

    //  useEffect(() => {
    //     localStorage.setItem('userLink', userLink);
    // }, [userLink]);

    const createShortLink = async () => {
        try {

            const response = await axios.post(`${API_BASE_URL}${LOGINED_ENDPOINTS.CREATE}`,
                userLink,
                {
                    withCredentials: true
                }
            )
            console.log(response.data)
        } catch(error) {
                console.log(error)
            }
        }

    const getShortLink = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}${LOGINED_ENDPOINTS.SHORTLINKS}`,
                {
                    withCredentials: true
                }
            )
            setShortLink(response.data)
            console.log(response.data)
        } catch(error) {
            console.log(error)
        }
    }

    const UserValue = {
        userLink,
        createShortLink,
        getShortLink,
        shortLink,
        setUserLink,
    };
    return (
    <UserContext.Provider value={UserValue}>
      {children}
    </UserContext.Provider>
  );
};


export const useLoginedUser = () => useContext(UserContext);