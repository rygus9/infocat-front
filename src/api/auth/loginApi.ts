import client from '../common/client';
import axiosCase from '../common/promiseCase';

interface LoginApiParams {
  email: string;
  password: string;
}

interface LoginApiReturn {
  isMentor: boolean;
  nickname: string;
}

const loginApi = ({ ...elem }: LoginApiParams): Promise<LoginApiReturn> => axiosCase(client.post('/api/v1/auth/login', { ...elem }));

export default loginApi;
