import client from '../common/client';
import axiosCase from '../common/promiseCase';

interface EmailValidationApiParams {
  email: string;
  validationCode: string;
}

interface EmailValidationApiReturn {
  validationToken: string;
}

const emailValidationApi = ({ ...elem }: EmailValidationApiParams): Promise<EmailValidationApiReturn> =>
  axiosCase(client.post('/api/v1/email', { ...elem }));

export default emailValidationApi;
