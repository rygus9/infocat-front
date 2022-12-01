import client from '../common/client';
import axiosCase from '../common/promiseCase';

interface SignUpValidationApiProps {
  email: string;
  nickname: string;
  password: string;
}

interface SignUpValidationApiReturn {
  result: boolean;
}

const signUpValidationApi = ({ ...elem }: SignUpValidationApiProps): Promise<SignUpValidationApiReturn> =>
  axiosCase(client.post('/api/v1/auth/validation', { ...elem }));

export default signUpValidationApi;
