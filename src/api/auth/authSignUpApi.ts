import client from '../common/client';

interface AuthSignUpApiProps {
  email: string;
  nickname: string;
  password: string;
  validationCode: string;
}

interface AuthSighUpApiReturn {
  result: boolean;
}

const authSignUpApi = ({ ...elem }: AuthSignUpApiProps): Promise<AuthSighUpApiReturn> => client.post('/auth/sign-up', { ...elem });

export default authSignUpApi;
