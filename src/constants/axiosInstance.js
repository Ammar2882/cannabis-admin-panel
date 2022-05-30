//https://cannabis-server.herokuapp.com
import axios from 'axios'
export const axiosInstance = axios.create({
    baseURL: 'https://cannabis-server.herokuapp.com',
});
