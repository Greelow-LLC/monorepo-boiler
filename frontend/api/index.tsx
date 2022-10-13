import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API = process.env.NEXT_PUBLIC_API;

const api = axios.create({
  baseURL: `${URL}${API}`,
});

export default api;
