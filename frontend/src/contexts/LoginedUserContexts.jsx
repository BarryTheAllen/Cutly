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
    const [userLink, setUserLink] = useState("");
    const [shortLink, setShortLink] = useState([]);
    const createShortLink = async () => {
        try {

           const response = await axios.post(
                `${API_BASE_URL}${LOGINED_ENDPOINTS.CREATE}`,
                {
                    link:userLink
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

        } catch(error) {
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
        } catch(error) {
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