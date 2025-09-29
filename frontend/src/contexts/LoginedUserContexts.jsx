import axios from 'axios';
import { createContext, useContext, useState } from 'react';


const API_BASE_URL = 'http://localhost:8000';

const ENDPOINTS = {
    CREATE: "/links/create",
    SHORTLINKS: "/links",
    GETCLICKS: "/click"
};

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userLink, setUserLink] = useState("");
    const [shortLink, setShortLink] = useState([]);
    const [clicks, setClicks ] = useState([]);

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
            const responseLinks = await axios.get(
                `${API_BASE_URL}${ENDPOINTS.SHORTLINKS}`,
                {
                    withCredentials: true
                }
            )
            
            setShortLink(responseLinks.data)
            setLinkId(responseLinks.data.id)
        } catch(error) {

        }

    }

    const getClicks = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.GETCLICKS}`,
                {
                    withCredentials: true
                }
            )
            setClicks(response.data)
        } catch(error) {

        }
    }

    const UserValue = {
        userLink,
        API_BASE_URL,
        ENDPOINTS,
        getClicks,
        clicks,
        createShortLink,
        getShortLink,
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