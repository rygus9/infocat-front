import client from '../common/client';

interface AuthLoginApiProps {
  email: string;
  password: string;
}

interface AuthLoginApiReturn {
  refreshToken: string;
}

const authLoginApi = ({ ...elem }: AuthLoginApiProps): Promise<AuthLoginApiReturn> => client.post('/auth/login', { ...elem });

export default authLoginApi;
