import axios from 'axios';
import qs from 'qs';

const client = axios.create({ withCredentials: true });

client.defaults.paramsSerializer = (params) => {
  return qs.stringify(params);
};

export default client;
