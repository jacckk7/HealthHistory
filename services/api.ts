import axios from "axios";

export const api = axios.create({
    baseURL: "http://172.29.126.178:5000"
})