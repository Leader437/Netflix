import { ENV_VARS } from "../config/envVars.js";


export const fetchFromTMDB = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`,
        }
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`Failed to fetch data from TMDB: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();

    return data;
}

