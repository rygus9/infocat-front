import client from '../common/client';
import axiosCase from '../common/promiseCase';

interface LoginApiProps {
  email: string;
  password: string;
}

interface LoginApiReturn {
  refreshToken: string;
}

const loginApi = ({ ...elem }: LoginApiProps): Promise<LoginApiReturn> => axiosCase(client.post('/auth/login', { ...elem }));

export default loginApi;
