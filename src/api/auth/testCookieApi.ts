import client from '../common/client';
import axiosCase from '../common/promiseCase';

const testCookieApi = () => axiosCase(client.get('/user'));

export default testCookieApi;
