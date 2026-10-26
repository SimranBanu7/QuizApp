//getting data from backend

import axios from "axios";

async function fetchQuestions(handleResponse, handleError, setLoading) {
    setLoading(true);
    try {
        
         const baseUrl = process.env.REACT_APP_API_URL;
            const endpoint ="/v1/questions";
            const url = `${baseUrl}${endpoint}`;
            
            const response = await axios.get(url)
            handleResponse(response.data);

    } catch (error) {
        handleError(error.response?.data?.message || "Unknown error occurred.");
    } 
    finally {
        setLoading(false);
    }
}
export default fetchQuestions;