import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_BASE_URL

export const makeGetRequest = async(url, queryParams={},header={})=>{
    try {
        const response = await axios.get(BASE_URL +url,{
            params:queryParams,
            header:header
        })
        return response.data
    } catch (error) {
        console.error(error?.response?.status);
    }
}

export const makePostRequest = async(url, queryParams, body, headers = {})=>{
try {
        const response = await axios.post(
            BASE_URL + url,
            body,
            {
                params: queryParams,
                headers: headers,
                mode: "no-cors",
            }
        );
        return response.data
} catch (error) {
    console.error(error?.response?.status);
}
}

export const makePutRequest = async(url, queryParams, body, headers = {})=>{
    try {
        const response = await axios.put(
            BASE_URL + url,
            body,
            {
                params: queryParams,
                headers: headers,
            }
        )
        return response?.data
    } catch (error) {
        console.log(error?.response?.status)
    }
}

export const makePatchRequest = async (url, queryParams, body, headers = {}) => {
    try {
        const response = await axios.patch(
            BASE_URL + url,
            body,
            {
                params: queryParams,
                headers: headers,
            }
        )
        return response?.data
    } catch (error) {
        console.log(error?.response?.status)
    }
}

export const makeDeleteRequest = async (url, queryParams, headers = {}) => {
    try {
        const response = await axios.delete(
            BASE_URL + url,
            {
                params: queryParams,
                headers: headers,
            }
        )
        return response?.data
    } catch (error) {
        console.log(error?.response?.status)
    }
}
