import client from '../common/client';

interface AuthEmailApiProps {
  email: string;
}

interface AuthEmailApiReturn {
  result: boolean;
}

const authEmailApi = ({ ...elem }: AuthEmailApiProps): Promise<AuthEmailApiReturn> => client.post('/auth/email', { ...elem });

export default authEmailApi;
