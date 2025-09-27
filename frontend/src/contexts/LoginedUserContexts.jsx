import axios from 'axios';
import { createContext, useContext, useState } from 'react';


const API_BASE_URL = 'http://localhost:8000';

const ENDPOINTS = {
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
                `${API_BASE_URL}${ENDPOINTS.CREATE}`,
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
                `${API_BASE_URL}${ENDPOINTS.SHORTLINKS}`,
                {
                    withCredentials: true
                }
            )
            setShortLink(response.data)
        } catch(error) {
        }

    }
    const shortLinkRedirect = async (shortedlink) => {
    try {
        const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.SHORTLINKS}/${shortedlink}`);
        
        const redirectUrl = response.data._headers.location;
        
        window.location.href = redirectUrl;
        
    } catch(error) {
        console.log('Ошибка редиректа:', error);
    }
    }

    const getClicks = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.GETCLICKS}`)
        } catch {
            console.log(error)
        }
    }

    const UserValue = {
        userLink,
        createShortLink,
        getShortLink,
        shortLinkRedirect,
        shortLink,
        setUserLink
    };
    return (
    <UserContext.Provider value={UserValue}>
      {children}
    </UserContext.Provider>
  );
};


export const useLoginedUser = () => useContext(UserContext);    