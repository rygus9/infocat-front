import client from '../common/client';
import axiosCase from '../common/promiseCase';

const testCookieApi = () => axiosCase(client.get('/api/v1/user'));

export default testCookieApi;
