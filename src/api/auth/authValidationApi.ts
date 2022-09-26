import client from '../common/client';

interface AuthValidationApiProps {
  email: string;
  nickname: string;
  password: string;
}

interface AuthValidationApiReturn {
  result: boolean;
}

const authValidationApi = ({ ...elem }: AuthValidationApiProps): Promise<AuthValidationApiReturn> =>
  client.post('/auth/validation', { ...elem });

export default authValidationApi;
