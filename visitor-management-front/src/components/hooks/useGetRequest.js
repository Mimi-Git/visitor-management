import { useEffect, useState } from 'react';
import axios from 'axios';

// const BASE_URL = 'https://visitor-management-api.azurewebsites.net/api';
const BASE_URL = 'https://localhost:5001/api';

const APP_ID = 'X-ClientId';

export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure", 
};

function useGetRequest(url) {
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(`${BASE_URL}/${url}`)
            .then(({ data }) => {
                setRequestStatus(REQUEST_STATUS.SUCCESS); 
                setData(data);
            })
            .catch(e => {
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setError(e);
            })
    }, [url]);

    return {
        data,
        requestStatus,
        error,
    }
}

export default useGetRequest;