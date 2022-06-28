//https://cannabis-server.herokuapp.com
import axios from 'axios'
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
});
