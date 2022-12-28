import client from '../common/client';
import axiosCase from '../common/promiseCase';

interface LoginApiProps {
  email: string;
  password: string;
}

interface LoginApiReturn {
  isMentor: boolean;
}

const loginApi = ({ ...elem }: LoginApiProps): Promise<LoginApiReturn> => axiosCase(client.post('/api/v1/auth/login', { ...elem }));

export default loginApi;
