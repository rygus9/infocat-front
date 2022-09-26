import client from '../common/client';

interface AuthRefreshApiProps {
  email: string;
  password: string;
}

interface AuthRefreshApiReturn {
  refreshToken: string;
}

const authRefreshApi = ({ ...elem }: AuthRefreshApiProps): Promise<AuthRefreshApiReturn> => client.post('/auth/refresh', { ...elem });

export default authRefreshApi;
