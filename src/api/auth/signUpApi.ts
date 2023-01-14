import client from '../common/client';
import axiosCase from '../common/promiseCase';

interface SignUpApiParams {
  email: string;
  nickname: string;
  password: string;
  validationToken: string;
}

interface SighUpApiReturn {
  result: boolean;
}

const signUpApi = ({ ...elem }: SignUpApiParams): Promise<SighUpApiReturn> =>
  axiosCase(
    client.post(
      '/api/v1/auth/sign-up',
      {
        email: elem.email,
        nickname: elem.nickname,
        password: elem.password,
      },
      { headers: { 'validation-token': elem.validationToken } }
    )
  );

export default signUpApi;
