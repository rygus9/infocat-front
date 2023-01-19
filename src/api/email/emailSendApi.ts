import client from '../common/client';
import axiosCase from '../common/promiseCase';

interface EmailSendApiParams {
  email: string;
}

interface EmailSendApiReturn {
  result: boolean;
}

const emailSendApi = ({ ...elem }: EmailSendApiParams): Promise<EmailSendApiReturn> =>
  axiosCase(client.get('/api/v1/email', { params: { email: elem.email } }));

export default emailSendApi;
