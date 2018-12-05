import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.API_URL,
});

instance.defaults.headers.common.Accept = 'application/json';

export default instance;
