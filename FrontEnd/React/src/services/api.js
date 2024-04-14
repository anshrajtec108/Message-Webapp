import axios from 'axios';
import Cookies from 'js-cookie';
import { io } from "socket.io-client";

export const BASE_URL = import.meta.env.VITE_BASE_URL


export const makeGetRequest = async (url, queryParams = {}, headers = {}) => {
    try {
        const response = await axios.get(BASE_URL + url, {
            params: queryParams,
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`, // Get access token from cookies
                ...headers, // Include additional headers if provided
            },
        });
        return response.data;
    } catch (error) {
        console.error(error?.response?.status);
    }
};

export const makePostRequest = async(url, queryParams, body, headers = {})=>{
try {
        const response = await axios.post(
            BASE_URL + url,
            body,
            {
                params: queryParams,
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`, // Get access token from cookies
                    ...headers, // Include additional headers if provided
                },
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
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`, // Get access token from cookies
                    ...headers, // Include additional headers if provided
                },
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
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`, // Get access token from cookies
                    ...headers, // Include additional headers if provided
                },
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
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`, // Get access token from cookies
                    ...headers, // Include additional headers if provided
                },
            }
        )
        return response?.data
    } catch (error) {
        console.log(error?.response?.status)
    }
}

const host = "ws://localhost:3000"; // Replace with your Socket.IO server URL
export const socket = io.connect(host);