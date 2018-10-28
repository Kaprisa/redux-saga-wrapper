import axios from 'axios';

const token = document.getElementsByName('csrf-token')[0].getAttribute('content');

const instance = axios.create({
  baseURL: process.env.API_URL,
});

instance.defaults.headers.common['X-CSRF-Token'] = token;
instance.defaults.headers.common.Accept = 'application/json';

export default instance;
