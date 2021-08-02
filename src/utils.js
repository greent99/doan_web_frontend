import axios from "axios";

export const axiosInstance = axios.create({
    baseUrl: 'http://localhost:3030/api',
    timeout: 5000,
    // headers: {
    //     'X-Access-Token': 'accessToken'
    // }
})