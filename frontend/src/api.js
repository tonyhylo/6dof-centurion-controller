import axios from 'axios'

const baseURL = "http://127.0.0.1:8000"

export const solveKinematics = async (angles) => { 
    try {
        const response = await axios.post(`${baseURL}/solve`, { angles });
        
        
        return response.data

    }
    catch (error){
        console.error("API Error:", error);
        return null;
    }
}