import client from '../common/client';

interface AuthResetPasswordProps {
  refreshToken: string;
}

interface AuthResetPasswordReturn {
  result: boolean;
}

const authResetPasswordApi = ({ ...elem }: AuthResetPasswordProps): Promise<AuthResetPasswordReturn> =>
  client.post('/auth/reset_password', { ...elem });

export default authResetPasswordApi;
