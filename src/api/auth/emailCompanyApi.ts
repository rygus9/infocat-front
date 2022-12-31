import client from '../common/client';
import axiosCase from '../common/promiseCase';

interface EmailCompanyProps {
  email: string;
}

interface EmailCompanyApiReturn {
  company: string;
}

const emailCompanyApi = ({ ...elem }: EmailCompanyProps): Promise<EmailCompanyApiReturn> =>
  axiosCase(client.post('/api/v1/auth/email', { email: elem.email }));

export default emailCompanyApi;
