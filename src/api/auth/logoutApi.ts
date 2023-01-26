import client from '../common/client';
import axiosCase from '../common/promiseCase';

const logoutApi = () => axiosCase(client.post('/api/v1/auth/logout'));

export default logoutApi;
