import axios from 'axios';

const URL = '/api/v1/';
const api = axios.create({ baseURL: URL });

export default api;
